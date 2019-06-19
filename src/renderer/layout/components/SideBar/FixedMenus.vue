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
                <div class="menu-item" v-if="userStatus">
                    <div class="menu-title">创建的歌单</div>
                    <div class="menu-text" v-for="(item,index) in normalPlayList.create" :key="index">
                        <i class="iconfont " :class="[item.name === userInfo.nickname + '喜欢的音乐' ? 'icon-xin':'icon-yinyue']"></i>
                        <span>{{ item.name === userInfo.nickname + '喜欢的音乐' ? '我喜欢的歌单': item.name }}</span>
                    </div>
                </div>
                <div class="menu-item" v-if="userStatus">
                    <div class="menu-title">收藏歌单</div>
                    <div class="menu-text" v-for="(item,index) in normalPlayList.collect" :key="index">
                        <i class="iconfont icon-yinyue"></i>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
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
        // console.log(this.$store.state.user.userPlayList)
    },
    computed: {
        userStatus() {
            return JSON.stringify(this.userInfo) != "{}"
        },
        userInfo(){
            return this.$store.state.user.userInfo
        },
        uid() {
            return this.$store.getters.uid
        },
        playList(){
            return this.$store.state.user.userPlayList.playlist
        },
        normalPlayList() {
            if(this.userStatus && this.playList) {
                let res = { create: [], collect: [] }
                let _playlist = this.playList
                res.create = _playlist.filter(item => item.subscribed === false)
                res.collect = _playlist.filter(item => item.subscribed === true)
                return res
            }
        }
    },
    methods: {

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