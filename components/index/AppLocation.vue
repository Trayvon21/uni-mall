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
	import permision from "../../untils/wa-permission/permission.js"
	export default {
		name: "",
		data() {
			return {
				location: '',
				flag: true
			}
		},
		methods: {
			getAuthorize() {
				//先判断机型与授权状态，用户拒绝则触发showModal
				let model = uni.getSystemInfoSync().platform
				if (this.flag) {
					if (model === 'android') {
						this.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')
					} else if (model === 'ios') {
						this.requestIOSPermission()
					}
				} else {
					this.goAuthorization()
				}

			},
			goAuthorization() {
				uni.showModal({
					title: '请授权',
					content: '使用本软件需要提供位置权限',
					success: (res) => {
						if (res.confirm) {
							permision.gotoAppPermissionSetting()
						} else if (res.cancel) {
							this.goAuthorization()
						}
					}
				});

			},
			requestIOSPermission() {
				let result = permision.judgeIosPermission("location")
				if (result) {
					this.checkSystemEnableLocation()
				} else {
					this.flag = false
				}

			},
			async requestAndroidPermission(permisionID) {
				var result = await permision.requestAndroidPermission(permisionID)
				console.log(result);
				if (result == 1) {
					this.checkSystemEnableLocation()
				} else {
					this.flag = false
				}
			},
			checkSystemEnableLocation() {
				let result = permision.checkSystemEnableLocation()
				if (result) {
					this.getLocation()
				} else {
					uni.showModal({
						title: '请打开手机定位',
						content: '手机定位服务未打开将无法使用本软件',
						showCancel: false,
						success: (res) => {
							this.checkSystemEnableLocation()
						}
					});
				}
			},
			getLocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log(res);
						this.$api.getLocation(`${res.latitude},${res.longitude}`).then(result => {
							this.location = result.data.result.address_component.street
							uni.setStorageSync('local', {
								latitude: res.latitude,
								longitude: res.longitude,
								name: this.location
							})
						})
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.location-container {
		width: 200rpx;
	}
</style>
