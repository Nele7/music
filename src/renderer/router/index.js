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
const av = () => import('@/views/audioVisual/index')

const pal = () => import('@/views/pal/index')
const follow = () => import('@/views/follow/index')

const songListDetail = () => import('@/views/songListDetail/index')

const searchDetail = () => import('@/views/searchDetail/index.vue')

const singerDetail = () => import('@/views/singerDetail/index.vue')

const albumDetail = () => import('@/views/albumDetail/index.vue')

const mvDetail = () => import('@/views/mvDetail/index.vue')

const avDetail = () => import('@/views/avDetail/index.vue')

const userDetail = () => import('@/views/userDetail/index.vue')

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
          name: '_fm'
        },
      ]
    },
    {
      path: '/mv',
      name: 'mv',
      component: Layout,
      redirect: '/mv/index',
      children:[
        {
          path: 'av',
          component: av,
          name: 'av',
          meta:{
            show:true
          }
        },
        {
          path: 'index',
          component: mv,
          name: '_mv',
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
          name: '_pal'
        },
      ]
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: Layout,
      redirect: '/userDetail/:uid',
      children:[
        {
          path: ':uid',
          component: userDetail,
          name: '_userDetail'
        },
        {
          path: 'index',
          component: follow,
          name: 'follow'
        },
      ]
    },
    // {
    //   path: '/userDetail',
    //   name: 'userDetail',
    //   component: Layout,
    //   redirect: '/userDetail/:uid',
    //   children:[
    //     {
    //       path: ':uid',
    //       component: userDetail,
    //       name: '_userDetail'
    //     },
    //   ]
    // },
    {
      path: '/songlistdetail',
      name: 'songlistdetail',
      component: Layout,
      redirect: '/songlistdetail/:id',
      children:[
        {
          path: ':id',
          component: songListDetail,
          name: '_songlistdetail'
        },
      ]
    },
    {
      path: '/searchdetail',
      name: 'searchdetail',
      component: Layout,
      redirect: '/searchdetail/:keywords',
      children:[
        {
          path: ':keywords',
          component: searchDetail,
          name: '_searchdetail'
        },
      ]
    },
    {
      path: '/singerdetail',
      name: 'singerdetail',
      component: Layout,
      redirect: '/singerdetail/:id',
      children:[
        {
          path: ':id',
          component: singerDetail,
          name: '_singerdetail'
        },
      ]
    },
    {
      path: '/albumdetail',
      name: 'albumdetail',
      component: Layout,
      redirect: ':id',
      children:[
        {
          path: ':id',
          component: albumDetail,
          name: '_albumdetail'
        },
      ]
    },
    {
      path: '/avdetail',
      name: 'avdetail',
      component: Layout,
      redirect: ':id',
      children:[
        {
          path: ':id',
          component: avDetail,
          name: '_avetail'
        },
      ]
    },
    {
      path: '/mvdetail',
      name: 'mvdetail',
      component: Layout,
      redirect: ':id',
      children:[
        {
          path: ':id',
          component: mvDetail,
          name: '_mvetail'
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
