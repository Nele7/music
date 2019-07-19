<template>
  <div class="music-list-wrapper">
    <ul class="songs-list">
      <li class="song-item title">
        <div class="blank"></div>
        <div class="music-title song-group-item">音乐标题</div>
        <div class="songs">歌手</div>
        <div class="album song-group-item">专辑</div>
        <div class="duration">时长</div>
      </li>
      <li class="song-item" v-for="(item,index) in musiclist" :key="index">
        <div class="blank">
          <span>{{index+1 | pad}}</span>
          <i class="iconfont" :class="likedIcon(item.id)" @click="toggleLike(item.id)"></i>
        </div>
        <div class="music-title song-group-item">
          <p>
            <span>{{item.name}}</span>
            <span class="sq" v-if="item.copyright ===1">SQ</span>
            <span class="alias" v-if="item.alia && item.alia.length > 0">{{item.alia[0]}}</span>
            <span class="alias" v-if="item.tns && item.tns.length > 0">{{item.tns[0]}}</span>
          </p>
          <i @click="clickItem(item,index)" class="iconfont icon-bofang1"></i>
        </div>
        <div class="songs">
          <p>
            <span v-for="(singer,index) in item.ar"
        :key="index">{{singer.name}}</span>
          </p>
        </div>
        <div class="album song-group-item">
          <p>{{item.al.name}}</p>
        </div>
        <div class="duration">{{item.dt || item.duration | formatTime}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import { formatTime, formatDateTime, pad } from "@/utils/util"
import { mapActions } from 'vuex'

export default {
  name: 'MusicList',
  props: {
    musiclist: {
      type: Array,
      default() {
        return []
      },
    }
  },
  data() {
    return {
    }
  },
  computed: {
    userlikelist() {
      return this.$store.state.user.userlikelist
    }
  },
  methods: {
    likedIcon(id) {
      let liked = this.userlikelist.includes(id)
      return liked ? 'icon-hongxin liked' : 'icon-xin'
    },
    // 喜欢与取消喜欢--音乐
    toggleLike(id) {
      let liked = this.userlikelist.includes(id)
      this.like(id, liked)
    },
    // 喜欢
    async like(id, type) {
      let [res] = await to(neteaseApi.like({
        id,
        like: !type
      }))
      !type ? this.insertUserLikelist(id) : this.deleteUserLikelist(id)
      !type ? this.$toast('已添加到我喜欢的音乐') : this.$toast('取消喜欢成功')
    },
    // 点击播放
    clickItem(item,index) {
      this.$emit('select',item,index)
    },
    ...mapActions('user', ['insertUserLikelist', 'deleteUserLikelist'])
  },
  filters: {
    formatTime,
    // covertUnit,
    pad,
    formatDateTime
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.music-list-wrapper {
  .songs-list {
    .song-item {
      width: 100%;
      height: 40px;
      display: flex;
      border-bottom: 1px solid $color-border;
      transition: all 0.3s;
      &.title {
        div {
          font-size: 14px;
        }
        color: $color-base-grey;
      }

      &:nth-child(n + 2) {
        cursor: pointer;
        &:hover {
          background: $background-undertintgrey !important;
          .music-title {
            i {
              display: block;
            }
          }
        }
      }

      &:nth-child(2n + 3) {
        background: rgb(249, 249, 249);
      }
      div {
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 500;
        font-size: 13px;
      }
      .song-group-item {
        padding: 0 20px;
        box-sizing: border-box;
        p {
          @include ellipsized;
        }
      }
      .blank {
        width: 10%;
        span {
          display: inline-block;
          width: 50%;
          height: 100%;
          text-align: center;
          line-height: 40px;
        }
        i {
          font-size: 20px;
          height: 100%;
          line-height: 40px;
          cursor: pointer;
          &.liked {
            color: #e55c4b;
          }
        }
      }

      .music-title {
        width: 40%;
        
        display: flex;
        justify-content: space-between;
        p {
          .sq {
            display: inline-block;
            height: 12px;
            border-radius: 4px;
            line-height: 12px;
            border: 1px solid $color-base-red;
            color: $color-base-red;
            font-size: 12px;
          }
          .alias {
            display: inline-block;
            color: $color-base-grey;
          }
        }
        i {
          transition: all 0.3s;
          font-size: 14px;
          color: $color-base-grey;
          display: none;
        }
      }

      .songs {
        width: 20%;
        padding-right: 20px;
        box-sizing: border-box;
        p {
          @include ellipsized;
        }
      }
      .album {
        width: 20%;
      }
      .duration {
        width: 10%;
      }
    }
  }
}
</style>