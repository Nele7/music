<template>
    <div class="recommend-wrapper">
        <div class="carousel-wrapper">
            <banner :bannerList="bannerList" v-if="bannerList.length > 0"></banner>
        </div>
        <div v-for="item in listFilters">
            <component :is="item.title" :t="item.t"></component>
            <component :is="item.type" :listType="item.listType" :list="item.list" :screenSize="item.screenSize" :newMusicList="item.list"></component>
        </div>
        <adjust></adjust>
    </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'

import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import { pad } from "@/utils/util.js"
import Banner from './Banner'
import NewMusic from './NewMusic'
import Adjust from './Adjust'
import RecommendList from '@/components/RecommendList/'
import Title from '@/components/Title/'
import * as types from '@/store/mutation_types'
export default {
    name: 'recommend',
    data() {
        return {
            bannerList: [],
            recommendSongsList: [],
            recommendMV: [],
            privateContent: [],
            newMusic: [],
        }
    },
    created() {
        this.getBanner()
        this.$store.dispatch(`personalize/getPersonalized`)
        this.$store.dispatch(`personalize/getPersonalizedmv`)
        this.$store.dispatch(`personalize/getNewMusic`)
        this.$store.dispatch(`personalize/getPrivateContent`)
    },
    computed: {
        listFilters() {
            return this.$store.state.personalize.recommendListFilters
        }  
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
    },
    components: {
        Banner,
        RecommendList,
        'v-title': Title,
        NewMusic,
        Adjust,SlickList, SlickItem
    }
}
</script>

<style lang="scss" scoped>
.recommend-wrapper {
    padding: 20px;
}
</style>