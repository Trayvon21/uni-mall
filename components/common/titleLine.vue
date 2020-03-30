<template>
	<view class="title flex jc-around">
		<view class="flex a-center">
			<view class="title-line" />
			<slot></slot>
			<view class="title-line" />
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.title {
		margin: 20rpx;
	}

	.title-line {
		width: 100rpx;
		height: 4rpx;
		margin: 20rpx;
		background: #ededed;
	}
</style>
