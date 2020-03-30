<template>
	<view>
		<u-parse :html="content" :tag-style="tagStyle"></u-parse>
	</view>
</template>

<script>
import uParse from '../../components/u-parser/u-parser.vue'
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
						this.content = res.data.data.content
						console.log(this.content);
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

		// /deep/ img {
		// 	width: 750rpx;
		// }
	}
</style>
