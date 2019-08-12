<template>
  <div class="singer-wrapper">
    <div class="singer-box"  v-infinite-scroll="load">
      <div class="singer-category-box">
        <div class="singer-cat-content margb">
          <div class="title">
            <span>分类:</span>
          </div>
          <ul class="singer-category-list">
            <li class="singer-list-item" v-for="(item,index) in singerCatlist" :key="index">
              <a href="" class="item-name">
                <span>{{item.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="singer-cat-content margb">
          <div class="title">
            <span>筛选:</span>
          </div>
          <ul class="singer-category-list">
            <li class="singer-list-item">
              <a href="" class="item-name">
                <span class="active">热门</span>
              </a>
            </li>
            <li class="singer-list-item" v-for="(item,index) in alphalist" :key="index">
              <a href="" class="item-name">
                <span>{{item}}</span>
              </a>
            </li>
          </ul>
        </div>
        
      </div>
      <div class="singer-list-box">
        <singer-list></singer-list>
      </div>
    </div>
    <div class="loading">

    </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import { singerCatlist,alphalist } from '@/api/apiType'
import SingerList from './SIngerList'
  export default {
    data() {
      return {
        singerCatlist,
        alphalist,
      }
    },
    created () {
      this.getArtistList()
    },
    computed: {
      alphalists() {
        return this.alphalist.slice()
      }
    },
    methods: {
      async getArtistList() {
        let [res] = await to(neteaseApi.artistlist({
          cat:'2001'
        }))
        console.log(res)
      },
      load() {
        console.log(123123)
      }
    },
    components: {
      SingerList
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
.singer-wrapper {
  .singer-box {
    padding: 20px 30px;
    .singer-category-box {
      .singer-cat-content {
        display: flex;
        flex-direction: row;
        &.margb {
          margin-bottom: 10px;
        }
        .title {
          width: 66px;
          font-size: 12px;
          color: $color-simple-black;
          padding-top: 5px;
          span {
            display: inline-block;
            width: 100%;
          }
        }
        .singer-category-list {
          .singer-list-item {
            display: inline-block;
            margin-bottom: 5px;
            &:last-child {
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
    
  }
}
</style>