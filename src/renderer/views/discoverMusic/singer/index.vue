<template>
  <div class="singer-wrapper">
    <div class="singer-box"  v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
      <div class="singer-category-box">
        <div class="singer-cat-content margb">
          <div class="title">
            <span>分类:</span>
          </div>
          <ul class="singer-category-list">
            <li class="singer-list-item" v-for="(item,index) in singerCatlist" :key="index">
              <a href="#" class="item-name" @click="selectSingerCat(item.catCode)">
                <span :class="{active:item.catCode === currentCat}">{{item.name}}</span>
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
              <a href="#" class="item-name" @click="selectSingerCat('热门')">
                <span :class="{active:currentHotCat}">热门</span>
              </a>
            </li>
            <li class="singer-list-item" v-for="(item,index) in alphalist" :key="index">
              <a href="#" class="item-name" @click="selectSingerCat(item)">
                <span :class="{active:item === currentInitial}">{{item}}</span>
              </a>
            </li>
          </ul>
        </div>
        
      </div>
      <div class="singer-list-box">
        <singer-list :list="Artistlist" @selectId="selectId"></singer-list>
      </div>
      <div v-if="loading" class="hint">
        <p>加载中....</p>
      </div>
      <div v-if="disabled" class="hint">
        <p>没有更多了.....</p>
      </div>
    </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import { singerCatlist,alphalist } from '@/api/apiType'
import { DELAY } from '@/config'

import to from "@/utils/await-to.js"
import SingerList from './SingerList'

  export default {
    data() {
      return {
        singerCatlist,
        alphalist,
        Artistlist:[],
        currentCat:null,
        currentInitial:null,
        currentHotCat:true,
        loading:false,
        limit:30,
        currentPage:1,
        isMore:false
      }
    },
    created () {
      this.getHotArtist()
    },
    computed: {
      offset() {
        return (this.currentPage - 1) * this.limit
      },
      disabled () {
        return !this.isMore && !this.loading
      }
    },
    methods: {
      async getArtistList() {
        this.loading = true
        let [res] = await to(neteaseApi.artistlist({
          cat: this.currentCat,
          initial: this.currentInitial,
          limit: this.limit,
          offset: this.offset
        }))
        this.isMore = res.more
        setTimeout(() => {
          this.loading = false
          this.Artistlist = [...this.Artistlist,...res.artists]
        },DELAY)
      },
      async getHotArtist() {
        this.loading = true
        let [res] = await to(neteaseApi.topArtists({
          limit: this.limit,
          offset: this.offset
        }))
        setTimeout(() => {
          this.loading = false
          this.Artistlist = [...this.Artistlist,...res.artists]
          this.isMore = res.more
        },DELAY)
        
      },
      selectSingerCat(code) {
        this.currentHotCat = false
        this.Artistlist = []
        this.limit = 50
        this.currentPage = 1

        if(typeof code === 'string' && code !== '热门') {
          this.currentInitial = code
          this.getArtistList()
        }
        if(typeof code === 'number') {
          this.currentCat = code
          this.getArtistList()
        }
        if(code === '热门') {
          this.currentCat = null
          this.currentInitial = null
          this.currentHotCat = true
          this.getHotArtist()
        }
      },
      load() {
        if(this.isMore) {
          this.currentPage += 1
          if(this.currentHotCat) {
            this.getHotArtist()
          }else {
            this.getArtistList()
          }
        }
      },
      selectId(id) {
        this.$router.push(`/singerdetail/${id}`)
      }
    },
    components: {
      SingerList,
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
    .hint {
      margin: 10px 0;
      text-align: center;
      font-size: 13px;
      color: $color-base-grey;
    }
  }
}
.loading {
  div {
    position: absolute;
    top:50%;
    left: 50%;
  }
} 
</style>