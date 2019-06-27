import { neteaseApi } from '@/api';
import { pad } from "@/utils/util.js"
import to from '@/utils/await-to.js'
import local from '@/utils/storage.js'
import * as types from '../mutation_types'

const state = {
  recommendListFilters: [{
      title: 'v-title',
      t: '推荐歌单',
      type: 'recommend-list',
      listType: 'Song',
      screenSize: {
        md: 6,
        lg: 4,
        xl: 3
      },
      list: []
    },
    {
      title: 'v-title',
      t: '推荐MV',
      type: 'recommend-list',
      listType: 'Mv',
      screenSize: {
        md: 6,
        lg: 6,
        xl: 6
      },
      list: []
    },
    {
      title: 'v-title',
      t: '最新音乐',
      type: 'new-music',
      list: []
    },
    {
      title: 'v-title',
      t: '独家放送',
      type: 'recommend-list',
      listType: 'Private',
      screenSize: {
        md: 8,
        lg: 8,
        xl: 8
      },
      list: []
    },
  ],
}

const mutations = {
  [types.SET_RECOMMEND](state, {arr,index}) {
    if(index === 2){
      // 处理成[[],[]] 各五个
      let res = []
      let len = arr.length
      for (let i = 0; i < len; i++) {
        arr[i].index = pad(i + 1)
      }
      for (let i = 0; i < len; i += 5) {
        res.push(arr.slice(i, i + 5))
      }
      state.recommendListFilters[index].list = res
    }else{
      state.recommendListFilters[index].list = arr
    }
  },
  [types.UPDATE_RECOMMEND](state,arr) {
    state.recommendListFilters = arr
  }
}

const actions = {
  // 获取推荐歌单
  async getPersonalized({commit}) {
    let [res] = await to(neteaseApi.personalized())
    commit(types.SET_RECOMMEND,{arr:res.result,index:0})
  },
  // 获取推荐mv
  async getPersonalizedmv({commit}) {
    let [res] = await to(neteaseApi.personalizedmv())
    commit(types.SET_RECOMMEND,{arr:res.result,index:1})
  },
  // 获取最新音乐
  async getNewMusic({commit}) {
    let [res] = await to(neteaseApi.newsong())
    commit(types.SET_RECOMMEND,{arr:res.result,index:2})
  },
  // 获取独家放送
  async getPrivateContent({commit}) {
    let [res] = await to(neteaseApi.exclusive())
    commit(types.SET_RECOMMEND,{arr:res.result,index:3})
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}