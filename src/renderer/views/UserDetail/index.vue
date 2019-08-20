<template>
  <div class="user-detail-wrapper">
    <div>
      <div class="user-info-wrapper">
        <div class="cover-img">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <div class="info">
          <h4>{{userInfo.nickname}}</h4>
          <div class="tools">
            <div class="btn-group">
              <span class="level">LV {{level}}</span>
              <span class="sex">
                <i class="iconfont" :class="getGender(userInfo.gender)"></i>
              </span>
            </div>
            <div class="follow-wrapper">
              <span @click="toggleFollow(1)" class="follow" v-if="userInfo && !userInfo.followed">
                <i class="el-icon-plus"></i>
                关注
              </span>
              <span  class="followed" v-if="userInfo && userInfo.followed && !userInfo.mutual" @click="toggleFollow(0)">
                <i class="el-icon-check"></i>
                已关注
              </span>
              <span class="followed" v-if="userInfo && userInfo.followed && userInfo.mutual" @click="toggleFollow(0)">
                <i class="el-icon-check"></i>
                互相关注
              </span>
            </div>
          </div>
          <div class="event">
            <ul class="list">
              <li class="item">
                <p>{{userInfo && userInfo.eventCount}}</p>
                <p>动态</p>
              </li>
              <li class="item" @click="goUserFollow(2)">
                <p>{{userInfo && userInfo.follows}}</p>
                <p>关注</p>
              </li>
              <li class="item" @click="goUserFollow(3)">
                <p>{{userInfo && userInfo.followeds}}</p>
                <p>粉丝</p>
              </li>
            </ul>
          </div>
          <div class="desc">
            <p>
              <span>个人介绍：</span>
              {{userInfo && userInfo.signature || '暂无介绍'}}
            </p>
          </div>
        </div>
      </div>
      <div class="user-playlist">
        <div class="play-list">
          <div class="title" v-if="selfPlayList.length > 0">
            <h4>歌单 ({{selfPlayList.length}})</h4>
          </div>
          <div class="list">
            <play-list :playlists="selfPlayList" @selectId="selectId"></play-list>
          </div>
          <div class="title" v-if="subPlayList.length > 0">
            <h4>收藏 ({{subPlayList.length}})</h4>
          </div>
          <div class="list">
            <play-list :playlists="subPlayList" @selectId="selectId"></play-list>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { neteaseApi } from "@/api/"
  import to from "@/utils/await-to.js"
  import PlayList from '@/components/PlayList/'

  export default {
    data() {
      return {
        userInfo:{},
        level:null,
        selfPlayList:[],
        subPlayList:[]
      }
    },
    created() {
      this.getUserDetail()
      this.getUserPlaylist()
    },
    computed: {
      userId() {
        return parseInt(this.$route.params.uid)
      }
    },
    methods: {
      async getUserDetail() {
        let [res] = await to(neteaseApi.userDetail({
          uid:this.userId
        }))
        this.userInfo = res.profile
        this.level = res.level
        console.log(res)
      },
      // 获取性别
      getGender(gender) {
          return gender === 0 ? '' : (gender === 1 ? 'icon-nan' : 'icon-nv')
      },
      async toggleFollow(t) {
        let [res] = await to(neteaseApi.follow({
          id:this.userId,
          t
        }))
        this.userInfo.followed = !this.userInfo.followed
        let str = this.userInfo.followed ? '关注成功':'取消关注成功'
        this.$toast(str)
      },
      async getUserPlaylist() {
        let [res] = await to(neteaseApi.userPlayList({
          uid:this.userId
        }))
        this.selfPlayList = res.playlist.filter(item => item.userId === this.userId)
        
        this.subPlayList = res.playlist.filter(item => item.userId !== this.userId)
        console.log(this.subPlayList)
      },
      selectId(id) {
        this.$router.push(`/songlistdetail/${id}`)
        console.log(id)
      },
      goUserFollow(type) {
        let actions = new Map([
          [1,() => {this.$router.push({path:`/userfollow/${this.userId}`,query:{type:1}})}],
          [2,() => {this.$router.push({path:`/userfollow/${this.userId}`,query:{type:2}})}],
          [3,() => {this.$router.push({path:`/userfollow/${this.userId}`,query:{type:3}})}],
        ])
        actions.get(type).call(this)
      }
    },
    components: {
      PlayList
    },
    watch:{
      userId() {
        this.getUserDetail()
        this.getUserPlaylist()
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.user-detail-wrapper {

  .user-info-wrapper {
    display: flex;

    .cover-img {
      width: 200px;
      height: 200px;
      padding: 20px 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &:hover {
            -webkit-transform: rotate(666turn);
            transform: rotate(666turn);
            transition-delay: 1s;
            transition-property: all;
            transition-duration: 59s;
            transition-timing-function: cubic-bezier(.34, 0, .84, 1)
        }
      }
    }
    .info {
      flex:1;
      padding: 20px 20px 20px 0;
      h4 {
        margin: 0;
        font-size: 23px;
      }
      .tools {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $color-border;
        padding: 10px;
        .btn-group {
          & > span {
            margin-right: 10px;
          }
          
          .level {
            background: $background-undertintgrey;
            padding: 2px 10px;
            font-size: 12px;
            border-radius: 10px;
            font-family: "Times New Roman", Times, serif;
          }
          .sex {
            .iconfont {
              font-size: 12px;
              padding: 2px 10px;
              border-radius: 10px;
            }
            .icon-nv {
              background: rgb(255, 193, 227);
              color: rgb(220, 43, 113);
            }
            .icon-nan {
              background: rgb(192, 240, 255);
              color: rgb(48, 141, 197);
            }
          }
          
        }
        .follow-wrapper {
          text-align: center;
          height: 100%;
          font-size: 14px;
          span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: $font-size-text-small;
            border-radius: 28px;
            padding: 0 14px;
            background: rgb(252, 243, 244);
            cursor: pointer;
            &.follow {
              color: $color-base-red;
            }
            &.followed {
              color: $color-base-grey;
            }
          }
        }
      }

      .event {
        display: flex;
        .list {
          display: flex;
          flex-direction: row;
          padding: 20px 0;
          .item {
            flex: 1;
            border-right: 1px solid $color-border;
            text-align: center;
            padding: 0 20px;
            &:last-child{
              border-right: 0;
            }
            & > p:first-child {
              font-size: 32px;
              font-weight: 400;
            }
          }
        }
      }

      .desc {
        font-size: 13px;
      }
    }
  }

  .user-playlist {
    .play-list {
      .title {
        padding: 0 20px;
        h4 {
          margin: 0;
        }
      }
      .list {
        padding: 20px;
      }
    }
  }
}
</style>