<template>
    <div class="recommend-wrapper">
        <div class="carousel-wrapper">
            <banner :bannerList="bannerList" v-if="bannerList.length > 0"></banner>
        </div>
        <div class="recommend-songlist">
            <h4>
                <span>推荐歌单</span>
                <i class="el-icon-arrow-right"></i>
            </h4>
            <song-list :songsList="recommendSongsList" v-if="recommendSongsList.length > 0" @selectSong="selectSong"></song-list>
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import Banner from './Banner'
import SongList from '@/components/SongList/'
    export default {
        name: 'recommend',
        data() {
            return {
                bannerList: [],
                recommendSongsList: []
            }
        },
        created() {
            this.getBanner()
            this.getPersonalized()
            this.getPersonalizedmv()
        },
        methods: {
            selectSong(id) {
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
                console.log(res)
            }
        },
        components: {
            Banner,
            SongList
        }
    }
</script>

<style lang="scss" scoped>


.recommend-wrapper{
    padding: 20px;
    
    
}
</style>