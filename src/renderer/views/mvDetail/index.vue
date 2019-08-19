<template>
  <div>
    <div class="mv-wrapper">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <div class="mv-content-wrapper">
      <!-- <div class="creator-box">
        <div class="avatar">
          <img :src="detail.data && detail.data.cover" />
        </div>
        <div class="nickname">
          <p>{{detail.data && detail.data.name}}</p>
        </div>
        <div class="follow-wrapper">
          <span @click="toggleFollow" class="follow">
            <i class="el-icon-plus"></i>
            关注
          </span>
          <span v-if="item.followed && !item.mutual" class="followed">
              <i class="el-icon-check"></i>
              已关注
          </span>
        </div>
      </div> -->
      <div class="mv-detail-info">
        <div class="title">
          <p>{{detail.data && detail.data.name}}</p>
        </div>
        <div class="time">
          <p class="publishTime">
            <span>发布时间：</span>
            <span>{{detail.data && detail.data.publishTime}}</span>
          </p>
          <p class="playTime">
            <span>播放：</span>
            <span>{{detail.data && detail.data.playCount | covertUnit}}</span>
          </p>
        </div>
        <div class="expertTags">
          <p>
            <span
              v-for="(ex,index) in detail.data && detail.data.artists"
              :key="index"
              @click="toSingerDetail(ex.id)"
            >
            {{ex.name}}
            <!-- <i v-if="index !== detail.data.artists.length -1"> / </i> -->
            </span>
          </p>
        </div>
        <div class="desc-wrapper" v-if="detail.data && detail.data.desc">
          <p>{{detail.data && detail.data.desc}}</p>
        </div>
        <div class="mv-btn-group">
          <div class="btn-mini" @click="toggleLiked" :class="{active:like}">
            <i :class="[like?'icon-icon':'icon-zan1']" class="iconfont"></i>
            {{praisedTxt}}({{detail.data && detail.data.likeCount}})
          </div>
          <div class="btn-mini" @click="toggleMvSub">
            <i class="el-icon-folder-checked"></i>
            {{subTxt}}({{detail.data && detail.data.subCount}})
          </div>
          <div class="btn-mini">
            <i class="el-icon-folder-checked"></i>
            分享({{detail.data && detail.data.shareCount}})
          </div>
        </div>
      </div>

       <div class="comment-wrapper">
        <comment :id="mId"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import { formatDateTime, covertUnit } from '@/utils/util'
import { resourcelikeType } from '@/api/apiType'
import to from "@/utils/await-to.js"
import Comment from './Comment/'
export default {
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: "" //url地址
        }],
        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },
      url: '',
      detail: {},
      like:false,
      likeType:resourcelikeType.mvlike
    }
  },
  created() {
    this.getMvDetail()
    this.getMvURL()
  },
  computed: {
    mId() {
      return parseInt(this.$route.params.id)
    },
    isExpertTags() {
      if(this.detail.creator) {
        return this.detail.creator.expertTags !== null
      }
    },
    praisedTxt() {
      return this.like ? '已赞':'赞'
    },
    subTxt() {
      return this.detail.subed ? '取消收藏':'收藏'
    }
  },
  methods: {
    async getMvDetail() {
      let [res] = await to(neteaseApi.mvDetail({
        mvid:this.mId
      }))
      this.detail = res
      let ele = document.querySelectorAll('.scrollbar-wrapper')[1]
      ele.scrollTop = 0
      console.log(ele)
    },
    async getMvURL() {
      let [res] = await to(neteaseApi.mvUrl({
        id:this.mId
      }))
      this.playerOptions.sources[0].src = res.data.url
      // this.playerOptions.autoplay = true
    },
    toSingerDetail(id) {
      this.$router.push(`/singerdetail/${id}`)
    },
    async toggleLiked() {
      let [res] = await to(neteaseApi.resourceLike({
        type: this.likeType,
        t:this.like ? 0 : 1,
        id:this.mId
      }))
      this.like = !this.like
      let str = this.like ? '点赞成功':'取消点赞成功'
      let num = this.like ? 1 : -1
      this.detail.data.likeCount += num
      this.$toast(str)
    },
    // 收藏mv，后端报错
    async toggleMvSub() {
      console.log(123)
      let [res] = to(neteaseApi.mvSub({
        id:this.mId,
        t:this.detail.subed ? -1:1
      }))
      this.detail.subed = !this.detail.subed
      let num = this.detail.subed ? 1 : -1
      let str = this.detail.subed ? '收藏成功':'取消收藏成功'
      this.detail.data.subCount += num
      this.$toast(str)
    }
  },
  filters: {
    covertUnit,
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
.mv-content-wrapper {
  .mv-detail-info {
    padding:  20px;
    & > div {
      margin-bottom: 20px;
    }
    .title {
      font-size: 23px;
      font-weight: bold;
    }
    .time {
      display: flex;
      font-size: 13px;
      color: $color-base-grey;
      p {
        margin-right: 10px;
      }
    }

    .expertTags {
      p {
        span {
          padding: 3px 10px;
          border-radius: 16px;
          margin-right: 12px;
          font-size: 12px;
          color: $color-base-grey;
          background: $background-undertintgrey;
          cursor: pointer;
        }
      }
    }

    .desc-wrapper {
      padding: 0px 10px;
      p {
        font-size: 12px;
        line-height: 20px;
      }
    }

    .mv-btn-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      .btn-mini {
        padding: 5px 13px;
        border-radius: 26px;
        border: 1px solid $color-border;
        font-size: 13px;
        margin-right: 10px;
        cursor: pointer;
        i {
          font-size: 13px;
        }
        &:hover {
          background: $background-undertintgrey;
        }
        &.active {
          background: #e55c4b;
          color: $color-white;
          i {
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>

<style>
.video-js .vjs-play-progress {
  background-color: #f56c6c !important;
}
.vjs-custom-skin > .video-js .vjs-volume-level {
  background-color: #f56c6c !important;
}
.vjs-custom-skin > .video-js .vjs-big-play-button:active {
  background-color: #f56c6c !important;
}
.vjs-custom-skin > .video-js .vjs-big-play-button {
  width: 2em;
  border-radius: 50%;
}
.video-js:hover .vjs-big-play-button {
  background-color: #f56c6c !important;
}
</style>