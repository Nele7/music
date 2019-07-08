<template>
    <el-scrollbar
        wrap-class="scrollbar-wrapper"
        style="height:calc(100% - 68px);"
        ref="myScrollbar"
    >
        <div class="menu-list">
            <div class="menu-item">
                <div class="menu-title">在线音乐</div>
                <!-- 固定的 -->
                <router-link
                    v-for="(item,index) in fixedMenus"
                    :key="index"
                    :to="item.path"
                    class="menu-text"
                    tag="div"
                >
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </router-link>
                <!-- 动态加载的 -->
                <div class="menu-item" 
                v-if="userStatus && item.playList.length > 0" 
                v-for="(item,index) in normalPlayList"
                >
                    <div class="menu-title">{{item.title}}</div>
                    <!-- <div class="menu-text" v-for="(playlist,i) in item.playList" @click="toSongListDetail(playlist.id)"> -->
                    <router-link 
                    v-for="playlist in item.playList"
                    :to="`/songlistdetail/index/${playlist.id}`"
                    class="menu-text"
                    tag="div"
                    :key="playlist.id"
                    >
                        <i class="iconfont " :class="[playlist.name === userInfo.nickname + '喜欢的音乐' ? 'icon-xin':'icon-yinyue']"></i>
                        <span>{{ playlist.name === userInfo.nickname + '喜欢的音乐' ? '我喜欢的歌单': playlist.name }}</span>
                    </router-link>
                    </div>
                </div>
                <!-- <div class="menu-item" v-if="userStatus && normalPlayList.collectPlayList.length > 0">
                    <div class="menu-title">收藏的歌单</div>
                    <div class="menu-text"  v-for="(item,index) in normalPlayList.collectPlayList" :key="index">
                        <i class="iconfont icon-yinyue"></i>
                        <span>{{ item.name }}</span>
                    </div>
                </div> -->
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
import to from "@/utils/await-to.js"
import { neteaseApi } from "@/api/"
export default {
    data() {
        return {
            fixedMenus: [
                { path: '/music', name: '发现音乐', icon: 'icon-yinle-yuanshijituantubiao' },
                { path: '/fm', name: '私人FM', icon: 'icon-tubiaozhizuomobanyihuifu-' },
                { path: '/mv', name: '视频', icon: 'icon-shipin' },
                { path: '/pal', name: '朋友', icon: 'icon-pengyou' },
            ],
        }
    },
    mounted() {
        if(this.userStatus) {
            this.$store.dispatch('user/getUserPlayList')
        }
    },
    computed: {
        userStatus() {
            return this.$store.getters.loginStatus
        },
        userInfo(){
            return this.$store.getters.userInfo
        },
        uid() {
            return this.$store.getters.uid
        },
        playList(){
            return this.$store.getters.playList
        },
        normalPlayList() {
            let res = [
                {
                    title: '创建的歌单',
                    playList:[]
                },
                {
                    title: '收藏的歌单',
                    playList:[]
                }
            ]
            // let res = { createPlayList: [], collectPlayList: [] }
            // 判断是否登录，playlist是否有值
            if(this.userStatus && this.playList) {
                res[0].playList = this.playList.filter(item => item.subscribed === false)
                res[1].playList = this.playList.filter(item => item.subscribed === true)
                // res.createPlayList = this.playList.filter(item => item.subscribed === false)
                // res.collectPlayList = this.playList.filter(item => item.subscribed === true)
            }
            return res
        },
    },
    methods: {
        // toSongListDetail(id) {
        //     this.$router.push(`/songlistdetail/index/${id}`)
        // }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";

.menu-item {
    .menu-title {
        padding: 10px 11px;
        font-size: 14px;
        color: $color-menu-title;
    }
    .menu-text {
        padding: 0 15px;
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        line-height: 30px;
        cursor: pointer;
        &.router-link-active {
            background: $background-active;
            color: $color-base-red;
        }
        &:hover {
            background: $background-active;
            color: $color-base-red;
        }
        i {
            font-size: $font-size-iconfont;
        }
        span {
            font-size: $font-size-text-small;
            margin-left: 8px;
            @include ellipsized;
        }
    }
}
</style>