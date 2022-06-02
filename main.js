import App from './App'
// import { $http } from '@escook/request-miniprogram'
// #ifndef VUE3
import Vue from 'vue'
import module from './ajax/api/index.js'
Vue.config.productionTip = false
App.mpType = 'app'
//Vue.prototype.$http=$http;
Vue.prototype.$http = module;

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif