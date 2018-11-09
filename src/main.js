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

// axios
import axios from 'axios'
// ajax请求
Vue.prototype.$http = axios

import VueTouch from'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})


import './rem'

/*引入UI组件*/
// 引入mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import { CellSwipe } from 'mint-ui';
Vue.component(CellSwipe.name, CellSwipe);

// 刷新页面时转圈圈
import { Indicator } from 'mint-ui' 

Vue.use(Mint);

Vue.prototype.$loading = Indicator;

/*声明路由*/
const routes = [
  {
    path:'/',
    name:'home',
    meta: { keepAlive: true },
    component:resolve => require(['./routers/Home'], resolve)
  },{
    path:'/discovery',
    name:'discovery',
    meta: { keepAlive: true },
    component:resolve => require(['./routers/Discovery.vue'], resolve)
  },{
    path:'/magazine',
    name:'magazine',
    meta: { keepAlive: true },
    component:resolve => require(['./routers/Magazinemain.vue'], resolve)
  },{
    path:'/car',
    name:'car',
    meta: { 
      requireAuth: true, // 配置此条，进入页面前判断是否需要登陆 
      keepAlive: true
    }, 
    component:resolve => require(['./routers/Car.vue'], resolve)
  },{
    path:'/me',
    name:'me',
    component:resolve => require(['./routers/Me.vue'], resolve),
    meta: { keepAlive: true }
  },{
    path:'/detail',
    name:'detail',
    component:resolve => require(['./routers/Detailpage.vue'], resolve),
    meta: { keepAlive: false }
  },{
    path:'/login',
    name:'login',
    component:resolve => require(['./routers/Login.vue'], resolve),
    meta: { keepAlive: true }
  },{
    path:'/magazinedetail',
    name:'detailmagazine',
    component:resolve => require(['./routers/Detailmagazine.vue'], resolve)
  },{
    path:'/search',
    name:'search',
    component:resolve => require(['./routers/Search.vue'], resolve),
    meta: { keepAlive: true }
  },
]

/*实例化router*/
const router = new VueRouter({
  mode:'history',
  routes
})

const store = new Vuex.Store({
	/*状态*/
	state: {
    homeData: "",
    hotData:'',
    MagezineData:'',
    CarRecommend:'',
    showfixed:true,
    userData:[],
    SearchData:[]
	},
	/*存放到状态管理中*/
	mutations: {
		keepHomeData(state, data) {
			state.homeData = data;
    },
    keepHotData(state, data) {
			state.hotData = data;
    },
    keepMagazineData(state, data) {
			state.MagezineData = data;
    },
    keepCarRecommendData(state, data) {
			state.CarRecommend = data;
    },
    keepShowFixed(state, data) {
			state.showfixed = data;			
		},
    keepUserData(state, data) {
			state.userData = data;			
    },
    keepSearchData(state, data) {
			state.SearchData = data;			
		}
  },
  /*从子组件拿回数据，触发mutations*/
	actions: {
		setHomeData(context, data) {
			context.commit('keepHomeData', data);
    },
    setHotData(context, data) {
			context.commit('keepHotData', data);
    },
    setMagazineData(context, data) {
			context.commit('keepMagazineData', data);
    },
    setCarRecommendData(context, data) {
			context.commit('keepCarRecommendData', data);
    },
    setShowFixed(context, data) {
			context.commit('keepShowFixed', data);
    },
    setUserData(context, data) {
			context.commit('keepUserData', data);
    },
    setSearchData(context, data) {
			context.commit('keepSearchData', data);
		}
  },
  /*把数据返回给子组件*/
	getters:{
		getHomeData(state){
			return state.homeData;
    },
    getHotData(state){
			return state.hotData;
    },
    getMagazineData(state){
			return state.MagezineData;
    },
    getCarRecommendData(state){
			return state.CarRecommend;
    },
    getShowFixed(state){
			return state.showfixed;
    },
    getUserData(state){
			return state.userData;
    },
    getSearchData(state){
			return state.SearchData;
		}
	}
})

router.beforeEach((to, from, next) => {    

    //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
    if(to.path === '/login'){  
      console.log('next');
      next()  
    }  // 如果即将进入登录路由，则直接放行
    else {     //进入的不是登录路由
      if(to.meta.requiresAuth && !sessionStorage.getItem('_id')) {
        next({ path: '/login' ,query: { redirect: to.fullPath }})
      } 

      //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
      else { 
        next() 
      } //如果不需要登录验证，或者已经登录成功，则直接放行
  }       
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
