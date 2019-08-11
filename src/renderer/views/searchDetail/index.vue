<template>
    <div>
        <div class="search-detail-wrapper">
            <div class="result">
            <h3>
                {{keywords}} 
                <span>{{hint}}</span>
            </h3>
            </div>
            <ul class="tabs">
                <li class="tab-item" 
                v-for="item in searchTabList" :key="item.type"
                :class="{active:currentType===item.type}"
                @click="changeTab(item.type,item.component)"
                >{{item.tab}}</li>
            </ul>
            <div class="search-detail-container" v-if="!loading">
                <div class="views">
                    <component 
                    :is="currentComponent" 
                    v-bind="result" 
                    @loadMore="changeLoadMore"
                    :isMore="isMore"
                    ></component>
                </div>
            </div>
        </div>
        <div class="loading" v-if="loading">
            <Spinner name="ball-scale-multiple" color="#b31212"/>
        </div>
    </div>
</template>

<script>
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    import { searchTabList } from "@/api/apiType"
    import { 
        SearchMusic,
        SearchArtist,
        SearchAlbum,
        SearchVideo,
        SearchPlaylist,
        SearchLyric,
        SearchRadio,
        SearchUser
    } from './index'
    import Spinner from 'vue-spinkit'
    import { DELAY } from '@/config'

    export default {
        name:'searchdetail',
        data() {
            return {
                searchTabList,                      // tab
                currentType: 1,                     // 作为serach的参数
                currentComponent:'SearchMusic',     // 显示组件
                // currentIndex:1,                     // 当前
                result: {},                         // 搜索结果
                resultCount: 0,                     // 总条数
                resultList: [],                     // 临时搜索结果数组
                limit:30,                           // 一页显示条数
                pageSize:1,                         // 当前页数
                isMore:false,                       // 用于判断加载更多是否显示
                loading:false
            }
        },
        created() {
            this.getSearch()
        },
        computed: {
            hint() {
                let obj = {
                    'SearchMusic':`找到${this.resultCount}首单曲`,
                    'SearchArtist':`找到${this.resultCount}位歌手`,
                    'SearchAlbum':`找到${this.resultCount}张专辑`,
                    'SearchVideo':`找到${this.resultCount}个视频`,
                    'SearchLyric':`找到${this.resultCount}首歌词`,
                    'SearchRadio':`找到${this.resultCount}个电台`,
                    'SearchUser':`找到${this.resultCount}位用户`,
                    'SearchPlaylist':`找到${this.resultCount}个歌单`,
                }
                return obj[this.currentComponent]
            },
            keywords() {
                return this.$route.params.keywords
            },
            offset() {
                return (this.pageSize - 1) * this.limit
            }
        },
        methods: { 
            async getSearch() {
                this.loading = true
                let [res] = await to(neteaseApi.search({
                    keywords:this.keywords,
                    type: this.currentType,
                    limit:this.limit,
                    offset:this.offset
                }))
                this.normalizeResult(res.result)
                setTimeout(()=> {
                    this.loading = false
                },DELAY)
            },
            normalizeResult(result) {
                /**
                 * typeof 一般只返回number string boolean object function undefined
                 * typeof 遇到引用类型会出现问题，它都会返回object
                 * instaceof 用来检测某个对象是不是另一个对象的实例
                 */
                let totalResult = []   // 用于存放当前的list
                let arrKey = ''        // 用于存放当前的key
                Object.keys(result).forEach(key => {
                    if(typeof result[key] === 'number') {
                        this.resultCount = result[key]  // 保存当前的count
                    }
                    if(result[key] instanceof Array) {
                        totalResult = result[key]
                        arrKey = key  
                    }
                })
                if(totalResult) {
                    // 取到当前的result，resultList作为临时变量
                    this.resultList = result[arrKey] = [...this.resultList,...totalResult]
                    this.result = result
                    this.isMore = true
                    console.log(result)
                }
                // 如果页数*当前数量 大于总数
                if(this.pageSize * this.limit >= this.resultCount){
                    this.isMore = false
                }
                
            },
            changeTab(type,component) {
                this.currentType = type
                this.currentComponent = component
                this.result = {}
                this.resultCount = 0
                this.resultList = []
                this.pageSize = 1
                this.limit = 30
                this.getSearch()
            },
            changeLoadMore() {
                this.pageSize += 1
                this.getSearch()
            }
        },
        watch: {
            keywords(n,o) {
                if(n){
                    this.resultList = []
                    this.result = {}
                    this.pageSize = 1
                    this.limit = 30
                    this.resultCount = 0
                    this.getSearch()
                }
            }
        },
        components: {
            SearchMusic,
            SearchArtist,
            SearchAlbum,
            SearchVideo,
            SearchPlaylist,
            SearchLyric,
            SearchRadio,
            SearchUser,
            Spinner
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";

.search-detail-wrapper {
    .result{
        padding: 20px 30px;
        h3 {
            margin: 0;
            font-size: 22px;
            span {
                color:$color-base-grey;
                font-weight: 500;
                font-size: 13px;
            }
        }
    }
    .tabs {
        padding:0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid $color-border;
        .tab-item {
            display: inline-block;
            padding: 10px;
            font-size: 14px;
            margin-right: 8px;
            cursor: pointer;
            &.active {
                font-weight: bold;
                color: $color-base-red;
            }
        }
    }
    .search-detail-container {
        height: calc(100% - 60px);
    }
}
.loading {
    div {
        position: absolute;
        top: 50%;
        left: 50%;
    }
}
</style>