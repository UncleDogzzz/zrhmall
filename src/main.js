import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'


//test////
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()         //创建事件总线 bus

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
