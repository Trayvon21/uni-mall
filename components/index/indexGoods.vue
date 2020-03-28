<template>
	<view class="index-newGoods">
		<view class="new-top  flex a-center" :style="{background:bgcolor[0]}">
			<view class="t-center new-title" :style="{color:bgcolor[1]}">
				<view style="font-size: 32rpx;">{{title}}</view>
				<view class="read-more" :style="{background:bgcolor[2]}" @click="gotoMore(type)">查看更多</view>
			</view>
		</view>
		<scroll-view scroll-x="true">
			<view class="flex flex-nowrap">
				<view v-for="item in items" :key="item.id" class="newGood-each">
					<image :src="item.list_pic_url" mode=""></image>
					<view class="goods-info">
						<view class="txt-hidden">
							{{item.name}}
						</view>
						<view class="goods-desc txt-hidden">
							{{item.goods_brief}}
						</view>
						<view style="color: red;">
							￥{{item.retail_price}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: ""
			},
			items: {
				type: Array,
				default: () => []
			},
			bgcolor: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			gotoMore(type) {
				uni.navigateTo({
					url: `/pages/goodsList/goodsList?type=${type}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-newGoods {
		margin-top: 20rpx;

		.new-top {
			height: 260rpx;

			.new-title {
				margin: 0 auto;
			}

			.read-more {
				width: 180rpx;
				margin: 20rpx auto;
			}
		}

		.newGood-each {
			width: 300rpx;
			height: 400rpx;

			image {
				height: 280rpx;
				width: 280rpx;
				margin: 0 auto;
			}

			.goods-info {
				padding: 0 20rpx;
			}

			.goods-desc {
				font-size: 24rpx;
				color: #ababab;
			}
		}
	}
</style>
