<template>
    <div class="nav-search-area">
        <div class="nav-search">
            <i class="el-icon-search icon-search"></i>
            <input
                type="text"
                placeholder="搜索您想听的歌曲..."
                v-model="valueSearch"
                @focus="openDialog"
                @keyup.enter="enterSearch"
            />
            <i class="el-icon-close icon-close" @click="clearInput" v-if="valueSearch"></i>
        </div>
        <div class="search-wrapper" @click="closeDialog" v-if="isShowDialog">
            <div class="dialog" @click="cancelDefault">
                <div style="padding:20px" v-if="!isSelect">
                    <div class="search">
                        <p>热门搜索</p>
                        <ul>
                            <li
                                v-for="(item,index) in hotSearch"
                                :key="index"
                                @click="selectSearchItem(item.first)"
                            >
                                <a href="#">{{item.first}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="history search" v-if="historySearch.length > 0">
                        <p>历史搜索</p>
                        <ul>
                            <li v-for="(item,index) in historySearch" :key="index" @click="selectSearchItem(item)">
                                <a href="#">{{item}}</a>
                                <i class="el-icon-close" @click="clearHistoryItem(index)"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <template v-else>
                    <el-scrollbar
                        wrap-class="scrollbar-wrapper"
                        style="height:calc(100%);"
                        ref="myScrollbar"
                    >
                        <div class="search-suggest-wrapper">
                            <div
                                class="suggest-box"
                                v-for="(order,index) in suggestSearch.order"
                                :key="index"
                            >
                                <div class="suggest-title">
                                    <i
                                        class="iconfont"
                                        :class="suggestSearch && normalTitle(order)[1]"
                                    ></i>
                                    <span>{{suggestSearch && normalTitle(order)[0]}}</span>
                                </div>
                                <ul class="suggest-list">
                                    <li v-for="(item,index) in suggestSearch[order]" :key="index">
                                        <a href="#" @click="changeSuggest(order,index)">
                                            <span>{{item.name}}</span>
                                            <span v-for="(ar,i) in item.artists" :key="i">
                                                 - {{ar.name}}
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-scrollbar>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
const historySearch = '__histortSearch__'
export default {
    data() {
        return {
            hotSearch: [],
            valueSearch: null,
            historySearch: JSON.parse(localStorage.getItem(historySearch)) || [],
            suggestSearch: {},
            isSelect: false,
            isShowDialog: false,
        }
    },
    created() {
        this.getHotSearch()
    },
    computed: {
    },
    methods: {
        async getHotSearch() {
            let [res] = await to(neteaseApi.hotSearch())
            this.hotSearch = res.result.hots
            // console.log(res)
        },
        enterSearch() {
            // 保存本地,跳转
            this.insertHistorySearch(this.historySearch,this.valueSearch)
            localStorage.setItem(historySearch, JSON.stringify(this.historySearch))
            this.$router.push(`/searchdetail/index/${this.valueSearch}`)
        },
        clearHistoryItem(index) {
            this.historySearch.splice(index, 1)
            localStorage.setItem(historySearch, JSON.stringify(this.historySearch))
        },
        clearInput() {
            this.isSelect = false
            this.valueSearch = null
        },
        openDialog() {
            this.isShowDialog = true
        },
        closeDialog() {
            this.isShowDialog = false
        },
        cancelDefault() {
            window.event.stopPropagation()  // 解决父元素点击事件的问题，阻止事件冒泡即可
        },
        selectSearchItem(first) {
          // 1保存本地，2跳转页面 3发送搜索请求，
            this.valueSearch = first
            this.insertHistorySearch(this.historySearch,this.valueSearch)
            localStorage.setItem(historySearch, JSON.stringify(this.historySearch))
            this.isShowDialog = false
            this.$router.push(`/searchdetail/index/${first}`)
        },
        async getSerachSuggest(keywords) {
            let [res] = await to(neteaseApi.searchSuggest({
                keywords
            }))
            this.suggestSearch = res.result
        },
        normalTitle(order) {
            let obj = {
                'songs': ['单曲', 'icon-yinyue'],
                'albums': ['专辑', 'icon-dengji'],
                'mvs': ['视频', 'icon-shipin'],
                'artists': ['歌手', 'icon-yonghu'],
                'playlists': ['歌单', 'icon-liebiao']
            }
            return obj[order]
        },
        insertHistorySearch(arr,val) {
            let index = arr.findIndex(item => item === val)
            if(index === 0) { // 为第一位时
              return
            }
            if(index > -1) {   // 说明有重复值
              arr.splice(index,1)
            }
            arr.unshift(val)
        },
        changeSuggest(order,index) {
            let orderArr = this.suggestSearch[order]
            if(order === 'songs'){
                // 说明为单曲播放
                this.$store.dispatch('player/replaceMusicPlayList',orderArr[index])
            }else if(order === 'artists') {

            }
            console.log(order,index,orderArr[index])
        }
    },
    watch: {
        valueSearch(n, o) {
            if (n !== null) {
                this.isSelect = true
                this.getSerachSuggest(n)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.nav-search-area {
    flex: 0 0 180px;
    width: 180px;
    -webkit-app-region: no-drag;
    .nav-search {
        display: flex;
        align-items: center;
        height: 100%;
        position: relative;
        .icon-search {
            position: absolute;
            left: 5px;
            color: $color-base-grey !important;
        }
        input {
            outline: none;
            border: 0;
            color: rgb(66, 66, 66);
            background-color: $background-grey;
            padding: 0 23px;
            border-radius: 20px;
            height: 25px;
            width: 100%;
            font-size: 13px;
        }
        .icon-close {
            position: absolute;
            right: 5px;
            color: $color-base-grey !important;
        }
    }
    .search-wrapper {
        @include position(fixed, 52px, 0, 60px, 0, auto, auto);
        .dialog {
            @include position(absolute, 0, 0, 0, auto, 360px, auto);
            background: #fff;
            .search {
                p {
                    color: $color-base-grey;
                    font-size: 14px;
                }
                ul {
                    padding: 10px 0;

                    li {
                        display: inline-block;
                        border-radius: 30px;
                        border: 1px solid $color-border;
                        margin: 0 9px 9px 0;
                        font-size: 13px;
                        color: $color-simple-black;
                        cursor: pointer;
                        a {
                            display: block;
                            padding: 5px 17px;
                            color: $color-simple-black;
                        }
                        &:hover {
                            background: $background-active;
                            a {
                                color: $color-base-black;
                            }
                        }
                    }
                }
            }
            .history {
                padding-top: 0;
                ul {
                    li {
                        position: relative;
                        &:hover {
                            i {
                                display: block;
                            }
                        }
                        i {
                            position: absolute;
                            right: 2px;
                            top: 5px;
                            display: none;
                        }
                    }
                }
            }
        }
        z-index: 1501;
    }
    .search-suggest-wrapper {
        .suggest-box {
            padding: 10px 0;
            .suggest-title {
                padding-left: 8px;
                color: $color-base-grey;
                font-size: 14px;
                i {
                    font-size: 14px;
                }
            }
            .suggest-list {
                padding-top: 10px;
                li {
                    font-size: 13px;
                    height: 35px;
                    line-height: 35px;
                    cursor: pointer;
                    &:hover {
                        background: $background-active;
                    }
                    a {
                        display: block;
                        @include ellipsized;
                        margin: 0 26px;
                        color: $color-base-black;
                    }
                }
            }
        }
    }
}
</style>