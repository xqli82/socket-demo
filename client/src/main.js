import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import io from 'socket.io/client-dist/socket.io'
import './assets/css/app.css'
import echarts from 'echarts'
import dayjs from 'dayjs'

Vue.config.productionTip = false
Vue.prototype.$io = io
Vue.prototype.$echarts= echarts
Vue.prototype.$dayjs= dayjs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
