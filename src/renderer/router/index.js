import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/layout/index.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[{
        path: 'recommend',
        component: () => import('@/views/recommend/index'),
        name: 'recommend',
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
