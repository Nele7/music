<template>
<div class="music-player-wrapper">
    <!-- mini播放器 -->
    <div class="mini-player-box">
        <div class="progress">
            <player-progress 
            :percent="percentage"
            @pbar-seek="changeCurrentTime"
            >
            </player-progress>
        </div>
        <div class="mini-player-content">
            <div class="left">
                <div class="muisc-avatar">
                    <img :src="currentMusicItem && currentMusicItem.album.picUrl" alt="">
                    <div class="mask-layer" @click="isShowFullPlayer = true">
                        <i class="el-icon-top"></i>
                        <i class="el-icon-bottom"></i>
                    </div>
                </div>
                <div class="muisc-desc">
                    <p class="name">
                        <span>{{currentMusicItem && currentMusicItem.name || '让生活充满音乐'}}</span>
                        <span v-if="currentMusicItem"> - </span>
                        <span 
                        v-for="(singer,index) in currentMusicItem && currentMusicItem.artists"
                        :key="index"
                        >{{singer.name}}</span>
                    </p>
                    <p class="duration"  v-if="currentMusicItem">
                        <span>{{ currentTime | formatTimeMMSS}}</span> / 
                        <span>{{ currentMusicItem && currentMusicItem.duration | formatTimeMMSS}}</span>
                    </p>
                </div>
            </div>
            <div class="center">
                <div class="music-contorl">
                    <div>
                        <i class="iconfont" :class="likedIcon" @click="musicLiked"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-ai10" @click="prev"></i>
                    </div>
                    <div>
                        <i class="iconfont" :class="toggleIconPlay" @click="togglePlaying"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-ai09" @click="next"></i>
                    </div>
                    <div>
                        <i class="iconfont icon-fenxiang"></i>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="music-tools">
                    <player-mode @playMode="changePlayMode"></player-mode>
                    <div>
                        <i class="iconfont icon-liebiao" style="font-size:14px"></i>
                    </div>
                    <div>
                        <a>词</a>
                    </div>
                    <el-popover
                    placement="top"
                    :visible-arrow="false"
                    popper-class="play-sound"
                    height="100px"
                    >
                        <el-slider
                        v-model="soundPercent"
                        vertical
                        height="100px">
                        </el-slider>
                        <div slot="reference">
                            <i class="iconfont icon-icon--"></i>
                        </div>
                    </el-popover>
                </div>
            </div>
        </div>
    </div>
    <!-- 全屏播放 -->
    <transition name="bottom-collapse" appear>
        <div class="full-player-box" v-if="isShowFullPlayer">
            <div class="bg" :style="{backgroundImage:`url(${currentMusicItem.album.picUrl})`}"></div>
            <div class="content">
                <div class="header">
                    <a href="#" class="hide" @click="isShowFullPlayer = false">
                        <i class="el-icon-arrow-down"></i>
                    </a>
                </div>
                <div class="main">
                    <div class="music-cover">
                        <div class="cd" :class="togglePlayAnimation">
                            <img :src="currentMusicItem.album.picUrl" alt="">
                        </div>
                        <div class="tools">
                            <div class="like" @click="musicLiked">
                                <i class="iconfont" :class="likedIcon"></i>
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
                        <div class="music-lyric-box">
                            <p class="name">
                                {{currentMusicItem.name}}
                            </p>
                            <div class="mark">
                                <div class="album">
                                    <p>
                                        <span>专辑：</span> 
                                        <span class="active">{{currentMusicItem.album.name}}</span>
                                    </p>
                                </div>
                                <div class="singer">
                                    <p>
                                        <span>歌手：</span>
                                    <span 
                            v-for="(singer,index) in currentMusicItem && currentMusicItem.artists"
                            :key="index"
                            class="active"
                            >{{singer.name}}</span>
                                    </p>
                                </div>
                                <div class="source">
                                    <p>
                                        <span>来源：</span><span class="active">我喜欢的音乐</span>
                                    </p>
                                    
                                </div>
                            </div>
                            <el-scrollbar
                                wrap-class="scrollbar-wrapper"
                                style="height:500px;"
                                ref="myScrollbar">
                                <div class="lyric">
                                    <ul v-if="lyric">
                                        <!-- <li class="active">让生活充满音乐</li> -->
                                        <li v-for="(item,index) in lyric.lines" :key="index" :class="{active:currentLyricIndex===index}">{{item.txt}}</li>
                                    </ul>
                                    <div class="no-lyriv" v-if="!lyric">
                                        <p>让生活充满音乐</p>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="player">
                        <div class="duration" v-if="currentMusicItem">
                            <div>{{ currentTime | formatTimeMMSS}}</div>
                            <div>{{ currentMusicItem && currentMusicItem.duration | formatTimeMMSS}}</div>
                        </div>
                        <div class="progress">
                            <el-slider v-model="percentage" :show-tooltip="false" @change="changeCurrentTime"></el-slider>
                        </div>
                        <div class="control">
                            <div class="left">
                                <div>
                                    <i class="iconfont icon-icon--"></i>
                                </div>
                            </div>
                            <div class="center">
                                <div class="music-contorl">
                                    <div>
                                        <i class="iconfont icon-ai10" @click="prev"></i>
                                    </div>
                                    <div>
                                        <i class="iconfont" :class="toggleFullPlayIcon" @click="togglePlaying"></i>
                                    </div>
                                    <div>
                                        <i class="iconfont icon-ai09" @click="next"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="right">
                                <el-popover
                                placement="top"
                                :visible-arrow="false"
                                popper-class="play-full-sound"
                                height="100px"
                                >
                                    <el-slider
                                    v-model="soundPercent"
                                    vertical
                                    height="100px">
                                    </el-slider>
                                    <div slot="reference">
                                        <i class="iconfont icon-icon--"></i>
                                    </div>
                                </el-popover>
                                <div style="margin-left:10px">
                                    <i class="iconfont icon-liebiao" style="font-size:15px"></i>
                                </div>
                                <player-mode @playMode="changePlayMode"></player-mode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </transition>
    <audio 
    ref="musicAudio"
    :src="musicURL"
    @canplay="start"
    @ended="ended"
    @timeupdate="updataTime"
    @error="musicError"
    ></audio>
