<template>
	<view>
		<scroll-view v-if="active&&subList" scroll-x="true" class="header-nav" :scroll-into-view="`t${active}`">
			<view class="flex flex-nowrap">
				<view v-for="item in subList" :key="item.id" @click="changeNav(item.id)" :id="`t${item.id}`">
					<view class="nav-each t-center" :class="[active===item.id?'active':'']">
						{{item.name}}
					</view>
					<view v-if="active===item.id" class="nav-line" />
				</view>
			</view>
		</scroll-view>
		<view style="background: #F5F5F5;overflow: hidden;" v-if="currentNav">
			<view class="category-header flex jc-around t-center a-center">
				<view>
					<view>
						{{currentNav.name}}
					</view>
					<view class="header-info">
						{{currentNav.front_desc}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="goodList.length>0">
			<goodBox v-for="item in goodList" :item="item" :key="item.id" />
		</view>
		<view v-else>
			<view class="goodList-msg t-center">
				暂无商品
			</view>
		</view>
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
				subList: null,
				active: null,
				currentNav: null,
				goodList: []
			};
		},
		methods: {
			getCurrentCategory(id, active) {
				console.log(active);
				this.$api.getCurrentCategory(id).then(res => {
					this.subList = res.data.data.currentOne.subList
					this.active = Number(active ? active : this.subList[0].id)
					this.getNavShopList(this.active)
				})
			},
			changeNav(id) {
				this.active = id
				this.getNavShopList()
			},
			getNavShopList() {
				this.$api.getNavShopList(this.active).then(res => {
					this.currentNav = res.data.currentNav
					this.goodList = res.data.data
				})
			}
		},
		onLoad(options) {
			this.getCurrentCategory(options.id, options.active)
		}
	}
</script>

<style scoped lang="scss">
	.header-nav {
		background: white;
	}

	.nav-each {
		width: 140rpx;
		padding: 10rpx 0;
		white-space: nowrap;
	}

	.active {
		color: #a2262a;
		font-weight: 700;
	}

	.nav-line {
		width: 100%;
		height: 5rpx;
		background: #a2262a;
	}

	.category-header {
		width: 100%;
		padding: 40rpx 0;
		margin: 20rpx 0;
		background: white;
	}

	.header-info {
		margin-top: 20rpx;
		color: gray;
	}

	.goodList-msg {
		margin: 80rpx 0;
		font-size: 32rpx;
		color: gray;
	}
</style>
