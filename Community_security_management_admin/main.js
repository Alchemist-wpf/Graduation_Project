

// // #ifdef VUE2
// import { createSSRApp } from 'vue'
// import App from './App.vue'
// // import { goBack } from '@/utils/common.js' //公共方法
// // Object.assign(Vue.prototype, {
// // 	'$goBack':goBack,
// // })

// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// // #endif
import App from './App'
// #ifndef VUE3
import Vue from 'vue'
// 第三方请求包
// import request from '@/utils/request.js'
// import * as tools from '@/utils/tools.js'
 
// //将http挂载到uni对象上
// uni.$request = request
// //封装的展示消息提示的方法
// Object.keys(tools).forEach(key=>{
//   uni.key = tools[key]
// })
 
Vue.config.productionTip = false
 
App.mpType = 'app'
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