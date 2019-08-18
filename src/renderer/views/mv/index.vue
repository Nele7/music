<template>
    <div class="mv-wrapper">
        <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
            <div class="mv-header">
                <div class="title">
                    <p>MV 排行榜</p>
                </div>
                <!-- 分类 -->
                <div class="cat">
                    <ul class="cat-list">
                        <li class="cat-list-item" v-for="(item,index) in mvTopCatType" :key="index">
                            <a href="#" class="item-name" @click="selectArea(item.area)">
                                <span :class="{active:item.area == currentArea}">{{item.name}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mv-body">
                <mv-top :list="mvToplist"></mv-top>
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
    import to from "@/utils/await-to.js"
    import { mvTopCatType } from '@/api/apiType'
    import MvTop from './MvTop/'
    export default {
        name:'mv',
        data() {
            return {
                currentArea:'',
                mvTopCatType,
                limit:20,
                currentPage:1,
                mvToplist:[],
                loading: false,
                isMore:false
            }
        },
        created() {
            this.getTopMv()
        },
        computed: {
            disabled() {
                return !this.loading && !this.isMore
            }
        },
        methods: {
            async getTopMv() {
                this.loading = true
                let offset = (this.currentPage - 1) * this.limit
                let [res] = await to(neteaseApi.mvTop({
                    area:this.currentArea,
                    limit:this.limit,
                    offset
                }))
                this.isMore = res.hasMore
                // setTimeout(()=>{
                    this.loading = false
                    this.mvToplist = [...res.data,...this.mvToplist]
                // },1000)
                console.log(res)
            },
            selectArea(area) {
                this.mvToplist = []
                this.limit = 20
                this.currentPage = 1
                this.currentArea = area
                this.getTopMv()
            },
            load() {
                this.currentPage += 1
                // this.getTopMv()
                console.log('111')
            }
        },
        components: {
            MvTop
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
.mv-wrapper {
    padding: 20px;
    .mv-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .title {
            font-size: 15px;
            // font-weight: bold;
        }
        .cat {
            .cat-list {
                .cat-list-item {
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
    .hint {
        margin: 10px 0;
        text-align: center;
        font-size: 13px;
        color: $color-base-grey;
    }
}
</style>