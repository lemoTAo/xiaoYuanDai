<template>
	<view>
		<view class="goods-item">
			<!-- 左侧图片 -->
			<view class="goods-item-left">
				<image :src="list.goods_small_logo" ></image>
			</view>
			<!-- 右侧内容 -->
			<view class="goods-item-right">
				<view class="goods-name">{{list.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{list.goods_price |tofixed}}</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			list:{
				type:Object,
				default:{},
			}
		},
		data() {
			return {
				
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
		display: flex;
		border-bottom: 2px solid #efefef;
		margin-bottom: 5px;
		padding: 5px 2px;
		
		.goods-item-left{
			
			image{
				width: 100px;
				height: 100px;
			}
			
		}
		.goods-item-right{
			display: flex;
			justify-items: center;
			flex-direction: column;
			justify-content: space-between;
			.goods-price{
				color: red;
				font-size: 40rpx;
				font-weight: 700;
			}
		}
		
	}
</style>