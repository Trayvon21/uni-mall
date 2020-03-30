<template>
	<view class="flex jc-between cart-each a-center">
		<view class="flex a-center">
			<checkbox v-if="flag" value="goods_id" :checked="item.checked" @click="changeOne(index)" />
			<image class="cart-pic" :src="item.list_pic_url" mode=""></image>
			<view>
				<view>
					{{item.goods_name}}
				</view>
				<view>
					￥{{item.retail_price}}
				</view>
			</view>
		</view>
		<view>
			x {{item.number}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			index: {
				type: Number,
				default: 0
			},
			flag: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			changeOne(index) {
				this.$emit("changeOne", index)
			}
		}
	}
</script>

<style scoped lang="scss">
	.cart-each {
		padding: 10rpx 50rpx 30rpx 10rpx;
		background: white;
		margin-bottom: 1rpx;
	}

	.cart-pic {
		width: 120rpx;
		height: 120rpx;
	}
</style>
