<template>
    <div>
        <div v-if="!loading">
            <div class="songlistdetail-title-wrapper">
                <div class="song-cover">
                    <div class="song-list-img">
                        <img :src="indexList.coverImgUrl" alt />
                    </div>
                </div>

                <div class="song-list-text">
                    <div class="title">
                        <span>歌单</span>
                        <h2>{{indexList.name}}</h2>
                    </div>
                    <div class="songlist-avatar">
                        <img
                            :src="indexList.creator && indexList.creator.avatarUrl"
                            alt
                            width="30px"
                        />
                        <span>{{indexList.creator && indexList.creator.nickname}}</span>
                        <span>{{indexList.createTime | formatDateTime}} 创建</span>
                    </div>
                    <div class="btn-group">
                        <div class="btn-mini active">
                            <i class="iconfont icon-bofang"></i>
                            播放全部
                            <i class="el-icon-plus"></i>
                        </div>
                        <div class="btn-mini" @click="toggleSubscribe(indexList.subscribed)">
                            <i
                                :class="indexList.subscribed?'el-icon-folder-checked':'el-icon-folder-add'"
                            ></i>
                            {{indexList.subscribed?'取消收藏':'收藏'}} ({{indexList.subscribedCount | covertUnit}})
                        </div>

                        <div class="btn-mini" @click="$toast('暂未开放,敬请期待！！！')">
                            <i class="iconfont icon-fenxiang"></i>
                            分享 ({{indexList.shareCount | covertUnit}})
                        </div>
                    </div>
                    <div class="tags name">
                        <span>标签：</span>
                        <span
                            class="active"
                            v-for="(tag,i) in indexList.tags && indexList.tags"
                            :key="i"
                            @click="selectTag(tag)"
                        >
                            {{tag}}
                            <i v-if="i !== indexList.tags.length -1">/</i>
                        </span>
                    </div>
                    <div class="play-count name">
                        <span>歌曲数：</span>
                        <em>{{indexList.tracks && indexList.tracks.length}}</em>
                        <span class="play-num">播放数：</span>
                        <em>{{indexList.playCount | covertUnit}}</em>
                    </div>
                    <div class="brief name" ref="briefMoreWrapper">
                        <pre ref="briefMore">简介： {{indexList.description || '暂无'}}</pre>
                    </div>
                    <div class="brief-more" @click="toggleMore">
                        <i :class="showBriefMoreIcon?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
                    </div>
                </div>
            </div>
            <div class="tab">
                <ul>
                    <li v-for="(item,index) in tab" :key="index">
                        <span
                            :class="{'active':index===tempIndex}"
                            @click="showTabs(item,index)"
                        >{{item.name}}</span>
                    </li>
                </ul>
                <keep-alive>
                    <component
                        :is="showTabsComponent"
                        :musiclist="indexList.tracks"
                        :id="indexList.id"
                        @addComment="addComment"
                        @select="selectItem"
                        v-if="indexList.tracks && indexList.id"
                    ></component>
                </keep-alive>
            </div>
        </div>
        <div class="loading" v-if="loading">
            <Spinner name="ball-scale-multiple" color="#b31212" />
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import { covertUnit, formatDateTime } from "@/utils/util.js"
import { mapActions } from 'vuex'
import { musicMixin } from '@/utils/mixin'
import to from "@/utils/await-to.js"
import MusicList from '@/components/MusicList'
import Comment from './Comment/'
import Subscribers from './Subscribers/'
import Spinner from 'vue-spinkit'
import { DELAY } from '@/config'
import Bus from '@/utils/Bus'
const briefWrapperHeight = 32;
export default {
    name: 'songlistdetail',
    mixins: [musicMixin],
    data() {
        return {
            tab: [
                { name: '歌曲列表', v: 'music-list' },
                { name: '', v: 'comment' },
                { name: '收藏者', v: 'subscribers' },
            ],
            tempIndex: 0,
            showTabsComponent: 'music-list',
            indexList: {},
            showBriefMoreIcon: false,
            loading: false
        }
    },
    created() {
        this.getPlayListDetail()
    },
    computed: {
        songId() {
            return parseInt(this.$route.params.id)
        },
    },
    methods: {
        // 获取歌单详情
        async getPlayListDetail() {
            this.loading = true
            let [res] = await to(neteaseApi.playlistDetail({
                id: this.songId
            }))
            this.indexList = res.playlist
            // this.tab[1].name = `评论(${this.indexList.commentCount})`
            this.$set(this.tab[1], 'name', `评论(${this.indexList.commentCount})`)
            setTimeout(() => {
                this.loading = false
            }, DELAY)
        },
        // 点击tab条
        showTabs(item, index) {
            this.showTabsComponent = item.v
            this.tempIndex = index
        },
        // 点击收藏歌单
        toggleSubscribe(status) {
            //  2: 取消收藏 1：收藏
            let t = status ? 2 : 1
            this.subscribePlaylist(t)
        },
        // 收藏歌单
        async subscribePlaylist(t) {
            let [res] = await to(neteaseApi.subscribePlaylist({
                t,
                id: this.indexList.id
            }))
            this.indexList.subscribed = !this.indexList.subscribed
            let hint = this.indexList.subscribed ? '收藏成功' : '取消收藏成功'
            let add = this.indexList.subscribed ? 1 : -1
            let obj = Object.assign({}, this.indexList)
            this.$toast(hint)
            this.indexList.subscribedCount += add
            this.indexList.subscribed ? this.insertUserPlayList(obj) : this.deleteUserPlayList(this.indexList.id)
            // 如果为收藏把indexList对象插入到playlist数组，更新页面数据
            // 如果为取消收藏--把indexList对象从playlist数组删除，更新页面数据
        },
        // 简介显示更多
        toggleMore() {
            // 思路：根据显示状态，来控制是否展开
            // 计算pre的高度，根据显示状态，设置pre元素的高度
            this.showBriefMoreIcon = !this.showBriefMoreIcon
            if (this.showBriefMoreIcon) {
                // 判断pre元素如果小于父元素高度，则父元素设置为固定高度，反之设置成pre高度
                let briefMoreHeight = this.$refs.briefMore.offsetHeight
                briefMoreHeight = briefMoreHeight < briefWrapperHeight ? briefWrapperHeight : briefMoreHeight
                this.$refs.briefMoreWrapper.style.height = `${briefMoreHeight}px`
            } else {
                this.$refs.briefMoreWrapper.style.height = `${briefWrapperHeight}px`
            }
        },
        // 更新回复数量
        addComment() {
            this.$set(this.tab[1], 'name', `评论(${this.indexList.commentCount += 1})`)
        },
        // 选择当前歌曲项
        async selectItem(item, index) {
            try {
                await this.checkMusic(item.id)
                console.log(item)
                let { url } = await this.getSongURL(item.id)
                let list = this.indexList.tracks.map(item => {
                    let obj = {
                        id: item.id,
                        artists: item.ar,
                        album: item.al,
                        name: item.name,
                        duration: item.dt,
                        mv: item.mv,
                        from: this.indexList.name
                    }
                    return obj
                })
                list[index].url = url
                // 整个歌单放在播放列表中
                this.insertMusicPlayList({ list, index })
            } catch (err) {
                this.$toast(err.response.data.message)
            }
        },
        selectTag(tag) {
            Bus.$emit('selectTag', tag)
            this.$router.push(`/music/songList`)
        },
        ...mapActions('user', ['insertUserPlayList', 'deleteUserPlayList']),
        ...mapActions('player', ['insertMusicPlayList'])
    },
    watch: {
        songId: {
            deep: true, // 确认是否深入监听。deep的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器
            handler() {
                // this.loading = true
                this.getPlayListDetail()
            }
        }
    },
    components: {
        MusicList,
        Comment,
        Subscribers,
        Spinner
    },
    filters: {
        covertUnit,
        formatDateTime
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
$song-cover-width: 240px;
.loading {
    @include position(absolute, 0, 0, 0, 0);
    z-index: 99999;
    div {
        position: absolute;
        top: 50%;
        left: 50%;
    }
}
.songlistdetail-title-wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    .song-cover {
        width: $song-cover-width;
        padding: 20px;

        .song-list-img {
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            overflow: hidden;
            border-radius: 10px;
            img {
                @include position(absolute, 0, 0, 0, 0, 100%);
            }
        }
    }

    .song-list-text {
        flex: 1;
        padding: 20px;

        & > div {
            margin-bottom: 15px;
        }

        .title {
            display: flex;
            flex-direction: row;
            align-items: center;
            span {
                border: 1px solid $color-base-red;
                color: $color-base-red;
                border-radius: 4px;
                padding: 2px 3px;
                font-size: 15px;
                font-weight: 500;
            }
            h2 {
                margin: 0;
                margin-left: 10px;
                font-weight: 600;
            }
        }

        .songlist-avatar {
            display: flex;
            align-items: center;
            img {
                width: 30px;
                border-radius: 50%;
            }
            span {
                margin-left: 10px;
            }
            & > span:nth-child(2) {
                color: $color-base-red;
                cursor: pointer;
            }
            & > span:nth-child(3) {
                font-size: 15px;
                line-height: 15px;
            }
        }

        .btn-group {
            display: flex;
            flex-direction: row;
            align-items: center;
            .btn-mini {
                padding: 5px 13px;
                border-radius: 26px;
                border: 1px solid $color-border;
                font-size: 15px;
                margin-right: 10px;
                cursor: pointer;
                i {
                    font-size: 15px;
                }
                &.active {
                    background: #e55c4b;
                    color: $color-white;
                    i {
                        font-size: 15px;
                    }
                }
            }
        }

        .tags {
            .active {
                color: $color-base-red;
                cursor: pointer;
            }
        }
        .play-count {
            .play-num {
                margin-left: 10px;
            }
            em {
                font-style: normal;
            }
        }
        .brief {
            height: 32px;
            overflow: hidden;
            pre {
                font-size: 14px;
                margin: 0;
                padding: 0 40px 0 0;
                white-space: pre-wrap;
                word-wrap: break-word;
            }
        }
        .brief-more {
            position: absolute;
            right: 20px;
            top: 216px;
            cursor: pointer;
        }
        .name > span {
            &:first-child {
                display: inline-block;
                width: 65px;
                text-align: justify;
                text-align-last: justify; // 该属性定义的是一段文本中最后一行在被强制换行之前的对齐规则。
            }
        }
    }
}

.tab {
    // padding: 0 20px;
    ul {
        display: flex;
        flex-direction: row;
        width: 100%;
        border-bottom: 1px solid $color-border;
        padding: 0 10px;
        box-sizing: border-box;
        li {
            font-size: 14px;
            height: 36px;
            line-height: 36px;
            padding: 0 20px;
            text-align: center;
            letter-spacing: 2px;
            box-sizing: border-box;
            span {
                display: block;
                height: 100%;
                border-bottom: 2px solid transparent;
                cursor: pointer;
                &.active {
                    border-bottom: 2px solid $color-base-red;
                    color: $color-base-red;
                }
            }
        }
    }
}
</style>