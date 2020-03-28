<template>
	<view class="list-container">
		<view class="t-center list-title">
			{{item.name}}
		</view>
		<view class="flex a-center flex-wrap jc-around">
			<goodBox v-for="i in item.goodsList" :key="i.id" :item="i"></goodBox>
			<view class="list-each flex a-center list-readmore jc-around t-center">
				<view class="flex a-center" style="font-size: 32rpx;"  @click="$gotoDetail('categoryDetail',item.id)">
					{{item.name}}
					<image class="list-pic" src="../../static/imgs/right.png" mode="" />
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import goodBox from "../common/goodBox.vue"
	export default {
		components: {
			goodBox
		},
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
		margin: 20rpx;
		font-size: 32rpx;
	}

	.list-each {
		height: 370rpx;
		width: 340rpx;
		margin: 30rpx 0;
		background-color: #FFFFFF;
		.list-pic {
			margin-left: 20rpx;
			width: 30rpx;
			height: 30rpx;
			padding: 10rpx;
			border-radius: 50%;
			border: 5rpx solid #ededed;
		}
	}
</style>
