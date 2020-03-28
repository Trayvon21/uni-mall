<template>
	<view class="right-container">
		<view class="right-top position-re flex a-center jc-around">
			<view class="right-front">{{currentOne.front_desc}}</view>
			<image class="position-ab right-pic" :src="currentOne.wap_banner_url" mode=""></image>
		</view>
		<view class="right-title flex jc-around">
			<view class="flex a-center">
				<view class="title-line" />
				<view>{{currentOne.name}}分类</view>
				<view class="title-line" />
			</view>
		</view>
		<view class="right-main t-center">
			<view class="right-each" @click="gotoCategory('category',currentOne.id,item.id)" v-for="item in currentOne.subList"
			 :key="item.id">
				<image :src="item.wap_banner_url" mode=""></image>
				<view class="">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentOne: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			gotoCategory(url, id, active) {
				uni.navigateTo({
					url: `/pages/${url}/${url}?id=${id}&active=${active}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.right-container {
		margin: 35rpx;

		.right-top {
			width: 520rpx;
			height: 200rpx;

			.right-front {
				z-index: 1;
				color: white;
			}

			.right-pic {
				width: 520rpx;
				height: 200rpx;
			}
		}

		.right-title {
			margin: 20rpx;
		}

		.title-line {
			width: 100rpx;
			height: 4rpx;
			margin: 20rpx;
			background: #ededed;
		}

		.right-each {
			width: 170rpx;
			height: 170rpx;
			margin-bottom: 20rpx;
			float: left;

			image {
				height: 140rpx;
				width: 140rpx;
			}
		}
	}
</style>
