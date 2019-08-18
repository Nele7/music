<template>
<div>
    <div class="recommend-wrapper" v-if="!loading">
        <div class="carousel-wrapper">
            <banner :bannerList="bannerList" v-if="bannerList.length > 0"></banner>
        </div>
        <div v-for="(item,index) in listFilters" v-if="item.list.length > 0" :key="index">
            <component :is="item.title" :t="item.t"></component>
            <component :is="item.type" 
            :listType="item.listType" 
            :list="item.list" 
            :screenSize="item.screenSize" 
            @selectId="selectId"
            ></component>
        </div>
        <adjust></adjust>
    </div>
    <div class="loading" v-if="loading">
        <Spinner name="ball-scale-multiple" color="#b31212"/>
    </div>
</div>
    
</template>

<script>
import { neteaseApi } from "@/api/"
import { DELAY } from '@/config'
import to from "@/utils/await-to.js"

import RecommendList from '@/components/RecommendList/'
import Banner from './Banner/'
import NewMusic from './NewestMusic/'
import Adjust from './Adjust/'
import Title from './Title/'
import Spinner from 'vue-spinkit'

import * as types from '@/store/mutation_types'

export default {
    name: 'recommend',
    data() {
        return {
            bannerList: [],
            loading:false
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
        selectId(item) {
            if(item.type === 0) {
                this.$router.push(`/songlistdetail/${item.id}`)
            }else if(item.type === 5) {
                this.$router.push(`/mvdetail/${item.id}`)
            }
        },
        // 获取轮播图
        async getBanner() {
            this.loading = true
            let [res] = await to(neteaseApi.banner())
            this.bannerList = res.banners
            setTimeout(() => {
                this.loading = false
            },DELAY)
        }
    },
    components: {
        Banner,
        RecommendList,
        'v-title': Title,
        NewMusic,
        Adjust,
        Spinner
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.recommend-wrapper {
    position: relative;
    padding: 20px;
}
.loading {
    @include position(absolute,0,0,0,0);
    background: #fff;
    z-index: 99999;
    div {
        position: absolute;
        top:50%;
        left: 50%;
    }
}
</style>