</div>
</template>

<script>
    import { neteaseApi } from "@/api/"
    import { NOSELECT_MUSIC_LIST } from '@/config/'
    import * as types from '@/store/mutation_types'
    import to from "@/utils/await-to.js"
    import { formatTimeMMSS,shuffle } from '@/utils/util'
    import PlayerProgress from '@/components/PlayerProgress'
    import PlayerMode from './PlayerMode'
    import {mapActions} from 'vuex'
    import Lyric from 'lyric-parser'
    export default {
        data() {
            return {
                customColors: '#f56c6c',
                percentage:0, // 歌曲进度条
                isShowFullPlayer:false,
                soundPercent:13, // 调节声音
                musicURL: null,           // 音乐地址
                musicStart: false,
                currentTime: 0,     // 当前播放时间
                lyric:null,
                currentLyricIndex:0
            }
        },
        mounted() {
            if(this.currentMusicItem&& this.currentMusicItem.id) {
                // this.getSongURL()
                this.getlyric()
            }
            // this.$store.commit(`player/${types.SET_PLAY_STATUS}`,false)
        },
        computed: {
            currentMusicItem() {
                return Object.assign({},this.$store.getters.currentMusic)
            },
            playStatus() {
                return this.$store.getters.playerStatus
            },
            playCurrentIndex() {
                return this.$store.getters.playCurrentIndex
            },
            playerList() {
                return this.$store.getters.playerList
            },
            playMode() {
                return this.$store.getters.playMode
            },
            sequentList() {
                return this.$store.getters.sequentList
            },
            toggleIconPlay() {
                return this.playStatus ? 'icon-zanting1': 'icon-bofang2'
            },
            toggleFullPlayIcon() {
                return this.playStatus ? 'icon-zanting' : 'icon-bofang'
            },
            togglePlayAnimation() {
                return this.playStatus ? 'play' : 'play pause'
            },
            userlike() {
                if(this.currentMusicItem) {
                    return this.$store.state.user.userlikelist.includes(this.currentMusicItem.id)
                }
            },
            likedIcon() {
                if(this.currentMusicItem) {
                    return this.userlike ? 'icon-hongxin liked' : 'icon-xin'
                }
            }
        },
        methods: {
            changeCurrentTime(e) {
                if(this.currentMusicItem){
                    this.$refs.musicAudio.currentTime = ((this.currentMusicItem.duration * e) / 100) / 1000
                }
            },
            // 播放暂停按钮
            togglePlaying() {
                if(this.currentMusicItem) {
                    if (this.currentMusicItem.id && this.musicURL === null) {
                        this.getSongURL()
                    }
                    this.lyric.togglePlay()
                    this.$store.commit(`player/${types.SET_PLAY_STATUS}`,!this.playStatus)
                    const audio = this.$refs.musicAudio
                    this.$nextTick(() => {
                        this.playStatus ? audio.play() : audio.pause()
                    })
                }else {
                    this.$toast(NOSELECT_MUSIC_LIST)
                }
            },
            // 获取音乐的播放地址
            async getSongURL() {
                let [res] = await to(neteaseApi.songURL({
                    id:this.currentMusicItem && this.currentMusicItem.id
                }))
                this.musicURL = this.currentMusicItem.url = res.data[0].url
            },
            start(e) {
                this.musicStart = true
                console.log('开始播放')
            },
            ended(e) {
                console.log('播放结束')
                if(this.playMode == 1) {
                    this.$refs.musicAudio.currentTime = 0
                    this.$refs.musicAudio.play()
                }else {
                    this.next()
                }
            },
            prev() {
                if(!this.musicStart) return
                let playerListlength = this.playerList.length - 1
                let index = this.playCurrentIndex - 1 === -1 ? playerListlength :  Number(this.playCurrentIndex) - 1
                this.$store.commit(`player/${types.SET_PLAY_CURRENT_INDEX}`,index)
                if(!this.playStatus) {
                    this.$store.commit(`player/${types.SET_PLAY_STATUS}`,true)
                }
                this.musicStart = false
            },
            next() {
                if(!this.musicStart) return
                let playerListlength = this.playerList.length - 1
                let index = this.playCurrentIndex >= playerListlength ? 0 : Number(this.playCurrentIndex) + 1
                this.$store.commit(`player/${types.SET_PLAY_CURRENT_INDEX}`,index)
                if(!this.playStatus) {
                    this.$store.commit(`player/${types.SET_PLAY_STATUS}`,true)
                }
                this.musicStart = false
            },
            musicError() {
                // console.log(123)
                this.musicStart = true
                this.currentMusicItem.url = `http://music.163.com/song/media/outer/url?id=${
                    this.currentMusicItem.id
                }.mp3`
            },
            updataTime(e) {
                // currentTime 秒数
                let currentTime = this.$refs.musicAudio.currentTime
                this.currentTime = currentTime * 1000
                if(this.lyric) {
                    this.lyric.seek(currentTime)
                }
            },
            musicLiked() {
                if(this.currentMusicItem) {
                    this.like()
                }else {
                    this.$toast(NOSELECT_MUSIC_LIST)
                }
            },
            async like() {
                let id = this.currentMusicItem.id
                let like = this.userlike
                let [res] = await to(neteaseApi.like({
                    id,
                    like
                }))
                if(!like) {
                    this.insertUserLikelist(id)
                    this.$toast('已添加到我喜欢的音乐')
                }else {
                    this.deleteUserLikelist(id)
                    this.$toast('取消喜欢成功')
                }
            },
            // 播放模式
            changePlayMode(mode) {
                // 0 列表循环 1 单曲循环  2 顺序播放 3 随机播放
                this.$store.commit(`player/${types.SET_PLAY_MODE}`,mode)
                let list = []
                let index = -1
                if(mode === 3) {
                    // 打乱数组playlist
                    list = shuffle(this.playerList)
                }else {
                    list = this.sequentList
                }
                index = list.findIndex(item => item.id === this.currentMusicItem.id)
                this.$store.commit(`player/${types.SET_PLAY_CURRENT_INDEX}`,index)
                this.$store.commit(`player/${types.SET_PLAY_LIST}`,list)
            },
            // 获取歌词
            async getlyric() {
                let [res] = await to(neteaseApi.lyric({
                    id: this.currentMusicItem && this.currentMusicItem.id
                }))
                if(res.nolyric || (res.lrc && res.lrc.lyric === '')) {
                    this.lyric = false
                    this.currentMusicItem.lyric = false
                }else {
                    this.currentMusicItem.lyric = res.lrc.lyric
                    this.currentLyricIndex = 0
                    this.lyric = new Lyric(res.lrc.lyric, this.handlerLyric)
                    // if (this.playStatus) {
                    //     this.lyric.play()
                    // }
                }
                console.log(this.lyric)
            },
            handlerLyric({lineNum, txt}) {
                console.log(lineNum)
                this.currentLyricIndex = lineNum
            },
            ...mapActions('user', ['insertUserLikelist', 'deleteUserLikelist'])
        },
        watch: {
            musicURL(n,o) {
                if(n !== null) {
                    if(this.playStatus) {
                        this.$nextTick(() => {
                            this.$refs.musicAudio.play()
                        })
                    }
                }
            },
            currentMusicItem(n,o) {
                // if(n) {
                    console.log(n)
                    if(this.lyric && this.playStatus) {
                        this.lyric.stop()
                    }
                    if(n.id) {
                        this.musicURL = n.url
                        this.getSongURL()
                        this.getlyric()
                        this.$nextTick(() => {
                            this.$refs.musicAudio.play()
                        })
                    }
                // }
            },
            currentTime(newTime) {
                this.percentage = (newTime / this.currentMusicItem.duration) * 100
            }
        },
        filters: {
            formatTimeMMSS 
        },
        components: {
            PlayerProgress,
            PlayerMode
        }
    }
