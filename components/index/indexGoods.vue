<template>
	<view class="index-newGoods">
		<view class="new-top  flex a-center" :style="{background:bgcolor[0]}">
			<view class="t-center new-title" :style="{color:bgcolor[1]}">
				<view style="font-size: 32upx;">{{title}}</view>
				<view class="read-more" :style="{background:bgcolor[2]}">查看更多</view>
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
				default: ''
			},
			items: {
				type: Array,
				default: () => []
			},
			bgcolor: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss">
	.index-newGoods {
		margin-top: 20upx;

		.new-top {
			height: 260upx;

			.new-title {
				margin: 0 auto;
			}

			.read-more {
				width: 180upx;
				margin: 20upx auto;
			}
		}

		.newGood-each {
			width: 300upx;
			height: 400upx;

			image {
				height: 280upx;
				width: 280upx;
				margin: 0 auto;
			}

			.goods-info {
				padding: 0 20upx;
			}

			.goods-desc {
				font-size: 24upx;
				color: #ababab;
			}
		}
	}
</style>
