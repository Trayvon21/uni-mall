<template>
	<view class="nav-bg">
		<view class="nav-each flex a-center jc-around position-re" :class="[active===item.id?'nav-active':'']" v-for="item in navList"
		 @click="changeActive(item.id)" :key="item.id">
			{{item.name}}
			<view v-if="active===item.id" class="position-ab nav-line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			navList: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				active: this.navList[0].id
			}
		},
		methods: {
			changeActive(id) {
				this.$emit('changeNav', id)
			},
		}
	}
</script>

<style lang="scss">
	.nav-bg {
		width: 100%;
		// background: green;
	}

	.nav-each {
		height: 80rpx;
	}

	.nav-active {
		color: #a2262a;
	}

	.nav-line {
		width: 8rpx;
		height: 80rpx;
		background: #a2262a;
		top: 0;
		left: 0;
	}
</style>
