<template>
    <el-row class="music-player-wrapper">
        <el-col :span="8" style="height:100%">
            <div class="music-wrapper">
                <div class="muisc-avatar">
                    <img src="http://p3.music.126.net/n6TbquCbGzIpJS9t6VGD2A==/109951164208864013.jpg" alt="">
                    <div class="mask-layer">
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
                        <i class="iconfont icon-shangyishou"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-bofang"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-xiayishou"></i>
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
                        <i class="iconfont icon-plist"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-xindong"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-jingyin"></i>
                    </div>
                </div>
            </div>
        </el-col>
        <div class="progress">
            <el-progress :percentage="percentage" :color="customColors" :stroke-width="3" :text-inside="true"></el-progress>
        </div>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                customColors: '#f56c6c',
                percentage:50
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
.music-player-wrapper {
    height: 100%;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.3);
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
                    color:#b31212;
                    font-size: 23px;
                }
                &:nth-child(3) > i {
                    color:#b31212;
                    font-size: 35px;
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

</style>
<style>
.el-progress-bar {
    vertical-align: top;
}
.el-progress-bar__inner::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #f56c6c;
    right: -12px;
    top: -4px;
}
.el-progress-bar__outer {
    overflow: visible;
}
</style>
