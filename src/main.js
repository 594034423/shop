// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "../lib/hotcss/hotcss.js"
import VeeValidate from 'vee-validate'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

export const eventBus = new Vue();

Vue.use(VeeValidate)
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
