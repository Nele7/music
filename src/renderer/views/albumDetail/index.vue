<template>
  <div>
    <div v-if="!loading">
      <div class="albumdetail-title-wrapper">
        <div class="album-cover">
          <div class="album-list-img">
            <img :src="indexList.picUrl" alt />
          </div>
        </div>

        <div class="album-list-text">
          <div class="title">
            <span>{{indexList.type}}</span>
            <h2>{{indexList.name}}</h2>
          </div>
          <div class="btn-group">
            <div class="btn-mini active">
              <i class="iconfont icon-bofang"></i>
              播放全部
              <i class="el-icon-plus"></i>
            </div>
            <div class="btn-mini" @click="toggleSubscribe(indexList.subscribed)">
              <i class="el-icon-folder-add"></i>
              收藏
              <!-- <i :class="indexList.subscribed?'el-icon-folder-checked':'el-icon-folder-add'"></i>
              {{indexList.subscribed?'取消收藏':'收藏'}} ({{indexList.subscribedCount | covertUnit}}) -->
            </div>

            <div class="btn-mini" @click="$toast('暂未开放,敬请期待！！！')">
              <i class="iconfont icon-fenxiang"></i>
              分享 ({{indexList.info && indexList.info.shareCount}})
            </div>
          </div>
          <div class="singer">
            <span>歌手：</span>
            <span v-for="(ar,i) in indexList.artists" :key="i">{{ar.name}}</span>
          </div>
          <div class="create-time">
            <span>时间：</span>
            <span>{{indexList.publishTime | formatDateTime}}</span>
          </div>
        </div>
      </div>
      <div class="tab">
        <ul>
          <li
            v-for="(item,index) in tab"
            :key="index"
          >
          <span :class="{'active':index===tempIndex}" @click="showTabs(item,index)">{{item.name}}</span></li>
        </ul>
        <keep-alive>
          <component 
            :is="showTabsComponent" 
            :musiclist="musiclist" 
            :id="indexList.id"
            :desc="indexList.description"
            @addComment="addComment"
            @select="selectItem"
            >
          </component>
        </keep-alive>
      </div>
    </div>
    <div class="loading" v-if="loading">
        <Spinner name="ball-scale-multiple" color="#b31212"/>
    </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import { formatDateTime } from "@/utils/util.js"
import { DELAY } from '@/config'
import { musicMixin } from '@/utils/mixin'

import to from "@/utils/await-to.js"
import Spinner from 'vue-spinkit'
import MusicList from '@/components/MusicList'
import Comment from './Comment/'
import AlbumDescription from './albumDescription/'

  export default {
    mixins:[musicMixin],
    name:'albumdetail',
    data() {
      return {
        indexList: {},
        musiclist: [],
        tab:[
          { name: '歌曲列表', v: 'music-list' },
          { name: '', v: 'comment' },
          { name: '专辑详情', v: 'album-description' },
        ],
        tempIndex: 0,
        showTabsComponent: 'music-list',
        loading:false
      }
    },
    created() {
      this.getAlbumDetail()
    },
    computed: {
      albumId() {
        return parseInt(this.$route.params.id)
      },
    },
    methods: {
      async getAlbumDetail() {
        this.loading = true
        let [res] = await to(neteaseApi.album({
          id:this.albumId
        }))
        this.indexList = res.album
        this.musiclist = res.songs
        this.$set(this.tab[1],'name',`评论(${this.indexList.info.commentCount})`)
        setTimeout(() => {
            this.loading = false
        }, DELAY)
        console.log(res)
      },
      // 点击tab条
      showTabs(item, index) {
        this.showTabsComponent = item.v
        this.tempIndex = index
      },
      // 更新回复数量
      addComment() {
        this.$set(this.tab[1],'name',`评论(${this.indexList.commentCount += 1})`)
      },
      async selectItem(item){
        try {
          await this.checkMusic(item.id)
          // 插入单首
          console.log(item)
          let obj = {
              id: item.id,
              artists: item.ar,
              album: item.al,
              name: item.name,
              duration: item.dt,
              mv: item.mv,
              from: '歌手'
          }
          this.$store.dispatch('player/replaceMusicPlayList',obj)
        } catch (error) {
          this.$toast(error.response.data.message)
        }
      },
    },
    components: {
      Spinner,
      MusicList,
      Comment,
      AlbumDescription
    },
    filters: {
      formatDateTime
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
$cover-width: 240px;
.loading {
    @include position(absolute,0,0,0,0);
    background: #fff;
    z-index: 99999;
    div {
        position: absolute;
        top:50%;
        left: 50%;
    }
}
.albumdetail-title-wrapper {
  display: flex;
  flex-direction: row;
  position: relative;
  .album-cover {
    width: $cover-width;
    padding: 20px;
    .album-list-img {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        overflow: hidden;
        border-radius: 10px;
        img {
          @include position(absolute, 0, 0, 0, 0, 100%);
        }
      }
    }

  .album-list-text {
    flex: 1;
    padding: 20px;
    & > div {
      margin-bottom: 15px;
    }
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        border: 1px solid $color-base-red;
        color: $color-base-red;
        border-radius: 4px;
        padding: 2px 3px;
        font-size: 15px;
        font-weight: 500;
      }
      h2 {
        margin: 0;
        margin-left: 10px;
        font-weight: 600;
      }
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
      cursor: pointer;
      i {
        font-size: 15px;
      }
      &.active {
        background: #e55c4b;
        color: $color-white;
        i {
          font-size: 15px;
        }
      }
    }
  }
  
  .singer {
    font-size: 14px;
  }
  .create-time {
    font-size: 14px;
  }
}

.tab {
  // padding: 0 20px;
  ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid $color-border;
    padding: 0 10px; 
    box-sizing: border-box;
    li {
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      text-align: center;
      letter-spacing: 2px;
      box-sizing: border-box;
      span {
        display: block;
        height: 100%;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        &.active {
          border-bottom: 2px solid $color-base-red;
          color: $color-base-red;
        }
      }
    }
  }
}
</style>