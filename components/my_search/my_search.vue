<template>
	<view class="my-search-container" @click="gotosearch">
		<view class="my-search-box" :style="{'background-color':bgc}">
			<uni-icons type="search" size="17" :style="{'border-radius':radius+'px'}"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my_search",
		data() {
			return {
				
			};
		},
		props:{
			bgc:{
				type:String,
				default:'#c000000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		methods:{
			gotosearch(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	background-color: #c00000;
	height: 50px;
	padding: 0 10px ;
	display: flex;
	align-items: center;
}
.my-search-box{
 height: 36px;
 background-color: #ffffff;
 border-radius: 15px;
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 .placeholder{
	 font-size: 15px;
	 margin-left: 5px;
 }
}
</style>