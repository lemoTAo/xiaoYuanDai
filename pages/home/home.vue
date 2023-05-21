<template>
	<view>
		<view class="search-box">
			<my_search @click="gotoSearch"></my_search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for="list,index in swiperList" :key="index" >
			<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+list.goods_id">
				<image :src="list.image_src" ></image>
			</navigator>
		</swiper-item>
		</swiper>
		<view class="nav_lsit">
			<view class="nav-item" v-for="list,index in navList " :key="index" @click="navChange(list.name)">
				<image :src="list.image_src" ></image>
			</view>
		</view>
	     <view class="floor_list">
		    <view class="floor_item" v-for="list,index in floorList" :key="index">
				<image :src="list.floor_title.image_src" class="floor_title"></image>
				<!-- 图片盒子 -->
				<view class="floor-img-box">
					<!-- 左侧图片 -->
					<navigator class="left-img-box" :url="list.product_list[0].url">
						<img :src="list.product_list[0].image_src" alt=""
						:style="{width:list.product_list[0].image_width+'rpx'}" mode="widthFix">
					</navigator>
					<!-- 右侧图片 -->
					<view class="right-img-box">
						<navigator class="" v-for="lis,index in list.product_list" 
						:key="index" v-if="index!=0"
						:url="lis.url">
						<image :src="lis.image_src" mode="widthFix"
							:style="{width:list.product_list[0].image_width+'rpx'}" >
						</image>
						</navigator>
						
					</view>
				</view>
			</view>
			
		 </view>
	</view>
</template>

<script>
import { $http } from '@escook/request-miniprogram';
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad() {
			this.getGetSwiperList(),
			this.getNaviList(),
			this.getFloorList()
		},
		methods:{
			//轮播图
		    async	getGetSwiperList(){
				const {data:res}= await  uni.$http.get('/api/public/v1/home/swiperdata')
				
				if(res.meta.status!==200){
					return uni.$showMsg()
					
				}
				this.swiperList=res.message
			},
		    async getNaviList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200)
				return uni.$showMsg()
				this.navList=res.message
			}, 
			async getFloorList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200)
				return uni.$showMsg()
				res.message.forEach(item=>{
					item.product_list.forEach(list=>{
						list.url='/subpkg/goods_list/goods_list?'+list.navigator_url.split('?')[1]
					})
				})
				this.floorList=res.message
			},
			navChange(e){
				if(e==='分类')
				uni.switchTab({
					url:"/pages/cate/cate"
				})
			},//搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	    
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}
.nav_lsit{
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 30rpx 0;
	.nav-item{
		width: 128rpx;
		height: 140rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
}
.floor_title{
	height: 60rpx;
	width: 100%;
	display: flex;
	
}

.floor-img-box{
	display: flex;
	padding-left: 10rpx;
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
	}
}
.search-box{
	position:sticky;
	top:0;
	z-index: 999;
}
</style>
