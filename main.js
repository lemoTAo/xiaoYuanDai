
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网路请求
import { $http } from '@escook/request-miniprogram'
uni.$http=$http
$http.baseUrl = 'https://api-ugo-web.itheima.net'
//拦截器
$http.beforeRequest = function (options) {
 uni.showLoading({
 	title:"加载中"
 })
}
$http.afterRequest = function (res) {
	return new Promise((resolve,reject)=>{
		      success:(res)=>{
		        resolve( res );
		      },
		      
             uni.hideLoading()
	})
}
//封装uni.showToast
uni.$showMsg=function(title='请求失败',duration=1500){
	uni.showToast({
		title:title,
		duration:duration,
		icon:'none'
	})
}
// 引入store
import store from'store/store.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// // #ifdef VUE3
// import { createSSRApp } from 'vue'
// import App from './App.vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// // #endif