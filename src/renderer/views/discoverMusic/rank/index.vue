<template>
    <div class="rank-wrapper">
        <div v-if="!loading">
            <div class="top-detail-wrapper">
                <h4 class="title">官方榜</h4>
                <div class="list-group-box" v-for="(item,index) in topList.slice(0,4)" :key="index">
                    <div class="cover-box">
                        <img :src="item.coverImgUrl" alt="">
                        <div class="create-time">{{item.updateTime | formatTimeMMDD}} 更新</div>
                        <div class="bg" :style="`background-image:url(${item.tracks[0].al.picUrl})`"></div>
                    </div>
                    <div class="list-box">
                        <ul class="list">
                            <li class="list-item"  v-for="(t,i) in item.tracks" :key="i">
                                <a href="#" class="item-box" @click="selectId(item.id)">
                                    <div class="index " :class="{highlight:i < 3}">{{i + 1}}</div>
                                    <div class="text">{{t.name}}</div>
                                    <div class="name">
                                        <span v-for="(ar,ind) in t.ar" :key="ar.id">
                                            {{ar.name}}
                                            <i v-if="ind !== t.ar.length-1"> / </i>
                                        </span>
                                    </div>
                                </a>
                            </li>
                            <li class="list-item">
                                <a href="#" class="item-box" id="viewAll" @click="selectId(item.id)">
                                    <div class="text">
                                        查看全部
                                        <i class="el-icon-arrow-right"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="top-list-wrapper">
                <h4 class="title">全球榜</h4>
                <el-row class="list-wrapper" :gutter="20">
                    <el-col class="list-group" :sm="6" :lg="6" :xl="6" v-for="(item,index) in topList.slice(4)" :key="index" @click.native="selectId(item.id)">
                        <div class="list-top-item">
                            <img :src="item.coverImgUrl" alt="">
                            <div class="play-count">
                                <i class="iconfont icon-bofang1"></i>
                                {{item.playCount | covertUnit}}
                            </div>
                        </div>
                        <p>{{item.name}}</p>
                    </el-col>
                </el-row>
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
import { rankMusicType } from '@/api/apiType'
import { covertUnit,formatTimeMMDD } from '@/utils/util'
import { DELAY } from '@/config'
import Spinner from 'vue-spinkit'

export default {
    data() {
        return {
            topList:[],
            loading: false
        }
    },
    mounted() {
        this.getTopDetail()
    },
    computed: {
    },
    methods: {
        async getTopDetail() {
            this.loading = true
            let [res] = await to(neteaseApi.topDetail())
            this.topList = res.list
            await this.getTopList(rankMusicType.newMusic)
            await this.getTopList(rankMusicType.soaringMusic)
            await this.getTopList(rankMusicType.originalMusic)
            await this.getTopList(rankMusicType.hotMusic)
            setTimeout(()=> {
                this.loading = false
            },DELAY)
        },
        async getTopList(idx) {
            let [res] = await to(neteaseApi.toplist({
               idx
            }))
            this.topList.forEach((item,index) => {
                if(item.id === res.playlist.id) {
                   this.topList[index].tracks = res.playlist.tracks.slice(0,5)
                }
            })
        },
        selectId(id) {
            this.$router.push(`/songlistdetail/index/${id}`)
        }
    },
    filters: {
        covertUnit,
        formatTimeMMDD
    },
    components: {
        Spinner
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
@import '@/assets/style/variables.scss';
.rank-wrapper {
    padding: 0 20px 20px;
    .loading {
      div {
        position: absolute;
        top:50%;
        left: 50%;
      }
    }
    .top-detail-wrapper {
        .title {
            margin: 0;
            height: 40px;
            line-height: 40px;
        }
        .list-group-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 10px;

            .cover-box {
                position: relative;
                width: 230px;
                height: 230px;
                overflow: hidden;
                .create-time {
                    position: absolute;
                    top: 148px;
                    left: 79px;
                    color: $color-white;
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
                .bg {
                    @include position(absolute,0,0,0,0,100%);
                    transform: scale(1.2);
                    background-size:100% 100%;
                    opacity: 0.5;
                    filter: blur(10px);
                }
            }
            .list-box {
                flex:1;
                margin-left: 30px;
                .list {
                    .list-item {
                        &:nth-child(odd) {
                            background: rgb(249, 249, 249);
                        }
                        .item-box {
                            flex:1;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            height: 46px;
                            line-height: 46px;
                            color:$color-base-grey;
                            transition: background 0.3s;
                            &#viewAll {
                                &:hover {
                                    background: none;
                                }
                            }
                            &:hover {
                                background: $background-undertintgrey;
                            }
                            .index {
                                text-align: center;
                                width: 50px;
                                &.highlight {
                                    color:$color-base-red;
                                }
                            }
                            .text {
                                flex: 1;
                                color:$color-base-black;
                            }
                            .name {
                                max-width: 230px;
                                @include ellipsized;
                                padding: 0 10px;
                                box-sizing: border-box;
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }
    }
    .top-list-wrapper {
        .title {
            margin: 0;
            height: 40px;
            line-height: 40px;
        }
        .list-wrapper {
            display: flex;
            flex-wrap: wrap;
            .list-group {
                cursor: pointer;
                margin-bottom: 20px;
                .list-top-item {
                    position: relative;
                    padding-bottom: 100%;
                    width: 100%;
                    border-radius: 4px;
                    overflow: hidden;
                    img {
                        transition: transform 0.3s;
                        &:hover {
                            transform: scale(1.3);
                        }
                        @include position(absolute,0,0,0,0,100%)
                    }
                    .play-count {
                        position: absolute;
                        top: 4px;
                        right: 5px;
                        color: #fff;
                        font-size: 14px;
                        i {
                            font-size: 14px;
                        }
                    }
                }
                p {
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
        }
    }
}
</style>