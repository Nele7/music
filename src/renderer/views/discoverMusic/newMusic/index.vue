<template>
  <div class="new-music-wrapper">
    <div class="title-wrapper">
      <ul class="title-group">
        <li :class="{active:showTitleType === 1}" @click="showTitle(1)">新歌速递</li>
        <li :class="{active:showTitleType === 2}" @click="showTitle(2)">新碟上架</li>
      </ul>
    </div>
    <div v-if="!loading">
      <transition name="slide">
        <div v-if="showTitleType === 1">
          <div class="tab-wrapper">
            <ul class="tab-list">
              <li v-for="(item,index) in topSongTabListType" :key="index" class="tab-list-item">
                <a href="#" :class="{active:item.type == topSongType}" @click="getTopSong(item.type)">{{item.name}}</a>
              </li>
            </ul>
          </div>
          <div class="muisc-list-wrapper">
            <ul class="music-list-group">
              <li class="muisc-list-item" v-for="(item,index) in topSonglist" :key="index">
                <a class="music-list" href="#">
                  <div class="index">
                    {{index + 1}}
                  </div>
                  <div class="avatar">
                    <img v-lazy="item.album.blurPicUrl">
                    <i class="iconfont icon-bofang" @click="selectItemMusic(item)"></i>
                  </div>
                  <div class="song-name pd">
                    <p>
                      <span>{{item.name}}</span>
                      <span class="sq" v-if="item.copyright === 1">SQ</span>
                    </p>
                  </div>
                  <div class="singer-name pd">
                    <p>
                      <span v-for="(ar,i) in item.artists" :key="i">{{ar.name}}</span>
                    </p>
                  </div>
                  <div class="album pd">
                    <p>
                      {{item.album.name}}
                    </p>
                  </div>
                  <div class="duration">
                    {{item.duration | formatTimeMMSS}}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="slide">
        <div v-if="showTitleType === 2" style="margin-top:20px">
          <album-list :list="topAlbumlist" @selectId="selectId"></album-list>
        </div>
      </transition>
    </div>
    <div class="loading" v-if="loading">
      <Spinner name="ball-scale-multiple" color="#b31212"/>
    </div>
  </div>
</template>

<script>
  import { neteaseApi } from "@/api/"
  import to from "@/utils/await-to.js"
  import { topSongTabListType } from '@/api/apiType'
  import { formatTimeMMSS } from '@/utils/util'
  import { DELAY } from '@/config'
  import AlbumList from '@/components/AlbumList'
  import Spinner from 'vue-spinkit'
  import { musicMixin } from '@/utils/mixin'

  export default {
    mixins:[musicMixin],
    data() {
      return {
        showTitleType: 1,
        topSongTabListType,
        topSonglist: [],
        topSongType: 0,
        topAlbumlist: [],
        loading: false
      }
    },
    created () {
      this.getTopSong()
    },
    methods: {
      async getTopSong(type) {
        this.loading = true
        if(type) {
          this.topSongType = type
        }
        let [res] = await to(neteaseApi.topSong({
          type: this.topSongType
        }))
        this.topSonglist = res.data
        setTimeout(()=>{
          this.loading = false
        },DELAY)
      },
      showTitle(type) {
        this.showTitleType = type
        if(this.topAlbumlist.length === 0) {
          this.getTopAlbum()
        }
      },
      async getTopAlbum() {
        let [res] = await to(neteaseApi.topAlbum())
        this.topAlbumlist = res.albums
        console.log(res)
      },
      selectId(id) {
        this.$router.push(`/albumdetail/${id}`)
      },
      async selectItemMusic(item) {
        try {
          await this.checkMusic(item.id)
          // 插入单首
          let obj = {...item,from:'最新音乐'}
          console.log(obj)
          this.$store.dispatch('player/replaceMusicPlayList',obj)
        } catch (error) {
          this.$toast(error.response.data.message)
        }
      }
    },
    filters: {
      formatTimeMMSS
    },
    components: {
      AlbumList,
      Spinner
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/variables.scss';
.new-music-wrapper {
  padding: 20px;

  .title-wrapper {
    display: flex;
    height: 35px;
    justify-content: center;
    align-items: center;
    .title-group {
      display: flex;
      border-radius: 30px;
      border:1px solid $color-border;
      cursor: pointer;
      li {
        padding: 7px 24px;
        font-size: 13px;
        border-radius: 30px;
        &.active {
          background: $background-undertintgrey;
          color:$color-search;
        }
      }
    }
  }
  .loading {
      div {
        position: absolute;
        top:50%;
        left: 50%;
      }
    }
  .tab-wrapper {
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid $color-border;
    .tab-list {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      .tab-list-item {
        font-size: 13px;
        padding: 0 10px;
        border-bottom: 2px solid transparent;
        a {
          display: block;
          color:$color-base-black;
          &.active {
            border-bottom: 2px solid $color-base-red;
            color:$color-base-red;
          }
        }
      }
    }
  }

  .muisc-list-wrapper {
    margin-top: 20px;
    .music-list-group {
      .muisc-list-item {
        height: 80px;
        // line-height: 80px;
        &:nth-child(2n+1) {
          background: #f9f9f9;
        }
        .music-list {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 7px;
          box-sizing: border-box;
          color: $color-base-black;
          font-size: 13px;
          & > div.pd {
            padding: 0 10px;
            box-sizing: border-box;
            p {
              height: 100%;
              @include ellipsized;
            }
          }
          .index {
            text-align: center;
            width:  47px;
          }
          .avatar {
            position: relative;
            width: 60px;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
            i {
              position: absolute;
              &.icon-bofang {
                top: 30px;
                left: 30px;
                transform: translate(-13px,-13px);
                border-radius: 50%;
                color: $color-white;
                font-size: 26px;
                transition: all 0.3s;
              }
            }
            &:hover {
              i{
                background:rgba(12, 12, 12, 0.452);
              }
            }
          }
          .song-name {
            flex: 1;
            min-width: 250px;
            .sq {
              display: inline-block;
              height: 12px;
              border-radius: 4px;
              line-height: 12px;
              border:1px solid $color-base-red;
              color:$color-base-red;
              font-size: 12px;
            }
          }
          .singer-name {
            width: 140px;
          }
          .album {
            width: 110px;

          }
          .duration {
            width: 50px;
            text-align: center;
          }
        }
      }
    }
  }

}
</style>