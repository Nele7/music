<template>
    <div class="music-player-wrapper">
        <!-- mini播放器 -->
        <div class="mini-player-box">
            <div class="progress">
                <player-progress :percent="percentage" @pbar-seek="changeCurrentTime"></player-progress>
            </div>
            <div class="mini-player-content">
                <div class="left">
                    <div class="muisc-avatar">
                        <img :src="currentMusicItem && currentMusicItem.album.picUrl" alt />
                        <div class="mask-layer" @click="openFullPlayer">
                            <i class="el-icon-top"></i>
                            <i class="el-icon-bottom"></i>
                        </div>
                    </div>
                    <div class="muisc-desc">
                        <p class="name">
                            <span>{{currentMusicItem && currentMusicItem.name}}</span>
                            <span v-if="currentMusicItem.id">-</span>
                            <span
                                v-for="(singer,index) in currentMusicItem && currentMusicItem.artists"
                                :key="index"
                            >{{singer.name}}</span>
                        </p>
                        <p class="duration" v-if="currentMusicItem.id">
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
                        <div @click="showPlayerListDialog = !showPlayerListDialog">
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
                                @change="changeCurrentSound"
                                height="100px"
                            ></el-slider>
                            <div slot="reference">
                                <i class="iconfont icon-icon--" v-if="soundPercent > 0"></i>
                                <i class="iconfont icon-jingyin" v-if="soundPercent === 0"></i>
                            </div>
                        </el-popover>
                    </div>
                </div>
            </div>
        </div>
        <!-- 全屏播放 -->
        <transition name="slide-bottom" appear>
            <div class="full-player-box" v-show="isShowFullPlayer">
                <div class="bg" :style="{backgroundImage:`url(${currentMusicItem.album.picUrl})`}"></div>
                <div class="content">
                    <div class="header">
                        <a href="#" class="hide" @click="isShowFullPlayer = false">
                            <i class="el-icon-arrow-down"></i>
                        </a>
                    </div>
                        <div class="main" ref="main">
                            <div class="core" ref="core">
                                <div class="music-cover">
                                    <div class="cd" :class="togglePlayAnimation">
                                        <img :src="currentMusicItem.album.picUrl" alt />
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
                                    <div class="hint">
                                        <p>
                                            下拉加载评论噢
                                            <i class="el-icon-arrow-down"></i>
                                        </p>
                                    </div>
                                </div>
                                <div class="music-lyric">
                                    <div class="music-lyric-box">
                                        <p class="name">{{currentMusicItem.name}}</p>
                                        <div class="mark" v-if="currentMusicItem.id">
                                            <div class="album">
                                                <p>
                                                    <span>专辑：</span>
                                                    <span class="active" @click="goAlbumDetail(currentMusicItem.album.id)">{{currentMusicItem.album.name}}</span>
                                                </p>
                                            </div>
                                            <div class="singer">
                                                <p>
                                                    <span>歌手：</span>
                                                    <span
                                                        v-for="(singer,index) in currentMusicItem && currentMusicItem.artists"
                                                        :key="index"
                                                        class="active"
                                                        @click="goSingerDetail(singer.id)"
                                                    >{{singer.name}}</span>
                                                </p>
                                            </div>
                                            <div class="source">
                                                <p>
                                                    <span>来源：</span>
                                                    <span
                                                        class="active"
                                                    >{{currentMusicItem && currentMusicItem.from}}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <el-scrollbar
                                            wrap-class="lyric-scrollbar-wrapper"
                                            style="height:500px;"
                                            v-if="lyric"
                                        >
                                            <div class="lyric">
                                                <ul>
                                                    <!-- <li class="active">让生活充满音乐</li> -->
                                                    <li
                                                        v-for="(item,index) in lyric.lines"
                                                        :key="index"
                                                        :class="{active:currentLyricIndex===index}"
                                                        ref="lyricLine"
                                                    >{{item.txt}}</li>
                                                </ul>
                                            </div>
                                        </el-scrollbar>
                                        <div class="no-lyric" v-if="!lyric">
                                            <p>亲爱的，该歌曲暂无歌词噢~</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="comment">
                                <music-comment :id="currentMusicItem.id" @selectName="selectName"></music-comment>
                            </div>
                            
                        </div>
                    
                        <div class="footer">
                            <div class="player">
                                <div class="duration" v-if="currentMusicItem">
                                    <div>{{ currentTime | formatTimeMMSS}}</div>
                                    <div>{{ currentMusicItem && currentMusicItem.duration | formatTimeMMSS}}</div>
                                </div>
                                <div class="progress">
                                    <el-slider
                                        v-model="percentage"
                                        :show-tooltip="false"
                                        @change="changeCurrentTime"
                                    ></el-slider>
                                </div>
                                <div class="control">
                                    <div class="left">
                                        <div @click="loadComment">
                                            <i class="el-icon-chat-dot-square"></i>
                                        </div>
                                    </div>
                                    <div class="center">
                                        <div class="music-contorl">
                                            <div>
                                                <i class="iconfont icon-ai10" @click="prev"></i>
                                            </div>
                                            <div>
                                                <i
                                                    class="iconfont"
                                                    :class="toggleFullPlayIcon"
                                                    @click="togglePlaying"
                                                ></i>
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
                                                @change="changeCurrentSound"
                                                height="100px"
                                            ></el-slider>
                                            <div slot="reference">
                                                <i class="iconfont icon-icon--" v-if="soundPercent > 0"></i>
                                                <i
                                                    class="iconfont icon-jingyin"
                                                    v-if="soundPercent === 0"
                                                ></i>
                                            </div>
                                        </el-popover>
                                        <div
                                            style="margin-left:10px"
                                            @click="showPlayerListDialog = !showPlayerListDialog"
                                        >
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

        <player-list></player-list>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import { NOSELECT_MUSIC_LIST } from '@/config/'
