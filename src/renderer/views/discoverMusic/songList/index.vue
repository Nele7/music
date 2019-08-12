<template>
    <div class="playlist-wrapper">
        <div class="playlist-header">
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
                    <div class="all-title">
                        <a
                            href="#"
                            class="title"
                            :class="{active:currentCategory == '全部'}"
                            @click="selectCategoryName('全部')"
                        >全部歌单</a>
                    </div>
                    <div class="cat-content-box">
                        <ul
                            class="cat-list-wrapper"
                            v-for="(stair,index) in allCategoryList"
                            :key="index"
                        >
                            <li class="stair-wrapper">
                                <a href="#" class="cat-title">
                                    <i class="iconfont" :class="categoryIcon[index]"></i>
                                    <span>{{stair.stairName}}</span>
                                </a>
                            </li>
                            <ul class="secondlevel-wrapper">
                                <li
                                    class="secondlevel-box"
                                    v-for="(item,i) in stair.allCategory"
                                    :key="i"
                                >
                                    <a
                                        href="#"
                                        class="secondlevel-item"
                                        @click="selectCategoryName(item.name)"
                                    >
                                        <span
                                            :class="{hide:!item.hot,active:item.name == currentCategory}"
                                        >{{item.name}}</span>
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </transition>

            <!-- 热门分类 -->
            <div class="playlist-hot">
                <ul class="hot-list">
                    <li class="hot-list-item" v-for="(item,index) in hotCategoryList" :key="index">
                        <a href="#" class="item-name" @click="selectCategoryName(item.name)">
                            <span :class="{active:item.name == currentCategory}">{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 歌单 -->
        <div class="playlist-body" v-if="!loading">
            <song-lists :playlists="playlistResult" @selectId="selectId"></song-lists>
            <div class="page-wrapper" >
              <el-pagination
                :page-size="limit"
                :total="total"
                layout="prev, pager, next"
                @current-change="currentChange"
              ></el-pagination>
            </div>
        </div>
        <div class="loading" v-if="loading">
          <Spinner name="ball-scale-multiple" color="#b31212"/>
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import { covertUnit } from '@/utils/util.js'
import { DELAY } from '@/config'

import to from "@/utils/await-to.js"
import SongLists from './SongLists'
import Spinner from 'vue-spinkit'

export default {
    name: 'songList',
    data() {
        return {
            hotCategoryList: [],
            allCategoryList: [],
            playlistResult: [],
            isShowPopover: false,
            currentCategory: '华语',
            limit:50,
            currentPage:1,
            total:0,
            loading:false
        }
    },
    mounted() {
        this.getPlaylistHotCategory()
        this.getPlaylistAllCategory()
        this.getPlaylist()
    },
    computed: {
        categoryIcon() {
            return ['icon-yuzhong', 'icon-fengge', 'icon-cha', 'icon-xiaolian', 'icon-zhuti1']
        },
        offset() {
          return (this.currentPage - 1) * this.limit
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
                obj.allCategory = data.sub.filter(item => item.category == key)
                return obj
            })
        },
        async getPlaylist() {
            this.loading = true
            let [res] = await to(neteaseApi.playlistTop({
                cat: this.currentCategory,
                limit:this.limit,
                offset: this.offset
            }))
              this.playlistResult = res.playlists
              this.total = res.total
              setTimeout(()=>{
                this.loading = false
              },DELAY)
        },
        selectCategoryName(name) {
            if (this.isShowPopover) {
                this.isShowPopover = false
            }
            this.currentCategory = name
        },
        selectId(id) {
          this.$router.push(`/songlistdetail/index/${id}`)
        },
        currentChange(page) {
          this.currentPage = page
          this.getPlaylist()
        }
    },
    watch: {
        currentCategory() {
          this.currentPage = 1
          this.limit = 50
          this.total = 0
          this.getPlaylist()
        }
    },
    components: {
        SongLists,
        Spinner
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
$background-icon: rgba(12, 12, 12, 0.452);

.more-category-wrapper {
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
            &.active {
                color: $color-base-red;
                background: rgb(253, 243, 244);
            }
        }
    }
    .cat-content-box {
        .cat-list-wrapper {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            .stair-wrapper {
                flex: 1;
                .cat-title {
                    display: block;
                    color: rgb(187, 187, 187);
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
                                background: rgb(253, 243, 244);
                            }
                            &.hide::after {
                                display: none;
                            }
                            &::after {
                                content: "HOT";
                                position: absolute;
                                font-size: 7px;
                                color: rgb(212, 81, 77);
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
            border: 1px solid $color-border;
            font-size: 13px;
            color: $color-base-grey;
        }

        .playlist-hot {
            .hot-list {
                .hot-list-item {
                    display: inline-block;
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
    .playlist-body {
        padding: 0 20px;
        .page-wrapper {
          text-align: center;
          margin: 20px 0;
        }
    }
    .loading {
      div {
        position: absolute;
        top:50%;
        left: 50%;
      }
    }
}
</style>