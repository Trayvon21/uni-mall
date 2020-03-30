<template>
	<view class="location-container">
		<view class="txt-hidden" v-if="location">
			{{location}}
		</view>
		<view v-else>
			获取定位中...
		</view>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				location: ''
			}
		},
		methods: {},
		mounted() {},
	}
</script>

<style scoped lang="scss">
	.location-container {
		width: 200rpx;
	}
</style>
