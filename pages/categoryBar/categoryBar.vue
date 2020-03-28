<template>
	<view class="category-container">
		<view class="position-re header-search">
			<input class="header-input" placeholder="请输入关键字" type="text" value="">
			<image class="search-pic position-ab" src="../../static/imgs/search.png" mode="">
		</view>
		<view class="flex">
			<view class="category-left">
				<categoryNav v-if="categoryList" @changeNav="changeNav" :navList="categoryList"></categoryNav>
			</view>
			<scroll-view scroll-y="true" :style="{height: rightHeight+'px'}" class="category-right">
				<categoryList v-if="currentOne" :currentOne="currentOne"></categoryList>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import categoryNav from "../../components/category/categoryNav.vue"
	import categoryList from "../../components/category/categoryGoodList.vue"
	export default {

		components: {
			categoryList,
			categoryNav
		},
		data() {
			return {
				categoryList: null,
				currentOne: null,
				rightHeight: 0
			};
		},
		methods: {
			changeNav(id) {
				this.$api.getCurrentCategory(id).then(res => {
					this.currentOne = res.data.data.currentOne
					console.log(this.currentOne);
				})
			},
			getCategoryList() {
				this.$api.getCategoryList().then(res => {
					this.categoryList = res.data.categoryList
					this.changeNav(this.categoryList[0].id)
				})
			},
			adaptive() {
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select(".category-right").boundingClientRect(data => {
						this.rightHeight = uni.getSystemInfoSync().windowHeight - data.top
					}).exec();
				})
			}
		},
		onLoad() {
			this.getCategoryList()
			this.adaptive()
		}
	}
</script>

<style lang="scss">
	.category-container {
		overflow: hidden;
		height: 100%;
	}

	.header-search {
		width: 100%;

		.header-input {
			margin: 20rpx;
			height: 40upx;
			border-radius: 20rpx;
			text-indent: 50rpx;
			font-size: 28rpx;
			padding: 10rpx 0;
			background: #f7f8fa;
		}

		.search-pic {
			top: 50%;
			margin-top: -18rpx;
			left: 30rpx;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.category-left {
		width: 160rpx;
	}

	.category-right {
		width: 590rpx;
		height: 100%;
		overflow-y: scroll;
	}
</style>
