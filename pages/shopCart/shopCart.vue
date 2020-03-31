<template>
	<view class="cart-container position-ab">
		<view class="top-desc flex jc-around top-info a-center" ref="topDesc">
			<view class="disc">30天无忧退货</view>
			<view class="disc">48小时快速退款</view>
			<view class="disc">满88元免邮费</view>
		</view>
		<scroll-view v-if="cartList.length>0" scroll-y="true" :style="{height: scorllHeight+'px'}">
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(item,index) in cartList" :key="item.id" :options="options(item.id)" @click="onClick">
					<payGoodBox style="width: 750rpx;" @changeOne="changeOne" :item="item" :index="index"></payGoodBox>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>
		<view v-else class="flex jc-around">
			暂无数据
		</view>
		<view class="flex jc-between bottom-box a-center" v-if="cartList.length>0">
			<view class="bottom-checkbox">
				<checkbox value="all" :checked="selectAll" @click="changeAll" />全选 (已选择{{select.num}}项)
			</view>
			<view class="flex a-center">
				<view class="bottom-price">
					￥{{select.allprice}}
				</view>
				<view class="bottom-btn t-center" @click="goPay">
					下单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '../../components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	import payGoodBox from "../../components/common/payGoodBox.vue"
	export default {

		components: {
			payGoodBox,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				scorllHeight: 0,
				cartList: [],
				selectAll: true,

			};
		},
		methods: {
			getCart() {
				this.$api.getCartList().then(res => {
					this.cartList = res.data.data
					uni.setTabBarBadge({
						index: 3,
						text: String(res.data.data.length)
					})
					console.log(this.cartList);
					for (var i = 0, lenI = this.cartList.length; i < lenI; ++i) {
						const item = this.cartList[i]
						this.$set(item, 'checked', true)
					}
				})
			},
			changeOne(index) {
				//选择单项，被选时checked为1，否则为0，全部选中时全选被选中，否则不选中
				this.cartList[index].checked ? this.cartList[index].checked = false : this.cartList[index].checked = true
				this.cartList.every(item => item.checked) ? this.selectAll = true : this.selectAll = false
			},
			changeAll(e) {
				//全选按钮控制每个单项
				this.selectAll = !this.selectAll
				this.cartList.map(item => item.checked = (!this.selectAll) ? false : true)
			},
			options(id) {
				return [{
					text: '删除',
					id,
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			},
			onClick(e) {
				this.$api.delCart(e.content.id).then(res => {
					uni.showToast({
						title: "删除成功",
						duration: 800
					})
					this.getCart()
				})

			},
			goPay() {
				let paylist = this.cartList.filter(item => item.checked)
				if (paylist.length > 0) {
					uni.navigateTo({
						url: `/pages/payList/payList?paylist=${JSON.stringify(paylist)}`
					})
				} else {
					uni.showToast({
						title: "请选择商品",
						duration: 800
					})
				}
			},
			setHeight() {
				this.$nextTick(() => {
					uni
						.createSelectorQuery()
						.in(this)
						.select(".top-desc")
						.boundingClientRect(data => {
							this.scorllHeight = uni.getSystemInfoSync().windowHeight - data.height * 2;
						})
						.exec();
				})
			}
		},
		onLoad() {
			this.setHeight()
		},
		onShow() {
			console.log(1);
			if (uni.getStorageSync('user')) {
				this.getCart()
			} else {
				uni.showModal({
					title: '请登录',
					content: '本页面需要登录才能操作',
					success: (res) => {
						if (res.confirm) {
							uni.switchTab({
								url: "/pages/my/my"
							})
						} else {
							uni.switchTab({
								url: "/pages/index/index"
							})
						}
					}
				});
			}

		},
		computed: {
			select() {
				let num = 0
				let allprice = 0
				this.cartList.map(item => {
					if (item.checked) {
						num++
						allprice += item.retail_price * item.number
					}
				})
				return {
					num,
					allprice
				}
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #f4f4f4;

		.top-desc {
			height: 100rpx;
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
