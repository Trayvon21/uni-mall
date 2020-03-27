<template>
	<view class="container">
		{{banner}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: null
			}
		},
		methods: {
			getData() {
				this.$api.getIndex().then(res => {
					console.log(res.data);
					if(res.data.success){
						this.data=res.data
					}
				}).catch(err => {

				})
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style>
	.intro {
		font-size: 14px;
		line-height: 24px;
	}
</style>
