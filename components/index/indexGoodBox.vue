<template>
	<view class="list-container">
		<view class="t-center list-title">
			{{item.name}}
		</view>
		<view class="flex a-center flex-wrap jc-around">
			<view v-for="i in item.goodsList" :key="i.id" class="list-each t-center">
				<image :src="i.list_pic_url" mode="" />
				<view class="list-name txt-hidden">
					{{i.name}}
				</view>
				<view style="color: red;">
					￥{{i.retail_price}}
				</view>
			</view>
			<view class="list-each flex a-center list-readmore jc-around t-center">
				<view class="flex a-center" style="font-size: 32upx;">
					{{item.name}}
					<image class="list-pic" src="../../static/imgs/right.png" mode="" />
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-container {
		overflow: hidden;
	}

	.list-title {
		margin: 20upx;
		font-size: 32upx;
	}

	.list-each {
		height: 370upx;
		width: 340upx;
		margin: 30upx 0;
		background-color: #FFFFFF;

		image {
			width: 240upx;
			height: 240upx;
		}

		.list-name {
			font-size: 26upx;
			margin-top: 30upx;
			padding: 0 10upx;
		}

		.list-pic{
			margin-left: 20upx;
			width: 30upx;
			height: 30upx;
			padding: 10upx;
			border-radius: 50%;
			border: 5upx solid #ededed;
		}
	}
</style>
