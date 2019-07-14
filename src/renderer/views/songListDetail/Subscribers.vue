<template>
    <el-row :gutter="10" class="list-wrapper">
        <el-col :md="12" :lg="6" v-for="(item,index) in collectList" :key="index" class="list-item">
            <div class="item">
                <div class="avatar">
                    <img :src="item.avatarUrl" alt="">
                </div>
                <div class="description">
                    <div class="name">
                        {{item.nickname}}
                        <i class="iconfont" :class="getGender(item.gender)"></i>
                    </div>
                    <div class="brief" >
                        {{item.signature && item.signature}}
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="24">
            <!-- <div class="pages-container" v-if="total > pagesize">
                <el-pagination
                    :page-size="pagesize"
                    :total="total"
                    layout="prev, pager, next, jumper"
                    @current-change="currentChange"
                ></el-pagination>
            </div> -->
            <h4 class="noComment" v-if="collectList.length === 0">
                <span>暂无收藏者~~</span>
            </h4>
            <h4 v-if="isMore" @click="loadHotMore" class="collect-more">
                <a href="#">
                    加载更多收藏者
                    <i class="el-icon-arrow-down"></i>
                </a>
            </h4>
        </el-col>
    </el-row>        
</template>

<script>
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    export default {
        name: 'subscribers',
        props:['id'],
        data() {
            return {
                collectList: [],
                currentPage:1,
                pagesize: 20,
                total:0,
                isMore: false
            }
        },
        created() {
            this.getSubscribers()
        },
        computed:{
            offset() {
                return (this.currentPage -1) * this.pagesize
            }
        },
        methods: {
            // 获取收藏者
            async getSubscribers() {
                let [res] = await to(neteaseApi.plSubscribers({
                    id: this.id,
                    limit: this.pagesize,
                    offset: this.offset
                }))
                this.isMore = res.more
                this.collectList = [...this.collectList,...res.subscribers]
            },
            // 获取性别
            getGender(gender) {
                return gender === 0 ? '' : (gender === 1 ? 'icon-nan' : 'icon-nv')
            },
            // 加载更多
            loadHotMore() {
                this.currentPage += 1
                this.getSubscribers()
            }
        },
        watch: {
            id:{
                deep:true,
                handler() {
                    this.collectList = []
                    this.getSubscribers()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
.item {
    display: flex;
    flex-direction: row;
    height: 80px;
    padding: 10px;
    .avatar {
        width: 80px;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .description {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        .name {
            font-size: 14px;
            .iconfont {
                font-size: 12px;
                padding: 2px;
                border-radius: 50%;
            }
            .icon-nv {
                background: rgb(255,193,227);
                color:rgb(220,43,113);
            }
            .icon-nan {
                background: rgb(192,240,255);
                color: rgb(48, 141, 197);
            }
        }
        .brief {
            font-size: 12px;
            margin-top: 10px;
            font-size: 13px;
            color:#969696;
            width:200px;
            @include ellipsized;
        }
    }
}
.noComment {
    text-align: center;
    color:#969696;
}
.collect-more {
    text-align: center;
    a {
        display: inline-block;
        background: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 15px;
        color: #666;
        padding: 4px 16px;
        font-size: 15px;
        font-weight: 400;
        &:hover {
            background: rgba(223, 223, 223, 0.555);
        }
    }
}
</style>