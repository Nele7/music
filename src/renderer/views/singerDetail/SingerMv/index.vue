<template>
  <div style="padding:20px">
    <el-row :gutter="10" class="list-mv-wrapper">
      <el-col class="list" :md="8" :lg="6" :xl="4" v-for="(item,index) in mvs" :key="index" @click.native="selectId(item.id)">
        <div class="item">
          <img v-lazy="item.imgurl16v9">
          <div class="play-count">
            <i class="el-icon-video-camera"></i>
            <span>{{item.playCount | covertUnit}}</span>
          </div>
          <div class="durationms">
            {{item.duration | formatTimeMMSS }}
          </div>
        </div>
        <p>{{item.name}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import { covertUnit,formatTimeMMSS } from '@/utils/util.js'
  export default {
    props:['id'],
    data() {
      return {
        mvs:[]
      }
    },
    created() {
      this.getSingerMv()
    },
    methods: {
      async getSingerMv() {
        let [res] = await to(neteaseApi.artistMv({
          id:this.id
        }))
        this.mvs = res.mvs
        console.log(res)
      },
      selectId(id) {
        this.$emit('selectId',{
          type:'mv',
          id
        })
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
.list-mv-wrapper {
  display: flex;
  flex-wrap: wrap;
  .list {
    margin-bottom: 10px;
    .item {
      position: relative;
      padding-bottom: 9/16*100%;
      width: 100%;
      overflow: hidden;
      border-radius: 4px;
      cursor: pointer;


      img {
        @include position(absolute, 0, 0, 0, 0, 100%);
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
    p {
      cursor: pointer;
      @include ellipsized;
      margin: 5px 0;
      font-weight: 400;
      font-size: 13px;
    }
  }
}
</style>