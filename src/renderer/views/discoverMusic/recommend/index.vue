<template>
<div>
    <div class="recommend-wrapper" v-if="bannerList.length > 0">
        <div class="carousel-wrapper">
            <banner :bannerList="bannerList" v-if="bannerList.length > 0"></banner>
        </div>
        <div v-for="item in listFilters" v-if="item.list.length > 0">
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
    <div class="loading" v-if="bannerList.length <= 0">
        <Spinner name="ball-scale-multiple" color="#b31212"/>
    </div>
</div>
    
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import Banner from './Banner'
import NewMusic from './NewMusic'
import Adjust from './Adjust'
import RecommendList from '@/components/RecommendList/'
import Title from '@/components/Title/'
import * as types from '@/store/mutation_types'
import Spinner from 'vue-spinkit'
export default {
    name: 'recommend',
    data() {
        return {
            bannerList: [],
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
            this.$router.push(`/songlistdetail/index/${id}`)
        },
        // 获取轮播图
        async getBanner() {
            let [res] = await to(neteaseApi.banner())
            setInterval(()=>{
                this.bannerList = res.banners
            },2000)
        },
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
.recommend-wrapper {
    position: relative;
    padding: 20px;
}
.loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 99999;
    div {
        position: absolute;
        top:50%;
        left: 50%;
    }
}
</style>