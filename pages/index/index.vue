<template>
	<view class="index-container" v-if="dataList">
		<!-- 头部定位于搜索框 -->
		<view class="index-header flex jc-between a-center">
			<index-location />
			<view class="position-re">
				<input class="header-input" disabled placeholder="请输入关键字" type="text" value="">
				<image class="search-pic position-ab" src="../../static/imgs/search.png" mode="">
			</view>
		</view>
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
				<view class="index-brand position-re" v-for="item in dataList.brandList" :key="item.id">
					<view class="position-ab brand-info" style="z-index: 1;">
						<view class="">
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
			<indexGoods title="新品首发" :bgcolor="bgcolor.new" :items="dataList.newGoods" />
			<indexGoods title="人气推荐·好物精选" :bgcolor="bgcolor.hot" :items="dataList.hotGoods" />
		</view>
		<!-- topicList -->
		<view>
			<view class="t-center index-title">专题精选</view>
			<scroll-view scroll-x="true">
				<view class="flex">
					<view class="topic-box" v-for="item in dataList.topicList" :key="item.id">
						<image :src="item.scene_pic_url" mode=""></image>
						<view class="">
							<text>{{item.title}}</text>
							<text style="color: red; margin-left: 20upx;font-size: 24upx;">￥{{item.price_info}}元起</text>
						</view>
						<view class="txt-hidden topic-subtitle">{{item.subtitle}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 居家、餐厨 -->
		<view class="" style="background: #eeeeee;">
			<indexGoodBox v-for="item in dataList.newCategoryList" :key="item.id" :item="item" />
		</view>
	</view>
</template>

<script>
	import indexLocation from '../../components/index/indexLocation.vue'
	import indexGoods from '../../components/index/indexGoods.vue'
	import indexGoodBox from '../../components/index/indexGoodBox.vue'
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
			indexLocation,
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
				}).catch(err => {

				})
			},
			goto(url) {
				uni.navigateTo({
					url
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
		margin: 24upx 20upx;

		.header-input {
			position: relative;
			border-radius: 20upx;
			text-indent: 50upx;
			font-size: 28upx;
			padding: 10upx 0;
			width: 520upx;
			background: #f7f8fa;
		}

		.search-pic {
			top: 50%;
			margin-top: -20upx;
			left: 10upx;
			width: 36upx;
			height: 36upx;
		}
	}

	.index-swiper {
		height: 300upx;

		.swiper-pic {
			width: 100%;
			height: 300upx;
		}
	}

	.index-channel {
		margin: 40upx 0;

		.channel-pic {
			width: 60upx;
			height: 60upx;
		}
	}

	.index-brand {
		width: 350upx;
		height: 250upx;
		margin-top: 10upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.brand-info {
		font-size: 24upx;
		top: 20upx;
		left: 20upx;

		.brand-price {
			font-size: 22upx;
			color: #cccccc;
		}
	}

	.topic-box {
		width: 600upx;
		height: 460upx;
		padding: 10upx;

		image {
			width: 580upx;
			height: 330upx;
		}

		.topic-subtitle {
			font-size: 24upx;
			margin-top: 20upx;
			color: #d2d2d2;
		}
	}

	.index-title {
		margin: 40upx;
	}
</style>
