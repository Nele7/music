<template>
  <div class="playlist-wrapper">
    <div class="playlist-header">
     
        <div class="more-category-wrapper" 
        v-if="isShowPopover" 
        @mouseleave="isShowPopover = false" 
        @mouseenter="isShowPopover = true">
          <div class="all-title">
            <a href="#" class="title">全部歌单</a>
          </div>
          <div class="cat-content-box">
            <ul class="cat-list-wrapper" v-for="(stair,index) in allCategoryList" :key="index">
              <li class="stair-wrapper">
                <a href="#" class="cat-title">
                  <i class="iconfont" :class="categoryIcon[index]"></i>
                  <span>{{stair.stairName}}</span>
                </a>
              </li>
              <ul class="secondlevel-wrapper">
                <li class="secondlevel-box" v-for="(item,i) in stair.allCategory" :key="i">
                  <a href="#" class="secondlevel-item">
                    <span 
                    :class="{hide:!item.hot}"
                    >{{item.name}}</span>
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </div>

        <a href="#" class="btn" slot="reference" @click="showPopover">
          <span>流行</span>
          <i class="el-icon-arrow-right"></i>
        </a>

      <div class="playlist-hot">
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
        hotCategoryList: [],
        allCategoryList: [],
        isShowPopover:false
      }
    },
    created(){
      this.getPlaylistHotCategory()
      this.getPlaylistAllCategory()
    },
    computed: {
      categoryIcon() {
        return ['icon-yuzhong','icon-fengge','icon-cha','icon-xiaolian','icon-zhuti1']
      }
    },
    methods: {
      async getPlaylistHotCategory() {
        let [res] = await to(neteaseApi.playlistHot())
        this.hotCategoryList = res.tags
      },
      async getPlaylistAllCategory() {
        let [res] = await to(neteaseApi.playlistCat())
        this.allCategoryList = this._normalizeAllCategory(res)
      },
      _normalizeAllCategory(data) {
        return Object.keys(data.categories).map(key => {
          let obj = {}
          obj.stairName = data.categories[key]
          obj.allCategory = data.sub.filter(item => item.category == key )
          return obj
        })
      },
      showPopover() {
        this.isShowPopover = true
      },
      over() {
        console.log('进来')
      },
      out(){
        console.log('出去')
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";

// .playlist-all {
  .more-category-wrapper {
    position: absolute;
    top: 45px;
    border: 1px solid #EBEEF5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .all-title {
      padding: 15px 30px;
      font-size: 14px;
      border-bottom: 1px solid $color-border;
      .title {
        color: $color-base-red;
      }
    }
    .cat-content-box{
      .cat-list-wrapper {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        .stair-wrapper {
          flex: 1;
          .cat-title {
            display: block;
            color: rgb(187,187,187);
            height: 30px;
            line-height: 30px;
            text-align: left;
            i {
              font-size: 23px;
              vertical-align: middle;
            }
            span {
              font-size: 13px;
            }
          }
        }
        .secondlevel-wrapper {
          width: 606px;
          display: flex;
          flex-wrap: wrap;
          .secondlevel-box {
            margin-bottom: 14px;
            .secondlevel-item {
              display: block;
              text-align: center;
              height: 30px;
              line-height: 30px;
              color: $color-base-black;
              width: 101px;
              span {
                padding: 4px 12px;
                border-radius: 15px;
                font-size: 13px;
                
                &.active {
                  color: $color-base-red;
                  background: rgb(253,243,244);
                }
                &.hide::after {
                  display: none;
                }
                &::after {
                  content:'HOT';
                  position: absolute;
                  font-size: 7px;
                  color: rgb(212,81,77);
                  font-weight: bold;
                  transform: translateY(-3px);
                }
              }
            }
          }
        }
      }
    }
    
  }
// }

.playlist-wrapper {
  .playlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px 30px;

    .btn {
      display: block;
      padding: 6px 9px 6px 17px;
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
              padding: 4px 7px;
              border-radius: 14px;
              &:active {
                color: $color-base-red;
                background: rgb(253,243,244)
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
