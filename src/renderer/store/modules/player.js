import * as types from '../mutation_types'
import {shuffle} from '@/utils/util'
const playlist = '__playlist__'
const currentIndex = '__currentIndex__'
const playMode = '__playMode__'
const sequentlist = '__sequentlist__'
const historyRecord = '__history_recoed__'

const state = {
  playList: JSON.parse(localStorage.getItem(playlist)) || [],               // 播放列表
  sequentList:JSON.parse(localStorage.getItem(sequentlist)) || [],          // 顺序列表
  playCurrentIndex: localStorage.getItem(currentIndex) || -1,               // 当前下标
  playStatus:false,                                                         // 播放状态
  playMode: localStorage.getItem(playMode) || 0,                            // 播放模式
  playerHistory: JSON.parse(localStorage.getItem(historyRecord)) || []  // 历史记录
}

const mutations = {
  [types.SET_PLAY_SEQUENTLIST](state, list) {
    try {
      localStorage.setItem(sequentlist,JSON.stringify(list))
      state.sequentList = list
    } catch (error) {}
  },
  [types.SET_PLAY_LIST](state, list) {
    try {
      localStorage.setItem(playlist,JSON.stringify(list))
      state.playList = list
    } catch (error) {}
  },
  [types.SET_PLAY_CURRENT_INDEX](state, index) {
    try {
      localStorage.setItem(currentIndex,index)
      state.playCurrentIndex = index
    }catch(error) {}
  },
  [types.SET_PLAY_STATUS](state, flag) {
    state.playStatus = flag
  },
  
  [types.SET_PLAY_MODE](state,mode) {
    try {
      localStorage.setItem(playMode,mode)
      state.playMode = mode
    } catch (error) {}
  },
  [types.SET_HISTORYRECOED_LIST](state,list) {
    try {
      localStorage.setItem(historyRecord,JSON.stringify(list))
      state.PlayerHistory = list
    } catch (error) {}
  },
  [types.CLEAR_HISTORY_LIST](state) {
    try {
      localStorage.removeItem(historyRecord)
      state.playerHistory = []
    } catch (error) { }
  }
}

const actions = {
  // 播放列表
  insertMusicPlayList({commit,state},{list,index}) {
    let playlist = [...list]
    if(state.playMode == 3){
      // 打乱数组
      playlist = shuffle(list)
      // 找到当前播放歌曲在打乱之后数组的索引
      index = playlist.findIndex(item => item.id === list[index].id)
    }
    commit(types.SET_PLAY_LIST,playlist)
    commit(types.SET_PLAY_SEQUENTLIST,playlist)
    commit(types.SET_PLAY_CURRENT_INDEX,index)
    commit(types.SET_PLAY_STATUS,true)
  },
  savePlayerHistoryRecord({commit,state},obj) {
    let historyRecordArr = [...state.playerHistory]
    let index = historyRecordArr.findIndex(item => item.id === obj.id)
    console.log(index)
    if(index > -1) {
      // 说明有重复项，删除重新添加
      historyRecordArr.splice(index,1)
    }
    historyRecordArr.unshift(obj)
    // 最大长度为100，超过100删除最后一项
    if(historyRecordArr.length > 100) {
      historyRecordArr.pop()
    }
    commit(types.SET_HISTORYRECOED_LIST,historyRecordArr)
  },
  // 替换当前的currentMuiscItem
  replaceMusicPlayList({commit,state},obj) {
    let playlist = [...state.playList]                   // 当前播放列表
    let sequentList = [...state.sequentList]             // 顺序播放列表
    let currentIndex = Number(state.playCurrentIndex)    // 当前播放索引
    // 判段当前历史记录的一项是否在当前播放列表中
    // 存在，
    let index = playlist.findIndex(item => item.id === obj.id)
    if(index > -1) {     // 当前歌曲存在当前播放列表中
      commit(types.SET_PLAY_CURRENT_INDEX,index)
    }else {     // 当前歌曲不存在当前播放列表中，
      // if(state.playMode == 3) {
      //   console.log('随机播放模式')
      //   let currentSong = state.playList[currentIndex] // 找到当前播放的歌曲
      //   currentIndex = sequentList.findIndex(item => item.id === currentSong.id)
      //   console.log(currentIndex)
      // }
      currentIndex += 1  // 在他后面添加当前元素
      playlist.splice(currentIndex,0,obj)
      commit(types.SET_PLAY_LIST,playlist)
      commit(types.SET_PLAY_CURRENT_INDEX,currentIndex)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}