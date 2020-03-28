<template>
	<view>
		<view class="">
			<uniSearchBar @confirm="goSearch" @cancel="cancel" @input="searchVal" cancelButton="always" :value="value"></uniSearchBar>
		</view>
		<view class="" v-if="results.length>0">
			<view class="reslut-box" v-for="item in results" :key="item.id" @click="gotoDetail(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="search-about" v-else>
			<view class="" v-if="historyData.length>0">
				<view class="flex jc-between">
					<view class="search-title">搜索历史</view>
					<view class="" @click="clearHistory">
						<uni-icons type="trash" size="20"></uni-icons>
					</view>
				</view>
				<view class="">
					<view class="search-each" @click="goSearch(item.keyword)" v-for="item in historyData" :key="item.id">
						{{item.keyword}}
					</view>
				</view>
			</view>
			<view class="">
				<view class="search-title">
					热门搜索
				</view>
				<view class="">
					<view class="search-each" @click="goSearch(item.keyword)" :class="[item.is_hot?'is_hot':'']" v-for="item in hotKeywordList"
					 :key="item.id">
						{{item.keyword}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcons from "../../components/uni-ui/uni-icons/uni-icons.vue"
	import uniSearchBar from "../../components/uni-ui/uni-search-bar/uni-search-bar.vue"
	export default {
		components: {
			uniSearchBar,
			uniIcons
		},
		data() {
			return {
				historyData: [],
				hotKeywordList: null,
				results: [],
				value: ''
			};
		},
		methods: {
			searchAbout() {
				this.$api.searchAbout().then(res => {
					if (res.status === 200) {
						this.historyData = res.data.historyData
						this.hotKeywordList = res.data.hotKeywordList
					}
				})
			},
			searchVal(e) {
				if (e.value === '') {
					// this.results = []
				}
			},
			goSearch(e) {
				if (e.value) {
					this.value = e.value
				} else if (typeof e === 'string') {
					this.value = e
				} else {
					uni.showToast({
						icon: "none",
						title: "参数不全",
						duration: 800
					})
					return;
				}
				this.$api.searchKeyword(this.value).then(res => {
					if (res.status === 200) {
						this.results = res.data.keywords
					}
					this.addHistory(this.value)
				})
			},
			addHistory(value) {
				this.$api.addHistory(value)
			},
			clearHistory() {
				uni.showModal({
					title: '清除记录',
					content: '是否清除历史浏览记录',
					success: (res) => {
						if (res.confirm) {
							this.$api.clearHistory().then(res => {
								if (res.status === 200) {
									this.historyData = []
									uni.showToast({
										title: res.data.data,
										duration: 800
									});
								}
							})
						} else if (res.cancel) {
							uni.showToast({
								icon: "none",
								title: "您已取消清除记录",
								duration: 800
							});
						}
					}
				});
			},
			cancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		},
		watch: {
			results(val) {
				if (val.length === 0) {
					this.searchAbout()
				}
			}
		},
		onLoad() {
			this.searchAbout()
		}
	}
</script>

<style lang="scss">
	.reslut-box {
		margin: 40rpx 20rpx;
	}

	.search-about {
		margin: 20rpx;

		.search-title {
			margin-bottom: 10rpx;
		}

		.search-each {
			font-size: 24rpx;
			padding: 10rpx;
			display: inline-block;
			border: 1rpx solid #ededed;
			margin: 10rpx;

		}

		.is_hot {
			color: red;
			border: 1rpx solid red;
		}
	}
</style>
