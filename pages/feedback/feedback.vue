<template>
	<view class="container">
		<view class="border-down">
			意见反馈
		</view>
		<view class="textarea position-re">
			<textarea v-model="val" placeholder="请填写你的意见和反馈" class="textarea border-down" maxlength="150" />
			<view class="position-ab info">
				{{val.length}}/150
			</view>
		</view>
		
		<view class="flex border-down">
			<view class="">联系方式：</view>
		<input type="text" value="" placeholder="邮箱/手机号/微信号" />
		</view>
		<button type="default" class="btn" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val:''
			};
		},
		methods:{
			submit(){
				uni.showToast({
					icon:"none",
					title:"暂不支持",
					duration:800
				})
				setTimeout(()=>{
					uni.switchTab({
						url:"/pages/index/index"
					})
				},800)
			}
		}
	}
</script>

<style lang="scss">
	.container{
		overflow: hidden;
	}
	.border-down{
		margin: 20rpx;
		padding: 10rpx 0;
	}
	.textarea{
		height: 340rpx;
		width: 100%;
		
	}
	.info{
			bottom: 0;
			right: 20rpx;
		}
.btn{
	width: 80%;
	margin: 60rpx auto;
	color: white;
	background: #ab212c;
}
</style>
