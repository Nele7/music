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
                            <li
                                v-for="(item,index) in historySearch"
                                :key="index"
                                @click="selectSearchItem(item)"
                            >
                                <a href="#">{{item}}</a>
                                <i class="el-icon-close" @click.stop="clearHistoryItem(index)"></i>
                            </li>
                        </ul>
                    </div>
                </div>
                <template v-else>
                    <suggest :suggestSearch="suggestSearch"></suggest>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import Suggest from './Suggest/'
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
            this.insertHistorySearch(this.historySearch, this.valueSearch)
            localStorage.setItem(historySearch, JSON.stringify(this.historySearch))
            this.$router.push(`/searchdetail/${this.valueSearch}`)
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
            this.insertHistorySearch(this.historySearch, this.valueSearch)
            localStorage.setItem(historySearch, JSON.stringify(this.historySearch))
            this.isShowDialog = false
            this.$router.push(`/searchdetail/${first}`)
        },
        async getSerachSuggest(keywords) {
            let [res] = await to(neteaseApi.searchSuggest({
                keywords
            }))
            this.suggestSearch = res.result
        },
        insertHistorySearch(arr, val) {
            let index = arr.findIndex(item => item === val)
            if (index === 0) { // 为第一位时
                return
            }
            if (index > -1) {   // 说明有重复值
                arr.splice(index, 1)
            }
            arr.unshift(val)
        },
    },
    watch: {
        valueSearch(n, o) {
            if (n !== null) {
                this.isSelect = true
                this.getSerachSuggest(n)
            }
        }
    },
    components: {
        Suggest
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
            color: $color-text !important;
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
            color: $color-text !important;
        }
    }
    .search-wrapper {
        @include position(fixed, 52px, 0, 60px, 0, auto, auto);
        .dialog {
            @include position(absolute, 0, 0, 0, auto, 360px, auto);
            background: $color-white;
            .search {
                p {
                    color: $color-text;
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
                        color: $color-text;
                        cursor: pointer;
                        a {
                            display: block;
                            padding: 5px 17px;
                            color: $color-text;
                        }
                        &:hover {
                            background: $background-active;
                            a {
                                color:$color-text;
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
}
</style>