import { mapActions } from 'vuex'
import { formatTimeMMSS, shuffle } from '@/utils/util'
import * as types from '@/store/mutation_types'
import to from "@/utils/await-to.js"
import PlayerProgress from '@/components/PlayerProgress'
import PlayerMode from './PlayerMode/'
import playerList from './PlayerList/'
import MusicComment from './MusicComment/'
import Lyric from 'lyric-parser'
const SOUND = '__sound__'
export default {
    data() {
        return {
            customColors: '#f56c6c',      // 自定义颜色
            percentage: 0,                // 歌曲进度条
            isShowFullPlayer: false,      // 是否全屏显示播放
            soundPercent: 50,             // 声音进度条
            musicURL: null,               // 音乐地址
            musicStart: true,             // 开始播放时事件
            currentTime: 0,               // 当前播放的时间
            lyric: null,                  // 歌词实例
            currentLyricIndex: 0,         // 歌词当前索引
        }
    },
    mounted() {
        if (this.currentMusicItem && this.currentMusicItem.id) {
            this.getlyric()
            this.$refs.musicAudio.volume = JSON.parse(localStorage.getItem(SOUND)).volume || 0.5
            this.soundPercent = JSON.parse(localStorage.getItem(SOUND)).percent || this.soundPercent
            document.onkeydown = (e) => {
                if(e.keyCode === 32) {
                    this.togglePlaying()
                }else if(e.ctrlKey && e.keyCode === 39) {
                    console.log('xiayisojhou ')
                    this.next()
                }else if(e.ctrlKey && e.keyCode === 37){
                    this.prev()
                }else if(e.keyCode === 33) {
                    if(this.soundPercent === 100) {
                        this.$toast('已经是最大音量了噢...')
                        return
                    }
                    this.soundPercent+=10
                }else if(e.keyCode === 34) {
                    if(this.soundPercent === 0) {
                        this.$toast('已经是最小音量了噢...')
                        return
                    }
                    this.soundPercent-=10
                }else if(e.ctrlKey && e.keyCode === 76) {
                    this.musicLiked()
                }
            } 
        }
    },
    computed: {
        currentMusicItem() {
            return Object.assign({}, this.$store.getters.currentMusic)
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
        showPlayerListDialog: {
            get() {
                return this.$store.getters.showPlayerListDialog
            },
            set(newFlag) {
                this.$store.commit(`toggle/${types.TOGGLE_PLAYERLIST}`, newFlag)
            }
        },
        toggleIconPlay() {
            return this.playStatus ? 'icon-zanting1' : 'icon-bofang2'
        },
        toggleFullPlayIcon() {
            return this.playStatus ? 'icon-zanting' : 'icon-bofang'
        },
        togglePlayAnimation() {
            return this.playStatus ? 'play' : 'play pause'
        },
        userlike() {
            if (this.currentMusicItem) {
                return this.$store.state.user.userlikelist.includes(this.currentMusicItem.id)
            }
        },
        likedIcon() {
            if (this.currentMusicItem) {
                return this.userlike ? 'icon-hongxin liked' : 'icon-xin'
            }
        }
    },
    methods: {
        selectName(userId) {
            this.$router.push(`/userdetail/${userId}`)
            this.isShowFullPlayer = false
        },
        goAlbumDetail(albumId) {
            this.$router.push(`/albumdetail/${albumId}`)
            this.isShowFullPlayer = false
        },
        goSingerDetail(singerId) {
            this.$router.push(`/singerdetail/${singerId}`)
            this.isShowFullPlayer = false
        },
        openFullPlayer() {
            if (this.$store.getters.showPlayerListDialog) {
                this.$store.commit(`toggle/${types.TOGGLE_PLAYERLIST}`, false)
            }
            this.isShowFullPlayer = true
        },
        changeCurrentTime(e) {
            if (this.currentMusicItem.id) {
                const currentTime = ((this.currentMusicItem.duration * e) / 100)
                this.$refs.musicAudio.currentTime = currentTime / 1000
                if (this.lyric) {
                    this.lyric.seek(currentTime)
                }
            }
        },
        changeCurrentSound(e) {
            if (this.currentMusicItem.id) {
                let sound = {
                    volume: e / 100,
                    percent: e
                }
                this.$refs.musicAudio.volume = sound.volume  // range [0,1]
                this.soundPercent = sound.percent
                localStorage.setItem(SOUND, JSON.stringify(sound))
            }
        },
        togglePlaying() {
            if (this.currentMusicItem.id) {
                if (this.currentMusicItem.id && this.musicURL === null) {
                    this.getSongURL()
                }
                this.$store.commit(`player/${types.SET_PLAY_STATUS}`, !this.playStatus)
                if (this.lyric) {
                    this.lyric.togglePlay()
                }
                const audio = this.$refs.musicAudio
                this.$nextTick(() => {
                    this.playStatus ? audio.play() : audio.pause()
                })
            } else {
                this.$toast(NOSELECT_MUSIC_LIST)
            }
        },
        async getSongURL() {
            let [res] = await to(neteaseApi.songURL({
                id: this.currentMusicItem && this.currentMusicItem.id
            }))
            this.musicURL = this.currentMusicItem.url = res.data[0].url
        },
        start(e) {
            this.musicStart = true
            console.log('开始播放')
        },
        ended(e) {
            console.log('播放结束')
            if (this.playMode == 1) {
                this.$refs.musicAudio.currentTime = 0
                this.$refs.musicAudio.play()
            } else {
                this.next()
            }
        },
        prev() {
            // 下一首时，播放列表数组下标加 1 
            if (!this.musicStart) return
            let playerListlength = this.playerList.length - 1
            let index = this.playCurrentIndex - 1 === -1 ? playerListlength : Number(this.playCurrentIndex) - 1
            this.$store.commit(`player/${types.SET_PLAY_CURRENT_INDEX}`, index)
            if (!this.playStatus) {
                this.$store.commit(`player/${types.SET_PLAY_STATUS}`, true)
            }
            this.musicStart = false
        },
        next() {
            if (!this.musicStart) return
            let playerListlength = this.playerList.length - 1
            let index = this.playCurrentIndex >= playerListlength ? 0 : Number(this.playCurrentIndex) + 1
            this.$store.commit(`player/${types.SET_PLAY_CURRENT_INDEX}`, index)
            if (!this.playStatus) {
                this.$store.commit(`player/${types.SET_PLAY_STATUS}`, true)
            }
            this.musicStart = false
        },
        musicError() {
            this.musicStart = true
            this.currentMusicItem.url = `http://music.163.com/song/media/outer/url?id=${this.currentMusicItem.id}.mp3`
        },
        updataTime(e) {
            // 监听timeupdate
            // currentTime 单位为秒数，后台返回的duration为毫秒数，需要转换
            let currentTime = this.$refs.musicAudio.currentTime
            this.currentTime = currentTime * 1000
        },
        musicLiked() {
            // i like music items
            if (this.currentMusicItem) {
                this.like()
            } else {
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
            if (!like) {
                this.insertUserLikelist(id)
                this.$toast('已添加到我喜欢的音乐')
            } else {
                this.deleteUserLikelist(id)
                this.$toast('取消喜欢成功')
            }
        },
        changePlayMode(mode) {
            // 0 列表循环 1 单曲循环  2 顺序播放 3 随机播放
            this.$store.commit(`player/${types.SET_PLAY_MODE}`, mode)
            let list = []
            let index = -1
            if (mode === 3) {
                list = shuffle(this.playerList)
            } else {
                list = this.sequentList
            }
            // 为随机播放时，点击歌曲播放时，找到该歌曲的索引
            index = list.findIndex(item => item.id === this.currentMusicItem.id)
            this.$store.commit(`player/${types.SET_PLAY_CURRENT_INDEX}`, index)
            this.$store.commit(`player/${types.SET_PLAY_LIST}`, list)
        },
        async getlyric() {
            let [res] = await to(neteaseApi.lyric({
                id: this.currentMusicItem && this.currentMusicItem.id
            }))
            if (res.nolyric || (res.lrc && res.lrc.lyric === '')) {
                this.lyric = false
                this.currentMusicItem.lyric = false
            } else {
                this.currentMusicItem.lyric = res.lrc.lyric
                this.currentLyricIndex = 0
                this.lyric = new Lyric(res.lrc.lyric, this.handlerLyric)
                // console.log(this.lyric)
                if (this.playStatus) {
                    this.lyric.play()
                }
            }
        },
        handlerLyric({ lineNum, txt }) {
            this.currentLyricIndex = lineNum
            const scrollDom = document.querySelector('.lyric-scrollbar-wrapper')
            if (lineNum < 5) {
                // 当小于5时，滚动条不滚动
                scrollDom.scrollTop = 0
            } else {
                // 大于5时，滚动条向上滚动一个li的高度
                if (this.$refs.lyricLine[lineNum - 5]) {
                    scrollDom.scrollTop = this.$refs.lyricLine[lineNum - 5].offsetTop
                }
            }
        },
        loadComment() {
            let h = this.$refs.core.clientHeight
            this.$refs.main.scrollTop = h
            console.log(this.$refs.main)
        },
        ...mapActions('user', ['insertUserLikelist', 'deleteUserLikelist'])
    },
    watch: {
        musicURL(n, o) {
            if (n !== null) {
                if (this.playStatus) {
                    this.$nextTick(() => {
                        this.$refs.musicAudio.play()
                    })
                }
            }
        },
        currentMusicItem(n, o) {
            if (this.lyric && this.playStatus) {
                this.lyric.stop()
            }
            if (n.id) {
                this.musicURL = n.url
                this.getSongURL()
                this.getlyric()
                if (!this.playStatus) {
                    this.$nextTick(() => {
                        this.$refs.musicAudio.play()
                        this.$store.commit(`player/${types.SET_PLAY_STATUS}`, true)
                    })
                }

            }
            // 添加到本地
            let _n = Object.assign({ date: (new Date()).valueOf() }, n)
            this.$store.dispatch('player/savePlayerHistoryRecord', _n)
        },
        currentTime(newTime) {
            this.percentage = (newTime / this.currentMusicItem.duration) * 100
        },
        soundPercent(n) { // 监听音量变化
            this.changeCurrentSound(n)
        }
        // 也可以监听播放状态，为播放还是暂停
        // playStatus(status) {
        //     const audio = this.$refs.musicAudio
        //     this.$nextTick(() => {
        //         status ? audio.play() : audio.pause()
        //     })
        // }
    },
    filters: {
        formatTimeMMSS
    },
    components: {
        PlayerProgress,
        PlayerMode,
        playerList,
        MusicComment
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
$color: rgba(255, 255, 255, 0.5);
$color-hover: rgba(255, 255, 255, 0.8);
$color-bg: rgba(255, 255, 255, 0.1);
$bg: rgba(0, 0, 0, 0.5);
$tools-bg: rgba(0, 0, 0, 0.1);
.music-player-wrapper {
    height: 100%;
    position: relative;
    // mini播发器样式
    .mini-player-box {
        height: 100%;
        color:$color-text;
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
                padding: 0 10px;
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
                        @include position(absolute, 0, 0, 0, 0, 100%, 100%);
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 22;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        visibility: hidden;
                        i {
                            font-size: 16px;
                            color: #fff;
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
                        color: $color-base-grey;
                        & > span:first-child {
                            color: $color-base-grey;
                        }
                        & > span:last-child {
                            color: $color-base-grey;
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
                            color: #f56c6c;
                            font-size: 21px;
                        }
                        &:nth-child(3) > i {
                            color: #f56c6c;
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
        @include position(fixed, 0, 0, 0, 0, 100%, 100%);
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
                padding: 0 20px;
                box-sizing: border-box;
                overflow-x: hidden;
                
                .core {
                    display: flex;
                    flex-direction: row;
                    height: 100%;
                    > div {
                        flex: 1;
                    }
                    .music-cover {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-evenly;
                        position: relative;
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
                                color: $color;
                                background: $tools-bg;
                                cursor: pointer;
                                i {
                                    font-size: 22px;
                                    &.liked {
                                        color: #f56c6c;
                                    }
                                }
                                &:hover {
                                    background: $color-bg;
                                    color: $color-hover;
                                }
                            }
                        }
                        .hint {
                            position: absolute;
                            bottom: 5%;
                            color:rgba(255, 255, 255, 0.8);
                            font-size: 13px;
                        }
                    }
                    .music-lyric {
                        display: flex;
                        width: 50%;
                        .music-lyric-box {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-evenly;
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
                                width: 170px;
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
                            ul {
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
                        .no-lyric {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 500px;
                        }
                    }
                }
                .comment {
                    background:  $color-white;
                    color:$color-text;
                    padding-bottom: 10px;
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
                                div:nth-child(odd) i {
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
        transform: rotate(0);
    }
    100% {
        transform: rotate(1turn);
    }
}
</style>