<template>
	<view class="index-container">
		<!-- 头部定位于搜索框 -->
		<view class="index-header flex jc-between a-center">
			<view @click="openMap">
				<!-- #ifdef MP-WEIXIN -->
				<MPLocation ref="location" />
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<H5Location ref="location" />
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<AppLocation />
				<!-- #endif -->
			</view>
			<view class="position-re" @click="goto('/pages/search/search')">
				<input class="header-input" disabled placeholder="请输入关键字" type="text" value="">
				<image class="search-pic position-ab" src="../../static/imgs/search.png" mode="">
			</view>
		</view>
		<view v-if="dataList">


			<!-- 轮播图 -->
			<view class="index-swiper">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="item in dataList.banner" :key="item.id">
						<image class="swiper-pic" :src="item.image_url"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- channel -->
			<view class="flex jc-around index-channel">
				<view v-for="(item,index) in dataList.channel" :key="item.id" @click="goto(item.url)">
					<image class="channel-pic" :src="`../../static/imgs/channel${index+1}.png`" mode="" />
					<view class="t-center">
						{{item.name}}
					</view>

				</view>
			</view>
			<!-- 工厂 -->
			<view>
				<view class="t-center index-title">
					品牌制造商直供
				</view>
				<view class=" flex flex-wrap jc-around">
					<view class="index-brand position-re" @click="$gotoDetail('brandDetail',item.id)" v-for="item in dataList.brandList"
					 :key="item.id">
						<view class="position-ab brand-info" style="z-index: 1;">
							<view>
								{{item.name}}
							</view>
							<view class="brand-price">
								￥{{item.floor_price}}元起
							</view>
						</view>
						<image :src="item.new_pic_url" mode="" />
					</view>
				</view>
			</view>
			<!-- newGoods、hotGoods -->
			<view>
				<indexGoods title="新品首发" :bgcolor="bgcolor.new" type="new" :items="dataList.newGoods" />
				<indexGoods title="人气推荐·好物精选" :bgcolor="bgcolor.hot" type="hot" :items="dataList.hotGoods" />
			</view>
			<!-- topicList -->
			<view>
				<view class="t-center index-title">专题精选</view>
				<scroll-view scroll-x="true">
					<view class="flex">
						<view class="topic-box" v-for="item in dataList.topicList" @click="$gotoDetail('topicDetail',item.id)" :key="item.id">
							<image :src="item.scene_pic_url" mode=""></image>
							<view>
								<text>{{item.title}}</text>
								<text style="color: red; margin-left: 20rpx;font-size: 24rpx;">￥{{item.price_info}}元起</text>
							</view>
							<view class="txt-hidden topic-subtitle">{{item.subtitle}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 居家、餐厨 -->
			<view style="background: #eeeeee;">
				<indexGoodBox v-for="item in dataList.newCategoryList" :key="item.id" :item="item" />
			</view>
		</view>
	</view>
</template>

<script>
	import indexGoods from '../../components/index/indexGoods.vue'
	import indexGoodBox from '../../components/index/indexGoodBox.vue'
	// #ifdef MP-WEIXIN
	import MPLocation from '../../components/index/MPLocation.vue'
	// #endif
	// #ifdef APP-PLUS
	import AppLocation from '../../components/index/AppLocation.vue'
	// #endif
	// #ifdef H5
	import H5Location from '../../components/index/H5Location.vue'
	// #endif
	export default {
		data() {
			return {
				dataList: null,
				bgcolor: {
					new: ['#f2f7fc', '#8e9aae', '#dae4f0'],
					hot: ['#fbf5dd', '#afa37a', '#f1eacb']
				}
			}
		},
		components: {
			// #ifdef MP-WEIXIN
			MPLocation,
			// #endif
			// #ifdef H5
			H5Location,
			// #endif
			// #ifdef APP-PLUS
			AppLocation,
			// #endif
			indexGoods,
			indexGoodBox
		},
		methods: {
			getData() {
				this.$api.getIndex().then(res => {
					console.log(res.data);
					if (res.data.success) {
						this.dataList = res.data
					}
				}).catch(err => {})
			},
			goto(url) {
				uni.navigateTo({
					url
				})
			},
			openMap() {
				let location = uni.getStorageSync('local')
				uni.chooseLocation({
					latitude: location.latitude,
					longitude: location.longitude,
					success: (res) => {
						uni.setStorageSync('local', {
							name: res.name,
							latitude: res.latitude,
							longitude: res.longitude
						})
						this.$refs.location.location = res.name
					}
				});
			}
		},
		onShow() {
			if (!uni.getStorageSync('local')) {
				this.$nextTick(() => {
					this.$refs.location.getAuthorize()
				})
			} else {
				let location = uni.getStorageSync('local')
				console.log(location);
				this.$nextTick(() => {
					this.$refs.location.location = location.name
				})

			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="scss">
	.index-container {
		width: 100%;
	}

	.index-header {
		margin: 24rpx 20rpx;

		.header-input {
			position: relative;
			border-radius: 20rpx;
			text-indent: 50rpx;
			font-size: 28rpx;
			padding: 10rpx 0;
			width: 520rpx;
			background: #f7f8fa;
		}

		.search-pic {
			top: 50%;
			margin-top: -20rpx;
			left: 10rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}

	.index-swiper {
		height: 300rpx;

		.swiper-pic {
			width: 100%;
			height: 300rpx;
		}
	}

	.index-channel {
		margin: 40rpx 0;

		.channel-pic {
			width: 60rpx;
			height: 60rpx;
		}
	}

	.index-brand {
		width: 350rpx;
		height: 250rpx;
		margin-top: 10rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.brand-info {
		font-size: 24rpx;
		top: 20rpx;
		left: 20rpx;

		.brand-price {
			font-size: 22rpx;
			color: #cccccc;
		}
	}

	.topic-box {
		width: 600rpx;
		height: 460rpx;
		padding: 10rpx;

		image {
			width: 580rpx;
			height: 330rpx;
		}

		.topic-subtitle {
			font-size: 24rpx;
			margin-top: 20rpx;
			color: #d2d2d2;
		}
	}

	.index-title {
		margin: 40rpx;
	}
</style>
