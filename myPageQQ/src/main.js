import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入socket.io
import VueSocketIO from "vue-socket.io";
//引入axios
import axios from "axios";

//设置默认请求路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
//把axios作为一个Vue的全局属性添加
Vue.prototype.$http = axios

//创建全局的VueSocketIO对象，方便在所有组件中使用
Vue.use(new VueSocketIO({
  connection:'127.0.0.1:3000'
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
