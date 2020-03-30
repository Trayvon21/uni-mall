<template>
	<view style="background: #f5f5f5;" v-if="brandData" class="brand-container position-ab">
		<view class="position-re brand-top flex a-center">
			<view class="brand-title">
				{{brandData.name}}
			</view>
			<image :src="brandData.new_pic_url" class="brand-pic position-ab" mode=""></image>

		</view>
		<view class="simple_desc">
			{{brandData.simple_desc}}
		</view>
		<view style="background: #f5f5f5;" v-if="goodsList.length>0">
			<goodBox v-for="item in goodsList" :item="item" :key="item.id"></goodBox>
		</view>
		<view class="brand-info t-center" v-else>数据库暂无数据</view>
	</view>
</template>

<script>
	import goodBox from "../../components/common/goodBox.vue"
	export default {
		components: {
			goodBox
		},
		data() {
			return {
				brandData: null,
				goodsList: []
			};
		},
		methods: {
			getBrandDetail(id) {
				this.$api.getBrandDetail(id).then(res => {
					console.log(res);
					this.brandData = res.data.data
					this.goodsList = res.data.goodsList
				})
			}
		},
		onLoad(options) {
			this.getBrandDetail(options.id)
		}
	}
</script>

<style lang="scss">
	.brand-container {
		width: 100%;
		height: 100%;
	}

	.brand-top {
		width: 100%;
		height: 280rpx;
	}

	.brand-title {
		z-index: 1;
		font-size: 40rpx;
		color: white;
		border-bottom: 4rpx solid white;
		margin: 0 auto;
	}

	.brand-pic {
		width: 100%;
		height: 280rpx;
	}

	.brand-info {
		margin: 100rpx 0;
		width: 100%;
		color: gray;
		font-size: 32rpx;
	}

	.simple_desc {
		background: white;
		padding: 40rpx;
		text-indent: 2em;
	}
</style>
