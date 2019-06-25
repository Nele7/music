<template>
    <div class="recommend-wrapper">
        <div class="carousel-wrapper">
            <banner :bannerList="bannerList" v-if="bannerList.length > 0"></banner>
        </div>

        <div class="recommend-songlist">
            <v-title t="推荐歌单"></v-title>
            <recommend-list
                :list="recommendSongsList"
                v-if="recommendSongsList.length > 0"
                @selectId="selectId"
            ></recommend-list>
        </div>
        <div class="recommend-mv">
            <v-title t="推荐MV"></v-title>
            <recommend-list
                :list="recommendMV"
                :md="6"
                :lg="6"
                :xl="6"
                listType="Mv"
                v-if="recommendMV.length > 0"
                @selectId="selectId"
            ></recommend-list>
        </div>
        <div class="newmusic">
            <v-title t="最新音乐"></v-title>
            <new-music :newMusicList="newMusic" v-if="newMusic.length > 0"></new-music>
        </div>
        <div class="privatecontent">
            <v-title t="独家放送"></v-title>
            <recommend-list
                :list="privateContent"
                :md="8"
                :lg="8"
                :xl="8"
                listType="Private"
                v-if="privateContent.length > 0"
                @selectId="selectId"
            ></recommend-list>
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import { pad } from "@/utils/util.js"
import Banner from './Banner'
import NewMusic from './NewMusic'
import RecommendList from '@/components/RecommendList/'
import Title from '@/components/Title/'
export default {
    name: 'recommend',
    data() {
        return {
            bannerList: [],
            recommendSongsList: [],
            recommendMV: [],
            privateContent: [],
            newMusic: []
        }
    },
    created() {
        this.getBanner()
        this.getPersonalized()
        this.getPersonalizedmv()
        this.getPrivateContent()
        this.getNewMusic()
    },
    methods: {
        selectId(id) {
            console.log(id)
        },
        // 获取轮播图
        async getBanner() {
            let [res] = await to(neteaseApi.banner())
            this.bannerList = res.banners
        },
        // 获取推荐歌单
        async getPersonalized() {
            let [res] = await to(neteaseApi.personalized())
            this.recommendSongsList = res.result
        },
        // 获取推荐mv
        async getPersonalizedmv() {
            let [res] = await to(neteaseApi.personalizedmv())
            this.recommendMV = res.result
        },
        // 获取独家放送
        async getPrivateContent() {
            let [res] = await to(neteaseApi.exclusive())
            this.privateContent = res.result
        },
        // 获取最新音乐
        async getNewMusic() {
            let [res] = await to(neteaseApi.newsong())
            this.newMusic = this._normalizeNewMusic(res.result)
        },
        _normalizeNewMusic(data) {
            let res = []
            let len = data.length
            for (let i = 0; i < len; i++) {
                data[i].index = pad(i + 1)
            }
            for (let i = 0; i < len; i += 5) {
                res.push(data.slice(i, i + 5))
            }
            return res
        }
    },
    components: {
        Banner,
        RecommendList,
        'v-title': Title,
        NewMusic
    }
}
</script>

<style lang="scss" scoped>
.recommend-wrapper {
    padding: 20px;
}
</style>