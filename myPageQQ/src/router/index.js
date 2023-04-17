import Vue from 'vue'
import VueRouter from 'vue-router'
//引入Login组件
import Login from "../views/Login";

import Home from "../views/Home";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',  //访问路径
    name: 'Login',  //名字
    component: Login  //组件
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/home',
    name:'Home',
    component:Home
  },



]

const router = new VueRouter({
  routes
})

export default router
