<template>
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
        <div class="views">
            <component :is="currentComponent" v-bind="result"></component>
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
    export default {
        name:'searchdetail',
        data() {
            return {
                searchTabList,
                currentType: 1,
                currentComponent:'SearchMusic',
                result: {},
                resultCount: 0,
                resultList: []
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
            }
        },
        methods: { 
            async getSearch() {
                let [res] = await to(neteaseApi.search({
                    keywords:this.keywords,
                    type: this.currentType
                }))
                this.normalizeResult(res.result)
                console.log(res)
            },
            normalizeResult(result) {
                Object.keys(result).forEach(key => {
                    /**
                     * typeof 一般只返回number string boolean object function undefined
                     * typeof 遇到引用类型会出现问题，它都会返回object
                     * instaceof 用来检测某个对象是不是另一个对象的实例
                     */
                    if(typeof result[key] === 'number') {
                        this.resultCount = result[key]
                    }
                    if(result[key] instanceof Array) {
                        this.resultList = result[key]    
                    }
                    this.result = result
                    // console.log(this.resultCount)
                })
            },
            changeTab(type,component) {
                this.currentType = type
                this.currentComponent = component
                this.result = {}
                this.resultCount = 0
                this.resultList = []
                this.getSearch()
            }
        },
        watch: {
            keywords(n,o) {
                if(n){
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
            SearchUser
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

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
            }
        }
    }
}
</style>