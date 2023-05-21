<template>
	<view>
		<my_search :bgc="'pink'" :radius="20" @click="gotoSearch"></my_search>
		<view class="scroll-view-container">
			<scroll-view class="scroll-view-left" scroll-y="true" :style="{height:windowHeight}">
				<view :class="['scroll-view-left-item',index===chosed ? 'active':'' ]" 
		
				v-for="list,index in CateList" :key="index"
				@click="onChangechosed(index)">
					{{list.cat_name}}
				</view>
				

			</scroll-view>
			<scroll-view scroll-y="true"  :style="{height:windowHeight}" class="scroll-view-right">
				<view class="cate-lv2" v-for="list,index in CateList2" :key="index">
					<!-- 二级分类表题 -->
					<view class="cate-lv2-title">/{{list.cat_name}}/</view>
					<!-- 三级分类 -->
					<view class="cate-lv3">
						<view v-for="list2,index in list.children" :key="index" class="cate-lv3-item" @click="gotogoods_lists(list2.cat_id)">
						   
							<image :src="list2.cat_icon.replace('dev','web')"  class="imagestyle"></image>
							
								<text>{{list2.cat_name}}</text>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				windowHeight:'',
				CateList:[],
				CateList2:[],
				look:[],
				chosed:0
			};
		},
		onLoad() {
			const system=uni.getSystemInfoSync()
			this.windowHeight=system.windowHeight+'px';
			this.getCateList()
		},
		methods:{
			//获取分类数据
		 async getCateList(){
			let  {data:res}= await uni.$http.get('/api/public/v1/categories')
			if(res.meta.status!==200){
				return uni.$showMsg()
			}
			this.CateList=res.message
			this.CateList2=res.message[0].children
			
           
		},
		onChangechosed(index){
			this.chosed=index
			this.CateList2=this.CateList[index].children
		},
		gotoSearch(){
			uni.navigateTo({
				url:'/subpkg/search/search'
			})
		},
		gotogoods_lists(id){
			uni.navigateTo({
				url:'/subpkg/goods_list/goods_list?id='+id
			})
		}
		
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.scroll-view-left{
		width: 20%;
		.scroll-view-left-item{
			background-color: #f7f7f7;
			line-height: 120rpx;
			text-align: center;
			font-size: 24rpx;
			
			&.active{
			background-color: #FFF;	
			position: relative;
			
			&::before{
				display: block;
				content: '';
				width: 4px;
			    height: 30px;	
				background-color: red;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
			}
			}
			
		}
		
		
		
	}
	.scroll-view-right{
		width: 80%;
		.cate-lv2{
			.cate-lv2-title{
		         font-size: 36rpx;
		         font-weight: bold;
		         text-align: center;
		         padding: 30rpx 0;
				
	        }
			.cate-lv3{
				 display: flex;
				 width: 100%;
				 flex-wrap: wrap;
				.cate-lv3-item
				{  
				  display: flex;
				  justify-content: center;
				  flex-direction:column;
				  align-items: center;
				  width: 33.3%;
				  margin-bottom: 10px;
				 
				    .imagestyle{
				    	 width: 60px;
				    	 height: 60px;
				      }
				      text{
				    	  font-size: 12px;
				      }
				}
			}
			
		}
		
	}
}
</style>
