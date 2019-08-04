<template>
    <transition name="side-right">
        <div class="player-list-wrapper" v-if="showPlayerListDialog" @click="showPlayerListDialog = false">
            <div class="dialog" @click="cancelDefault">
                <div class="title-group">
                    <ul class="title-panel">
                        <li @click="clickTabs(true)" :class="{active:isShowTabs}">播放列表</li>
                        <li @click="clickTabs(false)" :class="{active:!isShowTabs}">历史记录</li>
                    </ul>
                </div>
                <div class="count">
                    <div>总{{isShowTabs?sequentList.length:playerHistory.length}}首</div>
                    <div class="clear" @click="clearRecord" v-if="!isShowTabs && playerHistory.length > 0">
                        <i class="el-icon-delete"></i>
                        <span>清空</span>
                    </div>
                </div>
                <el-scrollbar
                wrap-class="scrollbar-wrapper"
                style="height: calc(100% - 88px)"
                ref="scroll"
                >
                <ul class="list">
                    <li 
                    class="list-item" 
                    v-for="(item,index) in isShowTabs?sequentList:playerHistory"
                    :class="{'active':item.id === currentMusicItem.id}" 
                    @dblclick="togglePlaying(item,index)"
                    ref="listItem"
                    :key="index">
                        <div class="music-title ellipsiz play">
                            <i class="icon-living"></i>
                            <p>
                                <span>{{item.name}}</span>
                            </p>
                        </div>
                        <div class="muisc-singer ellipsiz play">
                            <p>
                                <span v-for="(ar,index) in item.artists" :key="index">
                                    {{ar.name}}
                                </span>
                            </p>
                        </div>
                        <el-tooltip effect="dark" :content="'来源：'+item.from" placement="bottom">
                            <div class="icon center play">
                                <i class="el-icon-paperclip"></i>
                            </div>
                        </el-tooltip>
                        <div class="duration center play">
                            <p>
                                <span v-if="isShowTabs">{{item.duration | formatTime}}</span>
                                <span v-else>{{item.date | formatterTime}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
                </el-scrollbar>
            </div>
        </div>
    </transition>
</template>

<script>
    import * as types from '@/store/mutation_types'
    import { formatTime,formatterTime } from "@/utils/util"
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    import { musicMixin } from '@/utils/mixin'

    export default {
        name:"PlayerList",
        mixins: [musicMixin],
        data() {
            return {
                isShowTabs: true,
            }
        },
        computed: {
            currentMusicItem() {
                return Object.assign({},this.$store.getters.currentMusic)
            },
            sequentList() {
                return this.$store.getters.sequentList
            },
            playerList() {
                return this.$store.getters.playerList
            },
            playMode() {
                return this.$store.getters.playMode
            },
            playerHistory() {
                return this.$store.getters.playerHistory
            },
            showPlayerListDialog: {
                get() {
                    return this.$store.getters.showPlayerListDialog
                },
                set(newFlag) {
                    this.$store.commit(`toggle/${types.TOGGLE_PLAYERLIST}`,newFlag)
                }
            },
        },
        mounted() {
        },
        methods: {
            cancelDefault() {
                window.event.stopPropagation()  // 解决父元素点击事件的问题，阻止事件冒泡即可
            },
            clickTabs(flag) {
                this.isShowTabs = flag
            },
            clearRecord() {
                if(!this.isShowTabs) {
                    this.$store.commit(`player/${types.CLEAR_HISTORY_LIST}`)
                }
            },
            async togglePlaying(item,index) {
                if(this.isShowTabs) {
                    try {
                    // 如果为随机播放时
                        if(this.playMode == 3) {
                            index = this.playerList.findIndex(items => items.id === this.sequentList[index].id)
                        }
                        await this.checkMusic(item.id)
                        this.$store.commit(`player/${types.SET_PLAY_CURRENT_INDEX}`,index)
                    } catch (error) {
                        this.$toast(err.response.data.message)
                    }
                }else {
                    this.$store.dispatch('player/replaceMusicPlayList',item)
                }
            }
        },
        filters: {
            formatTime,
            formatterTime
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";

.player-list-wrapper {
    @include position(fixed,0,0,60px,0);
    z-index: 1501;
    overflow: auto;
    margin: 0;
    .dialog{
        @include position(absolute,52px,0,0,auto,400px,auto);
        background: #fff;
        border-left: 1px solid #e9e9e9;
        .title-group {
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            .title-panel {
                display: flex;
                flex-direction: row;
                border-radius: 30px;
                border: 1px solid #e9e9e9;
                li {
                    border-radius: 30px;
                    padding: 7px 24px;
                    color: #999;
                    font-size: 13px;
                    cursor: pointer;
                    &.active{
                        background: rgba(230, 230, 230, 0.377);
                        color:#424242;
                    }
                    &:hover {
                        background: rgba(230, 230, 230, 0.377);
                        color:#424242;
                    }
                }
            }
        }
        .count {
            display: flex;
            flex-direction: row;
            padding: 5px 25px;
            box-sizing: border-box;
            justify-content: space-between;
            color: #969696;
            font-size: 15px;
            .clear {
                height: 18px;
                line-height: 18px;
                i {
                    vertical-align: top;
                    color: #424242;
                    font-size: 18px;
                }
            }
        }
        .list {
            .list-item {
                display: flex;
                height: 40px;
                box-sizing: border-box;
                font-size: 13px;
                cursor: pointer;
                transition: background 0.2s;
                color:#969696;
                &:nth-child(2n) {
                    background: #f9f9f9;
                }
                &:hover {
                    background: rgba(230, 230, 230, 0.377) !important
                }
                & > div {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    &:first-child{
                        padding: 0 10px 0 25px;
                        box-sizing: border-box;
                    }
                }
                &.active {
                    .play {
                        color:#b31212;
                    }
                    .music-title {
                        .icon-living {
                            position: absolute;
                            display: block;
                            left: 4px;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background-color: #f56c6c;
                            background-image:url(../../../assets/image/icon_living.png);
                            animation: momentAnchorLiving .6s steps(6) infinite;
                        }
                    }
                }
                .ellipsiz {
                    p {
                        @include ellipsized;
                    }
                }
                
                .center {
                    display: flex;
                    justify-content: center;
                }
                .music-title {
                    width: 150px;
                    position: relative;
                }
                .muisc-singer {
                    width: 150px;
                }
                .icon {
                    width: 30px;
                    i {
                        font-size: 16px;
                    }
                }
                .duration {
                    width: 60px;
                }
            }
        }
    }
}
@keyframes momentAnchorLiving {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -108px 0;
    }
}
</style>