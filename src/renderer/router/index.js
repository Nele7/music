import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/layout/index.vue')
const recommend = () => import('@/views/recommend/index')
const songList = () => import('@/views/songList/index')
const radio = () => import('@/views/radio/index')
const rank = () => import('@/views/rank/index')
const singer = () => import('@/views/singer/index')
const newMusic = () => import('@/views/newMusic/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: 'recommend',
          component: recommend,
          name: 'recommend'
        },
        {
          path: 'songList',
          component: songList,
          name: 'songList'
        },
        {
          path: 'radio',
          component: radio,
          name: 'radio'
        },
        {
          path: 'rank',
          component: rank,
          name: 'rank'
        },
        {
          path: 'singer',
          component: singer,
          name: 'singer'
        },
        {
          path: 'newMusic',
          component: newMusic,
          name: 'newMusic'
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
