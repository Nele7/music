<template>
  <div class="video-wrapper">
    <el-row :gutter="10">
      <el-col :md="8" :lg="6" :xl="4" 
      v-for="(item,index) in videos" :key="index"
      @click.native="selectId(item)" 
      class="list-item">
        <div class="item">
          <img v-lazy="item.coverUrl">
          <div class="play-count">
            <i class="el-icon-video-camera"></i>
            <span>{{item.playTime | covertUnit}}</span>
          </div>
          <div class="durationms">
            {{item.durationms | formatTimeMMSS}}
          </div>
        </div>
        <p class="title">{{item.title}}</p>
        <!-- <p v-for="(name,index) in item.creator" :key="index" class="by">by {{name.userName || item.creator.nickname}}</p> -->
      </el-col>
    </el-row>
    <h4 class="more" v-if="isMore" @click="loadHotMore">
        <a href="#">
            加载更多视频
            <i class="el-icon-arrow-down"></i>
        </a>
    </h4>
  </div>
</template>

<script>
  import {covertUnit,formatTimeMMSS} from '@/utils/util.js'

  export default {
    name:'searchVideo',
    props:{
      videos:{
        type:Array
      },
      isMore:{

      }
    },
    methods: {
      loadHotMore() {
       this.$emit('loadMore')
     },
     selectId(item) {
      //  console.log(item)
       this.$emit('selectId',item)
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
.video-wrapper {
  // padding: 10px 30px;
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
      & > div {
        position: absolute;
        background: rgba(12, 12, 12, 0.452);
        padding: 1px 5px;
        border-radius: 4px;
        font-size: 14px;
        color: $color-white;
      }
      .play-count {
        right: 1px;
        top: 3px;
      }
      .durationms {
        bottom: 3px;
        right: 7px;
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
  .more {
  text-align: center;
  a {
    display: inline-block;
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 15px;
    color: #666;
    padding: 4px 16px;
    font-size: 13px;
    font-weight: 400;
    &:hover {
        background: rgba(223, 223, 223, 0.555);
    }
  }
}
}

</style>