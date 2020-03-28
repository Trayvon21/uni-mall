<template>
	<view>
		<view class="goods-header">
			<image src="../../static/imgs/goodsBg.png" class="goods-pic" mode=""></image>
		</view>
		<view class="goods-nav flex a-center jc-around">
			<view :class="active===0?'active':''" @click="changeNav(0)">综合</view>
			<view class="flex a-center">
				<view style="margin-right: 10rpx;" @click="changeNav(1)">
					价格
				</view>
				<view>
					<view class="icon">
						<uni-icons :color="active===1?'red':''" type="arrowup" size="12"></uni-icons>
					</view>
					<view class="icon">
						<uni-icons :color="active===2?'red':''" type="arrowdown" size="12"></uni-icons>
					</view>
				</view>
			</view>
			<view :class="[active===3?'active':'']" @click="changeNav(3)">
				分类
			</view>
		</view>
		<view class="goods-main">
			<goodBox v-for="item in goodsList" :key="item.id" :item="item" />
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../components/uni-ui/uni-icons/uni-icons.vue"
	import goodBox from '../../components/common/goodBox.vue'
	export default {
		components: {
			goodBox,
			uniIcons
		},
		data() {
			return {
				goodsList: null,
				type: "",
				active: 0,
				sortType: 'down'
			};
		},
		methods: {
			getGoodsList(type, sort) {
				this.$api.getGoodsList(type, sort).then(res => {
					this.goodsList = res.data.data
				})
			},
			changeNav(val) {
				if (val === 0 || val === 3) {
					this.sortType = 'down'
					this.getGoodsList(this.type)
				} else {
					this.getGoodsList(this.type, this.sortType)
					this.sortType === 'up' ? this.sortType = 'down' : this.sortType = 'up'
				}
				val === 0 ? this.active = 0 : val === 3 ?
					this.active = 3 : this.sortType === 'up' ?
					this.active = 2 : this.active = 1
			}
		},
		onLoad(options) {
			this.type = options.type
			this.getGoodsList(options.type)
		}
	}
</script>

<style lang="scss">
	.goods-pic{
		width: 100%;
		height: 280rpx;
	}
	.goods-nav {
		margin: 10rpx 0;
	}

	.active {
		color: red;
	}

	.icon {
		line-height: 20rpx;
	}

	.goods-main {
		background: rgb(238, 238, 238);

		>view {
			display: inline-block;
			margin:0 17rpx;
		}

	}
</style>
