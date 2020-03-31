<script>
	export default {
		globalData: {
			active: null,
			openId: null
		},
		methods: {
			showDote() {
				this.$api.getCartList().then(res => {
					if (res.data.data) {
						uni.setTabBarBadge({
							index: 3,
							text: String(res.data.data.length)
						})
					}
				})
			}
		},
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			if (uni.getStorageSync('user')) {
				this.showDote()
			}
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	@import "./styles/common.scss";

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>
