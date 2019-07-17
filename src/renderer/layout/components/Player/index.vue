<template>
<div class="music-player-wrapper">
    <!-- mini播放器 -->
    <div class="mini-player-box">
        <div class="progress">
            <player-progress 
            :percent="percentage"
            @pbar-drag="dragProgress"
            @pbar-seek="clickProgress"
            >
            </player-progress>
        </div>
        <div class="mini-player-content">
            <div class="left">
                <div class="muisc-avatar">
                    <img src="http://p3.music.126.net/n6TbquCbGzIpJS9t6VGD2A==/109951164208864013.jpg" alt="">
                    <div class="mask-layer" @click="isShowPlayerDetail = !isShowPlayerDetail">
                        <i class="el-icon-top"></i>
                        <i class="el-icon-bottom"></i>
                    </div>
                </div>
                <div class="muisc-desc">
                    <p class="name">
                        <span>Last Night</span> - 
                        <span>EXILE TAKAHIRO</span>
                    </p>
                    <p class="duration">
                        <span>00:02</span> / 
                        <span>03:58</span>
                    </p>
                </div>
            </div>
            <div class="center">
                <div class="music-contorl">
                    <div>
                        <i class="iconfont icon-xin"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-ai10"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-bofang2"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-ai09"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-fenxiang"></i>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="music-tools">
                    <div>
                        <i class="iconfont icon-xindong"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-liebiao" style="font-size:14px"></i>
                    </div>
                    <div>
                        <a>词</a>
                    </div>
                    <div>
                        <i class="iconfont icon-icon--"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 全屏播放 -->
    <transition name="bottom-collapse" appear>
        <div class="full-player-box" v-if="isShowPlayerDetail">
            <div class="bg"></div>
            <div class="content">
                <div class="header">
                    <a href="#" class="hide" @click="isShowPlayerDetail = false">
                        <i class="el-icon-arrow-down"></i>
                    </a>
                </div>
                <div class="main">
                    <div class="music-cover">
                        <div class="cd">
                            <img src="http://p1.music.126.net/n6TbquCbGzIpJS9t6VGD2A==/109951164208864013.jpg" alt="">
                        </div>
                        <div class="tools">
                            <div class="like">
                                <i class="iconfont icon-xin"></i>
                            </div>
                            <div>
                                <i class="el-icon-folder-add"></i>
                            </div>
                            <div>
                                <i class="el-icon-download"></i>
                            </div>
                            <div>
                                <i class="iconfont icon-fenxiang"></i>
                            </div>
                        </div>
                    </div>
                    <div class="music-lyric">
                        <p class="name">
                            Cheap Thrills
                        </p>
                        <div class="mark">
                            <div class="album">
                                <span>专辑：</span> <span>Cheap Thrills (fe</span>
                            </div>
                            <div class="singer">
                                <span>歌手：</span><span>Sia / Sean Paul</span>
                            </div>
                            <div class="source">
                                <span>来源：</span><span>我喜欢的音乐</span>
                            </div>
                        </div>
                        <el-scrollbar
                            wrap-class="scrollbar-wrapper"
                            style="height:100%;"
                            ref="myScrollbar">
                            <div class="lyric">
                                <ul>
                                    <li class="active">让生活充满音乐</li>
                                    <li v-for="item in 80" :key="item">让生活充满音乐</li>
                                </ul>
                                <div class="no-lyriv">
                                    <p>让生活充满音乐</p>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="player">
                    <div class="player-">

                    </div>
                </div>
            </div>
        </div>
     </transition>
</div>
</template>

<script>
    import PlayerProgress from '@/components/PlayerProgress'
    import PlayerDetail from './player-detail'
    export default {
        data() {
            return {
                customColors: '#f56c6c',
                percentage:20,
                isShowPlayerDetail:false
            }
        },
        components: {
            PlayerProgress,
            PlayerDetail
        },
        created() {
            // setInterval(()=>{
            //     this.percentage++ 
            //     console.log(this.percentage)
            // },1000)
        },
        methods: {
            // 进度条拖拽时
            dragProgress(e) {
            },
            clickProgress(e) {
                console.log(e)
            },
            cla() {
                console.log(123)
            }
        },
        watch: {
            percentage(cur,old) {
                if(old === 100) {
                    clearInterval()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
.music-player-wrapper {
    height: 100%;
    position: relative;
    // mini播发器样式
    .mini-player-box {
        height: 100%;
        .progress {
            position: absolute;
            top: 0;
            left: 0;
            height: 3px;
            width: 100%;
        }
        .mini-player-content {
            display: flex;
            flex-direction: row;
            height: 100%;
            .left {
                width: 30%;
                display: flex;
                align-items: center;
                flex-direction: row;
                padding:0 10px;
                .muisc-avatar {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                    overflow: hidden;
                    &:hover {
                        img {
                            filter: blur(1px);
                        }
                        .mask-layer {
                            visibility: visible;
                        }
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .mask-layer {
                        @include position(absolute,0,0,0,0,100%,100%);
                        background: rgba(0,0,0,0.5);
                        z-index: 22;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        visibility: hidden;
                        i {
                            font-size: 16px;
                            color:#fff;
                        }
                    }
                }
                .muisc-desc {
                    flex: 1;
                    padding: 0 10px;
                    min-width: 200px;
                    box-sizing: border-box;
                    p {
                        margin-top: 5px;
                        @include ellipsized;
                    }
                    .name {
                        font-size: 14px;
                        color:#969696;
                        & > span:first-child {
                            color: #000;
                        }
                        & > span:last-child {
                            color: #969696;
                            font-size: 12px;
                        }
                    }
                    .duration {
                        color: #969696;
                        font-size: 12px;
                    }
                }
            }
            .center {
                flex: 1;
                display: flex;
                justify-content: center;
                .music-contorl {
                    width: 250px;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    & > div {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        &:nth-child(even) > i {
                            color:#f56c6c;
                            font-size: 21px;
                        }
                        &:nth-child(3) > i {
                            color:#f56c6c;
                            font-size: 48px;
                        }
                        i {
                            font-size: 18px;
                            cursor: pointer;
                            color: #666;
                        }
                    }
                }
            }
            .right {
                width: 30%;
                display: flex;
                justify-content: flex-end;
                .music-tools {
                    height: 100%;
                    width: 160px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 0 10px;
                    div {
                        flex: 1;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        i {
                            font-size: 23px;
                            color: #666;
                            cursor: pointer;

                        }
                    }
                }
            }
        }
    }
    // 全屏播放器样式
    .full-player-box {
        @include position(fixed,0,0,0,0,100%,100%);
        background: #999;
        // height: calc(100% - 60px);
        z-index: 1000;
        overflow: hidden;
        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background: url(http://p1.music.126.net/n6TbquCbGzIpJS9t6VGD2A==/109951164208864013.jpg) no-repeat;
            background-size: 120% 120%;
            background-position: center center;
            background-attachment: fixed;
            background-color: beige;
            transform: scale(1.2);
            filter: blur(20px);
            transition: background 5s;
        }
        .content {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            position: relative;
            .header {
                display: flex;
                height: 50px;
                -webkit-app-region: drag;
                padding: 20px 20px 0;
                box-sizing: border-box;
                .hide {
                    width: 30px;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 21px;
                    color: #969696;
                    -webkit-app-region: no-drag;
                    i {
                        font-size: 30px;
                    }
                }
            }
            .main {
                flex: 1;
                display: flex;
                flex-direction: row;
                height: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                > div {
                    flex: 1;
                }
                .music-cover {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-evenly;
                    .cd {
                        width: 350px;
                        height: 350px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            box-sizing: border-box;
                            border: 10px solid hsla(0,0%,100%,.1);
                            // animation: rotate 20s linear infinite;
                            // animation-play-state: paused;
                        }
                    }
                    .tools {
                        display: flex;
                        flex-direction: row;
                        width: 350px;
                        justify-content: space-around;
                        div {
                            width: 50px;
                            height: 50px;
                            line-height: 50px;
                            text-align: center;
                            border-radius: 50%;
                            color:#fff;
                            background: rgba(0,0,0,0.1);
                            i {
                                font-size: 22px;
                            }
                            &:hover {
                                background: rgba(0,0,0,0.2);
                            }
                        }
                    }
                }
                .music-lyric {
                    display: flex;
                    flex-direction: column;
                    color: #fff;
                    .name {
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .mark {
                        display: flex;
                        flex-direction: row;
                        font-size: 13px;
                        margin: 20px 0;
                        div > span:last-child {
                            color: #f56c6c;
                        }
                    }
                    .lyric {
                        flex: 1;
                        ul{
                            li {
                                line-height: 30px;
                                &.active {
                                    color: #f56c6c;
                                }
                            }
                        }
                    }
                }
            }
            .player {
                height: 150px;
            }
        }
    }
}
@keyframes rotate {
    0% {
        transform: rotate(0)
    }
    100% {
        transform: rotate(1turn)
    }
}
.bottom-collapse-enter-active,
.bottom-collapse-leave-active {
    transition: all 0.3s linear;
}
.bottom-collapse-enter,
.bottom-collapse-leave-to {
    opacity: 0;
    transform: translateY(100vh);
}
</style>