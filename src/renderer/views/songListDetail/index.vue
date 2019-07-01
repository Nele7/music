<template>
  <div>
      <div class="songlistdetail-title-wrapper">
        <div class="song-cover">
          <div class="song-list-img">
            <img :src="indexList.coverImgUrl" alt="">
          </div>
        </div>
        
        <div class="song-list-text">
          <div class="title">
            <span>歌单</span>
            <h2>{{indexList.name}}</h2>
          </div>
          <div class="songlist-avatar">
            <img :src="indexList.creator && indexList.creator.avatarUrl" alt="" width="30px">
            <span>{{indexList.creator && indexList.creator.nickname}}</span>
            <span>{{indexList.createTime | formatDateTime}} 创建</span>
          </div>
          <div class="btn-group">
            <div class="btn-mini active">
              <i class="iconfont icon-bofang"></i>
              播放全部
              <i class="el-icon-plus"></i>
            </div>
            <div class="btn-mini" @click="toggleSubscribe(indexList.subscribed)" >
              <i class="el-icon-plus"></i>
              {{indexList.subscribed?'已收藏':'收藏'}} ({{indexList.subscribedCount | covertUnit}})
            </div>
            
            <div class="btn-mini ">
              <i class="iconfont icon-fenxiang"></i>
              分享 ({{indexList.shareCount | covertUnit}})
            </div>
          </div>
          <div class="tags name">
            <span>标签</span>：
            <span class="active">{{indexList.tags && indexList.tags.join(',')}}</span>
          </div>
          <div class="play-count name">
            <span>歌曲数</span>：
            <em>{{indexList.tracks && indexList.tracks.length}}</em>
            <span class="play-num">播放数：</span>
            <em>{{indexList.playCount | covertUnit}}</em>
          </div>
          <div class="brief name">
            <span>
              简介
            </span>：
            <pre>{{indexList.description}}</pre>
          </div>
        </div>
      </div>
      <div class="tab">
        <ul>
          <li v-for="(item,index) in tab" :class="{'active':index===tempIndex}" :key="index" @click="showTabs(item,index)">
            {{item.name}}
          </li>
        </ul>
        <keep-alive>
          <component :is="showTabsComponent" :musiclist="indexList.tracks"></component>
        </keep-alive>
      </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import {covertUnit,formatDateTime} from "@/utils/util.js"
import {mapActions} from 'vuex'
import MusicList from './MusicList'
import Comment from './Comment'
import Subscribers from './Subscribers'
  export default {
    name: 'songlistdetail',
    data() {
      return {
        tab:[
          {name:'歌曲列表',v:'music-list'},
          {name:'评论',v:'comment'},
          {name:'收藏者',v:'subscribers'},
        ],
        tempIndex:0,
        showTabsComponent:'music-list',
        indexList: {},
      }
    },
    created() {
      this.getPlayListDetail()
    },
    computed: {
      songId() {
        return parseInt(this.$route.params.id)
      },
    },
    methods: {
      // 获取歌单详情
      async getPlayListDetail() {
        let [res] = await to(neteaseApi.playlistDetail({
          id: this.songId
        }))
        this.indexList = res.playlist
      },
      // 点击tab条
      showTabs(item,index) {
        this.showTabsComponent = item.v
        this.tempIndex = index
      },
      // 点击收藏歌单
      toggleSubscribe(status) {
        //  2: 取消收藏 1：收藏
        let t = status?2:1
        this.subscribePlaylist(t)
      },
      // 收藏歌单
      async subscribePlaylist(t) {
        let [res] = await to(neteaseApi.subscribePlaylist({
          t,
          id: this.indexList.id
        }))
        this.indexList.subscribed = !this.indexList.subscribed
        this.indexList.subscribed ? this.$toast('收藏成功') : this.$toast('取消收藏成功')
        // 如果为收藏--把indexList对象插入到playlist数组
        // 如果为取消收藏--把indexList对象从playlist数组删除
        let _obj = Object.assign({},this.indexList)
        this.indexList.subscribed ? this.insertUserPlayList(_obj) : this.deleteUserPlayList(this.indexList.id)
      },
      ...mapActions('user',['insertUserPlayList','deleteUserPlayList'])
    },
    watch: {
      songId:{
        deep:true,
        handler() {
          this.getPlayListDetail()
        }
      }
    },
    components:{
      MusicList,
      Comment,
      Subscribers
    },
    filters:{
      covertUnit,
      formatDateTime
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
$song-cover-width:240px;

.songlistdetail-title-wrapper {
  display: flex;
  flex-direction: row;
  .song-cover {
    width: $song-cover-width;
    padding: 20px;

    .song-list-img {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;
      border-radius: 10px;
      img {
        @include position(absolute,0,0,0,0,100%);
      }
    }
  }
  
  .song-list-text {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div {
      margin-bottom: 10px;
    }

    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        border:1px solid $color-base-red;
        color:$color-base-red;
        border-radius: 4px;
        padding: 2px 5px;
        font-size: 19px;
        font-weight: 500;
      }
      h2 {
        margin: 0;
        margin-left: 10px;
        font-weight: 600;
      }
    }

    .songlist-avatar {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        border-radius: 50%;
      }
      span {
        margin-left: 10px;
        
      }
      &>span:nth-child(2) {
        color:$color-base-red;
        cursor: pointer;
      }
      &>span:nth-child(3) {
        font-size: 15px;
        line-height: 15px;
      }
      
    }

    .btn-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      .btn-mini {
        padding: 5px 13px;
        border-radius: 26px;
        border: 1px solid $color-border;
        font-size: 15px;
        margin-right: 10px;
        i{
            font-size: 15px;
        }
        &.active {
          background: #E55C4B;
          color: $color-white;
          i{
            font-size: 15px;
          }
        }
      }
    }


    .tags {
      .active {
          color:$color-base-red;
          cursor: pointer;
      }
    }
    .play-count {
      .play-num {
        margin-left: 10px;
         
      }
      em {
        font-style: normal;
       
      }
    }
    .name >span {
      &:first-child {
        display: inline-block;
        width: 65px;
        text-align: justify;
        text-align-last: justify; // 该属性定义的是一段文本中最后一行在被强制换行之前的对齐规则。
      }
    }
  }
}

.tab {
  padding: 0 20px;
  ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid $color-border;
    li {
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      border-bottom: 2px solid transparent;
      width: 100px;
      height: 40px;
      letter-spacing: 2px;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid $color-base-red;
        color:  $color-base-red;
      }
    }
  }
}
</style>