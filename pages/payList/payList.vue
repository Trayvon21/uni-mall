<template>
	<view class="pay-container position-ab">
		<view class="pay-address">
			<showAddress :address="address"></showAddress>
		</view>
		<view class="pay-info">
			<view class="info-each flex jc-between a-center border-down">
				<view>
					商品合计
				</view>
				<view>
					￥{{allprice}}
				</view>
			</view>
			<view class="info-each flex jc-between a-center border-down">
				<view>
					运费
				</view>
				<view>
					免运费
				</view>
			</view>
			<view class="info-each flex jc-between a-center">
				<view>
					优惠券
				</view>
				<view>
					暂无
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true">
			<view>
				<payGoodBox v-for="item in paylist" :item="item" :flag="false" :key="item.id"></payGoodBox>
			</view>
		</scroll-view>
		<view class="flex jc-between bottom-box a-center">
			<view class="bottom-checkbox">
				实付：￥{{allprice}}
			</view>
			<view class="bottom-btn t-center" @click="payNow">
				支付
			</view>
		</view>
	</view>
</template>

<script>
	import payGoodBox from "../../components/common/payGoodBox.vue"
	import showAddress from "../../components/paylist/showAdress.vue"
	export default {
		components: {
			payGoodBox,
			showAddress
		},
		data() {
			return {
				paylist: [],
				address: null
			};
		},
		methods: {
			payNow() {
				if (this.paylist[0].type !== 'payNow') {
					this.paylist.map((item, index, arr) => {
						this.$api.delCart(item.id).then(res => {
							if (index === arr.length - 1) {
								this.showToast()
							}
						})
					})
				} else {
					this.$api.payNow(this.allPrise, this.paylist[0].goodsId).then(res => {
						this.showToast()
					})

				}
			},
			showToast() {
				uni.showToast({
					icon: "none",
					title: `支付成功，您一共消费了￥${this.allprice}`,
					duration: 800
				})
				setTimeout(() => {
					uni.switchTab({
						url: "/pages/index/index"
					})
				}, 800)
			},
			getAddress() {
				if (uni.getStorageSync('address')) {
					this.address = JSON.parse(uni.getStorageSync('address'))
				} else {
					this.$api.getAddressList().then(res => {
						if (res.status === 200) {
							res.data.data.map(item => {
								if (item.is_default) {
									this.address = item
								}
							})
						}
					})
				}
			}
		},
		onLoad(options) {
			this.paylist = JSON.parse(options.paylist)
		},
		onShow() {
			this.getAddress()
		},
		computed: {
			allprice() {
				let price = 0
				this.paylist.map(item => {
					price += item.number * item.retail_price
				})
				return price
			}
		}
	}
</script>

<style lang="scss">
	.pay-container {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #f4f4f4;

		.pay-address {
			height: 160rpx;
		}

		.pay-info {
			margin: 20rpx 0;
			background: white;
			overflow: hidden;

			.info-each {
				padding: 30rpx 0;
				margin: 0 30rpx;
			}
		}

		.bottom-box {
			position: absolute;
			width: 100%;
			bottom: 0;
			height: 100rpx;
			background: white;

			.bottom-checkbox {
				margin-left: 20rpx;
			}

			.bottom-price {
				margin-right: 30rpx;
				color: #ab212c;
			}

			.bottom-btn {
				width: 200rpx;
				height: 100rpx;
				color: white;
				background: #ab212c;
				font-size: 30rpx;
				line-height: 100rpx;
			}
		}
	}
</style>
