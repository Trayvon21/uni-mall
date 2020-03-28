import Vue from 'vue'
import App from './App'
import api from './http/api.js'
Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'
Vue.prototype.$gotoDetail = (url, id) => {
	uni.navigateTo({
		url: `/pages/${url}/${url}?id=${id}`
	})
}
const app = new Vue({
	...App
})
app.$mount()
