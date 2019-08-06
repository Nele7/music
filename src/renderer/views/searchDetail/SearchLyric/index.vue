<template>
  <div>
    <ul class="search-lyric-wrapper">
      <li class="song-item title">
        <div class="text">
          <div class="music-title">
            音乐标题
          </div>
          <div class="singer">
            歌手
          </div>
          <div class="album">
            专辑
          </div>
          <div class="duration">
            时长
          </div>
        </div>
      </li>
      <li class="song-item" v-for="(item,index) in songs" :key="index">
        <div class="text">
          <div class="music-title">
            {{item.name}}
          </div>
          <div class="singer">
            <p>
              <span v-for="(art,index) in item.artists" :key="index">{{art.name}}</span>
            </p>
          </div>
          <div class="album">
            {{item.album.name}}
          </div>
          <div class="duration">
            {{item.duration | formatTimeMMSS}}
          </div>
        </div>
        <div class="lyric">
          <pre ref="pre">{{item.lyrics.txt}}</pre>
          <div class="btn-group">
            <div class="btn-mini" @click="unfoldLyric(index)">
              <i :class="!isShow?'el-icon-arrow-down':'el-icon-arrow-up'"></i>{{isShow ? '收起歌词':'展开歌词'}}
            </div>
            <div class="btn-mini" @click="copyLyric(index)">复制歌词</div>
          </div>
        </div>
      </li>
    </ul>
    <input type="text" v-model="clipboardText" class="clipboard-input" ref="clipboard">
  </div>
</template>

<script>
  import {covertUnit,formatTimeMMSS} from '@/utils/util.js'

  export default {
    name:'searchLyric',
    props: {
      songs:{
        type:Array
      }
    },
    data() {
      return {
        isShow:false,
        clipboardText:''
      }
    },
    methods: {
      unfoldLyric(index) {
        if(!this.isShow) {
          this.$refs.pre[index].style.height = `100%`
        }else {
          this.$refs.pre[index].style.height = ''
        }
        this.isShow = !this.isShow
      },
      copyLyric(index) {
        // console.log('要复制这个文本：', text)
        this.clipboardText = this.songs[index].lyrics.txt
        // $nextTick 在这里没用
        setTimeout(() => {
          this.$refs.clipboard.select()
          document.execCommand('Copy')
        })
        this.$toast('已复制到剪切板')
      }
    },
    filters: {
      formatTimeMMSS
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.clipboard-input {
    position: absolute;
    z-index: -1;
    height: 0px;
    opacity: 0;
}

.search-lyric-wrapper {
  .song-item {
    padding: 15px 30px;
    &:nth-child(2n+3){
      background: #f9f9f9;
    }
    .text {
      display: flex;
      flex-direction: row;
      font-size: 13px;
      .music-title {
        width: 45%;
      }
      .singer {
        width: 25%;
        padding: 0 10px;
        box-sizing: border-box;
        p {
          @include ellipsized;
        }
      }
      .album {
        width: 25%;
        padding: 0 10px;
        box-sizing: border-box;
        @include ellipsized;
      }
      .duration {
        width: 5%;
      }
    }
    .lyric {
      display: flex;
      flex-direction: row;
      pre {
        flex: 1;
        height: 68px;
        overflow: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-size: 13px;
        color: $color-base-grey;
      }
      .btn-group {
        display: flex;
        justify-content:space-evenly;
        align-items: center;
        width: 200px;
        height: 40px;
        margin: 10px 0;
        .btn-mini {
          border:1px solid $color-border;
          padding: 4px 12px;
          font-size: 12px;
          border-radius: 10px;
          cursor: pointer;
          &:hover {
            background: $background-active;
          }
        }
      }
    }
    &.title {
      color: $color-base-grey;
      font-size: 14px;
      border-bottom: 1px solid $color-border;
    }
  }
}
</style>