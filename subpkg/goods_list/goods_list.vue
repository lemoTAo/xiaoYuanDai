<template>
	<view>
		<view class="goods-list" >
			<view v-for="list,index in goodsList" :key="index" @click="gotoDeatil(list)">
				<my-goods :list="list"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				// 节流阀
				isloading:false,
				timer:null
			}
		},
		methods: {
		async	getGoodsList(){
			this.isloading=true
			 const {data:res}=await uni.$http.get('/api/public/v1/goods/search',this.obj)	
			 if(res.meta.status!==200){
			 	return uni.$showMsg()
			 }
			 this.goodsList=[...this.goodsList,...res.message.goods];
			 this.total=res.message.total
			 this.isloading=false
			},
			gotoDeatil(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
				
			}
		},
		onLoad(options) {
			this.obj.cid=options.id||'';
			this.obj.query=options.query||'';
			this.getGoodsList()
		},
		onPullDownRefresh() {
		clearTimeout(this.timer)
		this.timer=setTimeout(()=>{
				this.goodsList=[]
				this.obj.pagenum=1
				this.total=0
				this.getGoodsList()
	
				uni.stopPullDownRefresh()
				uni.pageScrollTo({
					scrollTop:1
				})
			},1000)
		},
		onReachBottom() {
			
		    if(this.obj.pagenum*this.obj.pagesize>this.total){
				uni.showToast({
					title:'加载完毕'
				})
			}
			if(!(this.obj.pagenum*this.obj.pagesize>this.total) && !this.isloading)
			 {	   
				 console.log(1)
				   this.obj.pagenum++
				  this.getGoodsList()
			 }
		}
		
		
	}
</script>

<style lang="scss">
.goods-list{
	display: flex;
	flex-direction: column;
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
	
}
</style>
