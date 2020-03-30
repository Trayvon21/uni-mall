<template>
	<view v-if="detailData">
		<scroll-view scroll-y="true" :style="{height: winHeight+'px'}">
			<swiper class="detail-pic" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in detailData.gallery" :key="item.id">
					<image class="detail-pic" :src="item.img_url" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="flex jc-around top-info">
				<view class="disc">30天无忧退货</view>
				<view class="disc">48小时快速退款</view>
				<view class="disc">满88元免邮费</view>
			</view>
			<view class="good-info t-center">
				<view>
					{{detailData.info.name}}
				</view>
				<view class="good-brief">
					{{detailData.info.goods_brief}}
				</view>
				<view class="good-price">
					￥{{detailData.info.retail_price}}
				</view>
			</view>
			<view class="flex jc-between good-choose" @click="openPopup">
				<view>
					请选择规格数量
				</view>
				<view>
					<uniIcons type="arrowright" size="14"></uniIcons>
				</view>
			</view>
			<view class="good-attribute">
				<view>
					商品参数
				</view>
				<view>
					<view class="flex attribute-each a-center" v-for="item in detailData.attribute" :key="item.id">
						<view class="each-title">{{item.name}}</view>
						<view>{{item.value}}</view>
					</view>
				</view>
			</view>
			<view v-if="content">
				<parser :html="content" :tag-style="tagStyle"></parser>
			</view>
			<view>
				<titleLine>
					常见问题
				</titleLine>
				<view class="FAQ">
					<view v-for="item in detailData.issue" :key="item.id">
						<view class="disc-filled good-question">
							{{item.question}}
						</view>
						<view class="good-answer">
							{{item.answer}}
						</view>
					</view>
				</view>
			</view>
			<view>
				<titleLine>
					大家都在看
				</titleLine>
				<view>
					<goodBox class="goodbox" v-for="item in detailData.productList" :key="item.id" :item="item"></goodBox>
				</view>
			</view>

		</scroll-view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup-main" style="background: #FFFFFF;">
				<view class="flex">
					<view>
						<image class="popup-pic" :src="detailData.info.primary_pic_url" mode="">
					</view>
					<view class="popup-info">
						<view>
							{{detailData.info.name}}
						</view>
						<view class="popup-price">
							价格 ￥{{detailData.info.retail_price}}
						</view>
						<view>
							请选择数量
						</view>
					</view>
				</view>
				<view>
					数量
				</view>
				<uniNumberBox :min="0" @change="changeNum"></uniNumberBox>
			</view>
			<view style="height: 50px;" />
		</uni-popup>
		<!-- 底部栏 -->
		<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
	</view>
</template>

<script>
	import uniPopup from "../../components/uni-ui/uni-popup/uni-popup.vue"
	import uniIcons from '../../components/uni-ui/uni-icons/uni-icons.vue'
	import uniGoodsNav from '../../components/uni-ui/uni-goods-nav/uni-goods-nav.vue'
	import titleLine from "../../components/common/titleLine.vue"
	import parser from "@/components/u-parser/u-parser"
	import goodBox from "../../components/common/goodBox.vue"
	import uniNumberBox from "../../components/uni-ui/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			parser,
			titleLine,
			goodBox,
			uniGoodsNav,
			uniIcons,
			uniPopup,
			uniNumberBox
		},
		data() {
			return {
				id: null,
				detailData: null,
				content: null,
				winHeight: 0,
				showFlag: false,
				goodNum: 1,
				tagStyle: {
					img: 'display:block'
				},
				options: [{
					icon: 'heart', //heart-filled
					text: '收藏'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		methods: {
			onClick(e) {
				//区分点击收藏和购物车
				if (e.content.text === '收藏') {
					//如果未收藏则添加收藏，反则提示已收藏
					if (this.options[0].icon === 'heart') {
						this.$api.addCollect(this.id).then(res => {
							if (res.data.data === "success") {
								uni.showToast({
									title: "添加成功",
									duration: 800
								})
								this.options[0].icon = "heart-filled"
							}
						})
					} else {
						uni.showToast({
							icon: "none",
							title: "该商品已经被收藏了",
							duration: 800
						})
					}
				} else {
					//如果购物车有物品则跳转，没有则提示
					if (this.options[1].info === 0) {
						uni.showToast({
							icon: "none",
							title: "购物车内暂无商品",
							duration: 800
						})
					} else {
						uni.switchTab({
							url: "/pages/shopCart/shopCart"
						})
					}
				}
			},
			buttonClick(e) {
				if (this.showFlag) {
					if (e.index === 0) {
						this.$api.addCart(this.id, Number(this.goodNum)).then(res => {
							this.getNum()
						})
					} else {
						let paylist = JSON.stringify([{
							goods_id: this.id,
							goods_name: this.detailData.info.name,
							list_pic_url: this.detailData.info.list_pic_url,
							number: this.goodNum,
							retail_price: this.detailData.info.retail_price,
							type:'payNow'
						}])
						uni.navigateTo({
							url: `/pages/payList/payList?paylist=${paylist}`
						})
					}
				} else {
					this.openPopup()
				}
			},
			openPopup() {
				this.$refs.popup.open()
				this.showFlag = true
			},
			changeNum(e) {
				this.goodNum = e
				console.log(this.goodNum, e);
			},
			getDetail(id) {
				this.$api.getDetail(id).then(res => {
					if (res.data) {
						this.detailData = res.data
						this.content = res.data.info.goods_desc
						//获取收藏状态
						this.$api.getCollect(id).then(res => {
							if (res.data.collectGoodsList.some(item => item.id === id)) {
								this.options[0].icon = "heart-filled"
							}
						})
						//获取购物车数量
						this.getNum()
					}
				})
			},
			getNum() {
				this.$api.getCartList().then(res => {
					this.options[1].info = res.data.data.length
				})
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail(options.id)
			this.winHeight = uni.getSystemInfoSync().windowHeight - 50
		}
	}
</script>

<style scoped lang="scss">
	.detail-pic {
		width: 100%;
		height: 750rpx;
	}

	.top-info {
		padding: 20rpx 0;
		font-size: 24rpx;
		background-color: #F5F5F5;

	}

	.good-info {
		padding: 30rpx;
		border-bottom: 1rpx solid #ededed;

		.good-brief {
			font-size: 24rpx;
		}

		.good-price {
			color: red;
			margin-top: 40rpx;
		}
	}

	.good-choose {
		padding: 20rpx;
		border-bottom: 1rpx solid #ededed;
	}

	.good-attribute {
		padding: 40rpx 20rpx;

		.attribute-each {
			background: #f7f7f7;
			margin: 30rpx 0;
			padding: 20rpx;

			.each-title {
				color: #999999;
				width: 160rpx;
				font-size: 26rpx;
			}
		}
	}

	.FAQ {
		margin: 60rpx 20rpx;
	}

	.good-question {
		font-size: 24rpx;
		margin: 10rpx 0;
	}

	.good-answer {
		font-size: 22rpx;
		color: #989898;
	}

	.popup-main {
		padding: 40rpx 20rpx;

		.popup-pic {
			width: 170rpx;
			height: 170rpx;
		}

		.popup-info {
			padding: 20rpx;
		}

		.popup-price {
			color: red;
		}
	}
</style>
