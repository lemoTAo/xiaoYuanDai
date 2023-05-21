import vue from 'vue'
import  vuex from 'vuex'
vue.use(vuex)
import modulesCart from '@/store/cart/cart.js'
const store=new vuex.Store({
	modules:{
		cart:modulesCart
	}
})
export default store
