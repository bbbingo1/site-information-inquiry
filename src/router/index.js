/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 01:10:53
 * @LastEditTime: 2019-09-01 15:26:35
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
import PageFirst from '@/components/page1'
import PageSecond from '@/components/page2'
import Login from '@/components/login'

Vue.use(Router)

//记录路由状态
global.currentPath = {
  data:[1]
};
export default new Router({
  routes: [
    {
      path: '/',
      component: PageFirst
    },
    {
      path: '/PageFirst',
      name: 'PageFirst',
      menuShow: true,
      showName:'设施地图',
      component: PageFirst
    },
    {
      path: '/PageSecond',
      name: 'PageSecond',
      menuShow: true,
      showName:'添加设施',
      component: PageSecond
    },
    {
      path: '/login',
      name: 'login',
      menuShow: true,
      showName:'企业登录',
      component: Login
    }
  ]
})
