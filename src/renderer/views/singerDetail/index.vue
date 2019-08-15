<template>
    <div>
        <div class="singerdetail-title-wrapper">
            <div class="singer-cover">
                <div class="singer-list-img">
                    <img :src="detailInfo.img1v1Url"/>
                </div>
            </div>
            <div class="singer-list-text">
                <div class="title">
                    <h2>{{detailInfo.name}}</h2>
                </div>
                <div class="other" v-if="detailInfo.alias">
                    <span v-for="(item,index) in detailInfo.alias" :key="index">{{item}}</span>
                </div>
                <div class="btn-group">
                    <div class="btn-mini" @click="toggleSingerFollowed">
                        <i :class="detailInfo.followed ?'el-icon-folder-checked':'el-icon-folder-add'"></i>
                        {{detailInfo.followed ? '取消收藏':'收藏'}}
                    </div>
                    <div class="btn-mini">
                        <i class="iconfont icon-yonghu"></i>
                        个人主页
                    </div>
                </div>
                <div class="play-count">
                    <a href="#">
                        <span>单曲数:</span>
                        <em>{{detailInfo.musicSize}}</em>
                    </a>
                    <a href="#">
                        <span class="play-num">专辑数:</span>
                        <em>{{detailInfo.albumSize}}</em>
                    </a>
                    <a href="#">
                        <span class="play-num">MV数:</span>
                        <em>{{detailInfo.mvSize}}</em>
                    </a>
                </div>
                <div class="desc">
                    <p>{{detailInfo.briefDesc}}</p>
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
            <div class="widget" v-if="showTabsComponent === 'singer-album'">
                <div :class="{active:viewType === 1}" @click="selectView(1)">
                    <i class="iconfont icon-geshihua"></i>
                </div>
                <div :class="{active:viewType === 2}" @click="selectView(2)">
                    <i class="iconfont icon-duotiaohengxian"></i>
                </div>
            </div>
            <keep-alive>
                <component 
                    :is="showTabsComponent"
                    :id="singerId"
                    :viewType="viewType"
                    :musiclist="musiclist"
                    @select="selectItemMusic"
                    @selectId="selectItemId"
                >
                </component>
            </keep-alive>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import MusicList from '../songListDetail/MusicList'
import SingerAlbum from './SingerAlbum'
import SingerMv from './SingerMv'
import SingerSimi from './SingerSimi'
import SingerDesc from './SingerDesc'
import { musicMixin } from '@/utils/mixin'
    export default {
        mixins:[musicMixin],
        data() {
            return {
                tab: [
                    { name:'单曲',component:'music-list'},
                    { name:'专辑',component:'singer-album'},
                    { name:'MV',component:'singer-mv'},
                    { name:'歌手详情',component:'singer-desc'},
                    { name: '相似歌手',component:'singer-simi'}
                ],
                tempIndex: 0,
                showTabsComponent:'music-list',
                musiclist:[],
                detailInfo:{},
                viewType:1,
                id:null
            }
        },
        created() {
            // this.id = this.$route.params.id
            this.getArtists()
        },
        computed:{
            singerId() {
                return parseInt(this.$route.params.id)
            }
        },
        methods: {
            async getArtists() {
                let [res] = await to(neteaseApi.artists({
                    id:this.singerId
                }))
                this.musiclist = res.hotSongs
                let str = res.artist.briefDesc
                let index = str.indexOf('。')
                res.artist.briefDesc = str.slice(0,index + 1)
                this.detailInfo = res.artist
            },
            // 点击tab条
            showTabs(item, index) {
                this.showTabsComponent = item.component
                this.tempIndex = index
            },
            async selectItemMusic(item){
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
            async toggleSingerFollowed() {
                let t = this.detailInfo.followed ? -1:1
                let [res] = await to(neteaseApi.artistSub({
                    id:this.id,
                    t
                }))
                this.$set(this.detailInfo,'followed',!this.detailInfo.followed)
                let msg = this.detailInfo.followed ? '收藏成功':'取消收藏成功'
                this.$toast(msg)
            },
            selectView(type) {
                this.viewType = type
            },
            selectItemId(value) {
                let actions = new Map([
                    ['album',() => { this.$router.push(`/albumdetail/${value.id}`) }],
                    ['mv',() => { this.$router.push(`/mvdetail/${value.id}`) }],
                    ['singer',() => { this.$router.push(`/singerdetail/${value.id}`) }]
                ])
                actions.get(value.type).call(this)
                // action.call(this)
            }
        },
        watch: {
            '$route'(n,o) {
                this.getArtists()
                this.showTabsComponent = 'music-list'
                this.tempIndex = 0
                this.id = n.params.id
                console.log(n)
            }
        },
        components: {
            MusicList,
            SingerAlbum,
            SingerMv,
            SingerDesc,
            SingerSimi
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
$singer-cover-width:240px;
.singerdetail-title-wrapper {
  display: flex;
  flex-direction: row;
  position: relative;
  .singer-cover {
    width: $singer-cover-width;
    padding: 20px;
    .singer-list-img {
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
  .singer-list-text {
      flex: 1;
      padding: 20px;
      .title {
          h2 {
              margin: 0;
          }
      }
      .other {
        text-indent: 9px;
        font-size: 13px;
        color: $color-base-grey;
      }
      .btn-group {
          display: flex;
          font-size: 13px;
          .btn-mini {
              border:1px solid $color-border;
              padding: 5px 10px;
              border-radius: 16px;
              margin-right: 15px;
              cursor: pointer;
              &:hover {
                  background: $background-undertintgrey;
              }
              i {
                  font-size: 13px;
              }
          }
      }
      .play-count {
          
          font-size: 13px;
          a {
              color:$color-base-black;
              margin-right: 10px;
          }
          em {
              font-style: normal;
          }
      }
      .desc {
          color: $color-base-grey;
          font-size: 12px;
          height: 50px;
          overflow: hidden;
          p {
              height: 100%;
          }
      }
      & > div {
          margin-bottom: 20px;
      }
  }
}
.tab {
    position: relative;
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
    .widget {
        position: absolute;
        top: 6px;
        right: 40px;
        display: flex;
        & > div {
            padding: 2px 4px;
            background: #f9f9f9;
            cursor: pointer;
            &.active {
                background: $background-active;
                color:$color-base-red;
            }
        }
    }
}
</style>