</script>

<style lang="scss" scoped>
@import '@/assets/style/mixin.scss';
$color: rgba(255,255,255,0.5);
$color-hover: rgba(255,255,255,0.8);
$color-bg:rgba(255,255,255,0.1);
$bg:rgba(0, 0, 0, 0.5);
$tools-bg:rgba(0, 0, 0, 0.1);
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
                            &.liked {
                                color: #f56c6c;
                            }
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
        background: $bg;
        z-index: 1500;
        overflow: hidden;
        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: 120% 120%;
            background-position: center center;
            background-attachment: fixed;
            background-color: #666;
            transform: scale(1.2);
            transition: background 5s;
            filter: blur(20px);
        }
        .content {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background: $bg;
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
                    color: $color;
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
                        &.play {
                            animation: rotate 20s linear infinite;
                        }
                        &.pause {
                            animation-play-state: paused;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            box-sizing: border-box;
                            border: 10px solid $color-bg;
                            
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
                            color:$color;
                            background: $tools-bg;
                            cursor: pointer;
                            i {
                                font-size: 22px;
                                &.liked {
                                    color:#f56c6c;
                                }
                            }
                            &:hover {
                                background: $color-bg;
                                color:$color-hover;
                            }
                        }
                    }
                }
                .music-lyric {
                    display: flex;
                    width: 50%;
                    .music-lyric-box {
                        display: flex;
                        flex-direction: column;
                        width: 500px;
                        height: 100%;
                        color: rgba(255, 255, 255, 0.8);
                    }
                    .name {
                        font-size: 20px;
                        font-weight: bold;
                    }
                    .mark {
                        display: flex;
                        min-width: 450px;
                        font-size: 13px;
                        margin: 20px 0;
                        .album {
                            width: 170px;
                        }
                        .singer {
                            width: 150px;
                        }
                        .source {
                            width: 150px;
                        }
                        div {
                            padding: 0 10px;
                            box-sizing: border-box;
                            p {
                                @include ellipsized;    
                            }
                            .active {
                                color: #f56c6c;
                                cursor: pointer;
                            }
                        }
                    }
                    .lyric {
                        flex: 1;
                        ul{
                            padding: 0 10px;
                            box-sizing: border-box;
                            li {
                                line-height: 30px;
                                text-align: center;
                                &.active {
                                    color: #f56c6c;
                                }
                            }
                        }
                    }
                }
            }
            .footer {
                display: flex;
                flex-direction: column-reverse;
                padding: 0 20px;
                height: 150px;
                .player {
                    display: flex;
                    flex-direction: column;
                    height: 71px;
                    width: 100%;
                    
                    .duration {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        color: $color;
                        font-size: 11px;
                        line-height: 11px;
                    }
                    .progress {
                        margin-top: 5px;
                    }
                    .control {
                        flex: 1;
                        display: flex;
                        flex-direction: row;
                        .left {
                            width: 30%;
                            display: flex;
                            align-items: center;
                            color: $color;
                            .iconfont {
                                font-size: 22px;
                            }
                        }
                        .center {
                            flex: 1;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .music-contorl {
                                width: 200px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                height: 100%;
                                color: $color;
                                div:nth-child(odd) i{
                                    font-size: 18px;
                                }
                                i {
                                    font-size: 35px;
                                }
                            }
                        }
                        .right {
                            width: 30%;
                            display: flex;
                            flex-direction: row-reverse;
                            align-items: center;
                            color: $color;
                            padding-right: 30px;
                            box-sizing: border-box;
                            div {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100%;
                                i {
                                    width: 40px;
                                    font-size: 22px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
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
</style>