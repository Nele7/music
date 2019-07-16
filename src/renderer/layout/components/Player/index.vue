<template>
    <el-row class="music-player-wrapper">
        <el-col :span="24">
            <player-progress 
            :percent="percentage"
            @pbar-drag="dragProgress"
            @pbar-seek="clickProgress"
            >
            </player-progress>
        </el-col>
        <el-col :span="8" style="height:100%">
            <div class="music-wrapper">
                <div class="muisc-avatar">
                    <img src="http://p3.music.126.net/n6TbquCbGzIpJS9t6VGD2A==/109951164208864013.jpg" alt="">
                    <div class="mask-layer" @click="isShowPlayerDetail = true">
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
        </el-col>
        <el-col :span="8" style="height:100%">
            <div class="muisc-contorl-wrapper">
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
        </el-col>
        <el-col :span="8" style="height:100%">
            <div class="music-tools-wrapper">
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
                        <!-- <i class="iconfont icon-jingyin"></i> -->
                        <i class="iconfont icon-icon--"></i>
                    </div>
                </div>
            </div>
        </el-col>
        <transition name="bottom-collapse">
            <player-detail v-if="isShowPlayerDetail"></player-detail>
        </transition>

    </el-row>
    
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
    // box-shadow: 0 0 6px 0 rgba(0,0,0,0.3);
    position: relative;
    .music-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
        padding:0 10px;
        .muisc-avatar {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 5px;
            overflow: hidden;
            transition: all 0.3s;
            cursor: pointer;

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
                z-index: 99;
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
    .muisc-contorl-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        .music-contorl {
            width: 250px;
            height: 100%;
            display: flex;
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
    .music-tools-wrapper {
        height: 100%;
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
    .progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 3px;
        width: 100%;
    }
}
.bottom-collapse-enter-active,
.bottom-collapse-leave-active {
    transition: all 0.3s linear;
}
.bottom-collapse-enter,
.bottom-collapse-leave-to {
    transform: translateY(100vh);
}
.top-collapse-enter-active,
.top-collapse-leave-active {
    transition: all 0.3s linear;
}
.top-collapse-enter,
.top-collapse-leave-to {
    transform: translateY(100vh);
}
</style>