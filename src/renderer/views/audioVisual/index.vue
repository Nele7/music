<template>
  <div class="video-wrapper">
    <div class="video-header">
      <!-- 当前分类 -->
      <a href="#" class="btn" slot="reference" @click="isShowPopover = true">
        <span>{{currentCategory}}</span>
        <i class="el-icon-arrow-right"></i>
      </a>
      <!-- 全部分类 -->
      <transition name="slide">
        <div
          class="more-category-wrapper"
          v-if="isShowPopover"
          @mouseleave="isShowPopover = false"
          @mouseenter="isShowPopover = true"
        >
          <!-- <div class="all-title">
                      <a
                          href="#"
                          class="title"
                          :class="{active:currentCategory == '全部'}"
                          @click="selectCategoryName('全部')"
                      >全部视频</a>
          </div>-->
          <div class="cat-content-box">
            <ul class="cat-list-wrapper">
              <li class="list-item" v-for="(item,index) in allCategoryList" :key="index">
                <a href="#" class="list-group" @click="selectCategoryName(item)">
                  <span :class="{active:item.name == currentCategory}">{{item.name}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <!-- 热门分类 -->
    </div>
    <div class="video-body">
      <video-list :isMore="false" :videos="videoList" @selectId="selectId"></video-list>
    </div>
    <div class="loading" v-if="loading">
      <Spinner name="ball-scale-multiple" color="#b31212" />
    </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import Spinner from 'vue-spinkit'
import VideoList from '@/components/VideoList/'
export default {
  name: 'av',
  data() {
    return {
      allCategoryList: [],
      isShowPopover: false,
      currentCategory: '演唱会',
      videoGroupId: 9102,
      videoList: [],
      loading: false,
    }
  },
  created() {
    this.getVideoTags()
    this.getVideoTagGroup()
  },
  methods: {
    async getVideoTags() {
      let [res] = await to(neteaseApi.videoTag())
      this.allCategoryList = res.data
    },
    selectCategoryName({ id, name }) {
      this.currentCategory = name
      this.videoGroupId = id
      if (this.isShowPopover) {
        this.isShowPopover = false
      }
      this.getVideoTagGroup()
    },
    async getVideoTagGroup() {
      let [res] = await to(neteaseApi.videoGroup({
        id: this.videoGroupId
      }))
      this.videoList = res.datas.map(item => item.data);
      console.log(res)
    },
    selectId(item) {
      console.log(item)
      this.$router.push(`/avdetail/${item.vid}`)
    }
  },
  components: {
    Spinner,
    VideoList
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.loading {
  @include position(absolute, 0, 0, 0, 0);
  background: #fff;
  z-index: 99999;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}

.video-wrapper {
  .video-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px 30px;

    .btn {
      display: block;
      padding: 6px 9px 6px 17px;
      border-radius: 30px;
      border: 1px solid $color-border;
      font-size: 13px;
      color: $color-base-grey;
    }
  }
}
.video-body {
  padding: 10px 20px;
}

.more-category-wrapper {
  width: 718px;
  position: absolute;
  top: 45px;
  border: 1px solid #ebeef5;
  background: #fff;
  z-index: 20;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .all-title {
    padding: 15px 30px;
    font-size: 14px;
    border-bottom: 1px solid $color-border;
    .title {
      color: $color-base-black;
      padding: 4px 12px;
      border-radius: 10px;
      &:hover {
        color: $color-base-red;
      }
      &.active {
        color: $color-base-red;
        background: rgb(253, 243, 244);
      }
    }
  }
  .cat-content-box {
    padding: 20px;
    box-sizing: border-box;
    .cat-list-wrapper {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      .list-item {
        width: 113px;
        margin-bottom: 10px;
        .list-group {
          display: block;
          text-align: center;
          height: 30px;
          line-height: 30px;
          color: $color-base-black;
          font-size: 13px;
          span {
            padding: 4px 12px;
            border-radius: 15px;
            &:hover {
              color: $color-base-red;
            }
            &.active {
              color: $color-base-red;
              background: rgb(253, 243, 244);
            }
          }
        }
      }
    }
  }
}
</style>