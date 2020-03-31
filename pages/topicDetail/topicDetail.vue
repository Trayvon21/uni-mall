<template>
	<view v-if="content">
		<u-parse :html="content" :tag-style="tagStyle"></u-parse>
	</view>
</template>

<script>
	import uParse from '../../components/uni-ui/u-parser/u-parser.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				content: null,
				tagStyle: {
					img: 'display:block'
				}
			}
		},
		methods: {
			getTopicDetail(id) {
				this.$api.getTopicDetail(id).then(res => {
					if (res.status === 200) {
						//小程序和app不会自动识别协议头，需要用正则把//换成http://
						const replaceReg = new RegExp('//', 'g');
						const replaceString = `http://`
						this.content = res.data.data.content.replace(replaceReg, replaceString);
					}
				})
			}
		},
		onLoad(options) {
			this.getTopicDetail(options.id)
		}
	}
</script>

<style scoped lang="scss">
	.topic-detail {
		width: 100%;
	}
</style>
