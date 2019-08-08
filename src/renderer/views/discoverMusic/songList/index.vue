<template>
  <div class="playlist-wrapper">
    <div class="playlist-header">
      <el-popover
        placement="top-start"
        popper-class="playlist-all"
        trigger="click"
        >
        <div class="more-category-wrapper">
          <div class="cat-title">
            <a href="#">全部歌单</a>
          </div>
        </div>
         <a href="#" class="btn" slot="reference">
            <span>流行</span>
            <i class="el-icon-arrow-right"></i>
          </a>
      </el-popover>
      <div class="playlist-hot">
        <!-- <span>雨纷纷</span>
    <el-divider direction="vertical"></el-divider>
    <span>旧故里</span>
    <el-divider direction="vertical"></el-divider>
    <span>草木深</span> -->
        <ul class="hot-list">
          <li class="hot-list-item" 
          v-for="(item,index) in hotCategoryList" :key="index">
            <a href="#" class="item-name">
              <span>{{item.name}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
  export default {
    name:'songList',
    data() {
      return {
        allCategoryList: [],
        hotCategoryList: []
      }
    },
    created(){
      this.getPlaylistHotCategory()
      this.getPlaylistAllCategory()
    },
    computed: {

    },
    methods: {
      async getPlaylistHotCategory() {
        let [res] = await to(neteaseApi.playlistHot())
        this.hotCategoryList = res.tags
        console.log('热门分类--',res)
      },
      async getPlaylistAllCategory() {
        let [res] = await to(neteaseApi.playlistCat())
        console.log('所有分类--',res)
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";

.playlist-all {
  
  .more-category-wrapper {
    .cat-title {
      padding: 15px;
      color: #000;
    }
  }
}

.playlist-wrapper {

  .playlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;

    .btn {
      display: block;
      padding: 6px 20px;
      border-radius: 30px;
      border:1px solid $color-border;
      font-size: 13px;
      color: $color-base-grey;
    }

    .playlist-hot {
      .hot-list {
        .hot-list-item {
          display: inline-block;
          &:last-child{
            .item-name {
              border-right: none;
            }
          }
          .item-name {
            padding: 0 7px;
            border-right: 1px solid $color-border;
            font-size: 12px;
            color: $color-simple-black;
            span {
              display: inline-block;
              padding: 3px 7px;
              border-radius: 14px;
              &.active {
                color: $color-base-red;
                background: rgba($color: #000, $alpha: 0.1)
              }
              &:hover {
                color: $color-base-red;
                background: rgba($color: #000, $alpha: 0.1)
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style>
.el-popover {
  padding: 0;
}
</style>
