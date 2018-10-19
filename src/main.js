/*引入vue*/
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

/*引入vue路由 router*/
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/*引入状态管理*/
import Vuex from 'vuex'
Vue.use(Vuex)

/*引入jquery*/
import $ from 'jquery'
window.$=$


/*引入路由文件,注意大小写，路由名称和路由文件用开头字母大小，在template中用小写，驼峰用-代替*/
import Home from './routers/Home'
import Discovery from './routers/Discovery'
import Magezine from './routers/Magezine'
import Car from './routers/Car'
import Me from './routers/Me'
import './assets/main.css'

import './rem'

/*引入UI组件*/
import Mint from 'mint-ui';
Vue.use(Mint);



/*声明路由*/
const routes = [
  {
    path:'/',
    component:Home
  },{
    path:'/discovery',
    component:Discovery
  },{
    path:'/magazine',
    component:Magezine
  },{
    path:'/car',
    component:Car
  },{
    path:'/me',
    component:Me
  }
]

/*实例化router*/
const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
	/*状态*/
	state: {
		homeData: "",
	},
	/*存放到状态管理中*/
	mutations: {
		keepHomeData(state, data) {
			state.homeData = data;
		}
  },
  /*从子组件拿回数据，触发mutations*/
	actions: {
		setHomeData(context, data) {
			context.commit('keepHomeData', data)
		},
  },
  /*把数据返回给子组件*/
	getters:{
		getHomeData(state){
			return state.homeData
		}
	}
})



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
