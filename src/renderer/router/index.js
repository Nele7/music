import Vue from 'vue'
import Router from 'vue-router'

const Layout = () => import('@/layout/index.vue')
const recommend = () => import('@/views/discoverMusic/recommend/index')
const songList = () => import('@/views/discoverMusic/songList/index')
const radio = () => import('@/views/discoverMusic/radio/index')
const rank = () => import('@/views/discoverMusic/rank/index')
const singer = () => import('@/views/discoverMusic/singer/index')
const newMusic = () => import('@/views/discoverMusic/newMusic/index')

const fm = () => import('@/views/fm/index')

const mv = () => import('@/views/mv/index')
const video = () => import('@/views/video/index')

const pal = () => import('@/views/pal/index')
const follow = () => import('@/views/follow/index')

const songListDetail = () => import('@/views/songListDetail/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/music/recommend'
    },
    {
      path: '/music',
      name: 'Layout',
      component: Layout,
      redirect: '/music/recommend',
      
      children:[
        {
          path: '/',
          redirect: 'recommend'
        },
        {
          path: 'recommend',
          component: recommend,
          name: 'recommend',
          meta:{
            flag:true
          },
        },
        {
          path: 'songList',
          component: songList,
          name: 'songList',
          meta:{
            flag:true
          },
        },
        {
          path: 'radio',
          component: radio,
          name: 'radio',
          meta:{
            flag:true
          },
        },
        {
          path: 'rank',
          component: rank,
          name: 'rank',
          meta:{
            flag:true
          },
        },
        {
          path: 'singer',
          component: singer,
          name: 'singer',
          meta:{
            flag:true
          },
        },
        {
          path: 'newMusic',
          component: newMusic,
          name: 'newMusic',
          meta:{
            flag:true
          },
        }
      ]
    },
    {
      path: '/fm',
      name: 'fm',
      component: Layout,
      redirect: '/fm/index',
      children:[
        {
          path: 'index',
          component: fm,
          name: 'fm'
        },
      ]
    },
    {
      path: '/mv',
      name: 'mv',
      component: Layout,
      redirect: '/mv/video',
      children:[
        {
          path: 'video',
          component: video,
          name: 'video',
          meta:{
            show:true
          }
        },
        {
          path: 'index',
          component: mv,
          name: 'mv',
          meta:{
            show:true
          }
        },
      ]
    },
    {
      path: '/pal',
      name: 'pal',
      component: Layout,
      redirect: '/pal/index',
      children:[
        {
          path: 'index',
          component: pal,
          name: 'pal'
        },
      ]
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: Layout,
      redirect: '/userDetail/index',
      children:[
        {
          path: 'index',
          component: follow,
          name: 'follow'
        },
      ]
    },
    {
      path: '/songlistdetail',
      name: 'songlistdetail',
      component: Layout,
      redirect: '/userDetail/index/:id',
      children:[
        {
          path: 'index/:id',
          component: songListDetail,
          name: 'songlistdetail'
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
