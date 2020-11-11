import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// import '@/api'
import * as API from '@/api'
import store from '@/store'
import '@/mock/mockServer'
import "swiper/css/swiper.css";

import './validate' //引入和表单验证相关的模块


// 图片懒加载
import VueLazyload from 'vue-lazyload'
 
import loading from '@/assets/images/timg.gif'

Vue.use(VueLazyload,{
  loading
})

// 按需引入element-ui当中的组件
import {Message,MessageBox} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

import TypeNav from '@/components/TypeNav'
import SliderLoop from '@/components/SliderLoop'
import Pagination from '@/components/Pagination'



Vue.component('TypeNav',TypeNav)
Vue.component('SliderLoop',SliderLoop)
Vue.component('Pagination',Pagination)


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
