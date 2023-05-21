<template>
	<view >
		<view class="search-box">
			<uni-search-bar @confirm="search" :radius="100"  @input="input" cancelButton="none"  ref='th'>
			</uni-search-bar>
		</view>
	<!-- 结果 -->
		<view  class="sugg-list" v-if="searchResult.length!=0">
			<view class="sugg-item" v-for="list,index in searchResult" :key="index" @click="getoDetail(list.goods_id)">
				<view class="goods-name">{{list.goods_name}}</view>
				<uni-icons type="right" size="16" @click="clearResult"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史                        两者二选一-->
		<view class="history-box" v-if="searchResult.length==0">
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="25" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="list" v-for="list,index in historys" :key="index" @click="gotToGoodsListByhistory(list)"></uni-tag>
			</view>
		</view>
	</view>
</template>
<!-- input内拿不到     -->
<script>
	export default {
		data() {
			return {
				timer:'',
				kw:'',
				searchResult:[],
				history:['1','2','3']
			};
		},
        methods:{
			clearResult(){
				searchResult=[]
			},
			input(e){
				
			clearTimeout(this.timer)
			 this.timer=setTimeout(()=>{
				this.kw=e
				this.getSearchList()
			},500)
			},
		    async	getSearchList(){
				if(this.searchResult===0)
				{
					return ''
				}
				const {data:res}= await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				console.log(res.meta.status)
				if(res.meta.status!==200)
				{
					return  uni.$showMsg()
				}
				this.searchResult=res.message
				this.sevehistoryList()
			},
			getoDetail(goods_id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
				})
			},
			sevehistoryList(){
				//unshift
				// 因为历史记录每次要排在最前面，直接set达不到
				//去除重置
				const set=new Set(this.history)
				// 移除对应的元素
				set.delete(this.kw)
				//添加元素
				set.add(this.kw)
				this.history=Array.from(set)
				//存储本地
				uni.setStorageSync('kw',JSON.stringify(this.history))
			},
			clearHistory(){
				//清空历史
				// uni.clearStorageSync('kw')
				this.history=uni.setStorageSync('kw',[])
			},
			gotToGoodsListByhistory(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+kw
				})
				
			}
		},
		computed:{
			historys(){
				return [...this.history]
			}
		},
		onLoad() {
			//初始化，获取本地地址
			this.history=JSON.parse(uni.getStorageSync('kw')||'[]')
		}
		
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0%;
	z-index: 999;
}
.sugg-list{
	padding: 0 5px;
	.sugg-item{
		font-size: 12px;
		padding: 13px 0 ;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.goods-name{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 3px;
	}
}
.history-box{
	.history-title{
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px; ;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			margin-top: 5px;
			margin-left: 5px;
		}
	}
}
</style>
