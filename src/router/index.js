import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import setting from '@/views/setting'
import results from '@/views/results'

Vue.use(Router)

console.log(1233)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/results',
      name: 'results',
      component: results
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
