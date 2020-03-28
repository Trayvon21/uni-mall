<template>
	<view class="location-container">
		<view class="txt-hidden" v-if="location">
			{{location}}
		</view>
		<view class="" v-else>
			获取定位中...
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				location
			}
		},
		methods: {
			getAuthorize() {
				uni.authorize({
					scope: 'scope.userLocation',
					success: () => {
						this.getLocation()
					},
					fail: (err) => {
						this.openModel()
					}
				})
			},
			mounted() {
				this.getAuthorize()
			},
			openModel() {
				uni.showModal({
					title: '温馨提示',
					content: '需要授权打开位置定位服务',
					success: (res) => {
						if (res.confirm) {
							uni.openSetting()
						} else if (res.cancel) {
							this.openModel()
						}
					}
				});
			},
			getLocation() {
				uni.getLocation({
					success: (res) => {
						console.log(1);
						this.$api.getLocation(`${res.latitude},${res.longitude}`).then(result => {
							this.location = result.data.result.address_component.street
							uni.setStorageSync('local', {
								latitude: res.latitude,
								longitude: res.longitude,
								name: this.location
							})
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.location-container {
		width: 200rpx;
	}
</style>
