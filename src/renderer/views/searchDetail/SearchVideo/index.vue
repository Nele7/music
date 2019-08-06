<template>
  <div class="search-video-wrapper">
    <el-row :gutter="10">
      <el-col :md="8" :lg="6" :xl="4" v-for="(item,index) in videos" :key="index" class="list-item">
        <div class="item">
          <img :src="item.coverUrl" alt="">
          <div class="play-count">
            <i class="el-icon-video-camera"></i>
            <span>{{item.playTime | covertUnit}}</span>
          </div>
          <div class="durationms">
            {{item.durationms | formatTimeMMSS}}
          </div>
        </div>
        <p class="title">{{item.title}}</p>
        <p v-for="(name,index) in item.creator" :key="index" class="by">by {{name.userName}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {covertUnit,formatTimeMMSS} from '@/utils/util.js'

  export default {
    name:'searchVideo',
    props:{
      videos:{
        type:Array
      }
    },
    filters: {
      covertUnit,
      formatTimeMMSS
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.search-video-wrapper {
  padding: 10px 30px;
  .list-item {
    margin-bottom: 20px;
    .item {
      position: relative;
      padding-bottom: 56%;
      overflow: hidden;
      img {
        @include position(absolute,0,0,0,0,100%);
        transition: all 0.5s;
        border-radius: 5px;
        &:hover {
          transform: scale(1.2);
        }
      }
      .play-count {
        position: absolute;
        color: #fff;
        right: 1px;
        top: 3px;
        background: rgba(12, 12, 12, 0.452);
        padding: 1px 5px;
        border-radius: 5px;
        font-size: 14px;
      }
      .durationms {
        position: absolute;
        color: #fff;
        bottom: 3px;
        right: 7px;
        background: rgba(12, 12, 12, 0.452);
        font-size: 14px;
        padding: 1px 5px;
        border-radius: 5px;
      }
    }
    .title {
      @include ellipsized;
      margin: 5px 0;
      font-weight: 400;
      font-size: 13px;
    }
    .by {
      color: $color-base-grey;
      font-size: 12px;
    }
  }
}
</style>