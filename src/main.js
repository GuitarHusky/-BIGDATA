// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/status'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import echarts from 'echarts'


Vue.prototype.$echarts = echarts

Vue.use(iView)

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
})
