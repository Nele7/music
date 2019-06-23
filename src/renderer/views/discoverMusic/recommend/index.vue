<template>
    <div class="recommend-wrapper">
        <div class="carousel-wrapper">
            <el-carousel :interval="40000" type="card" height="200px" indicator-position="none">
                <el-carousel-item v-for="item in bannerList" :key="item">
                    <div class="banner-area">
                        <img :src="item.imageUrl" class="banner-img">
                        <span class="banner-category" :style="'background:'+item.titleColor">{{item.typeTitle}}</span>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
    export default {
        name: 'recommend',
        data() {
            return {
                bannerList: []
            }
        },
        created() {
            this.getBanner()
        },
        methods: {
            async getBanner() {
                let [res] = await to(neteaseApi.banner())
                this.bannerList = res.banners
                console.log(this.bannerList)
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";

.recommend-wrapper{
    padding: 20px;
    .banner-area {
        position: relative;
        width: 100%;
        height: 100%;
        .banner-img {
            @include position(absolute,0,0,0,0,100%,100%);
            border-radius: 10px;
        }
        .banner-category {
            @include position(absolute,auto,0,0,auto);
            padding: 5px 10px;
            color:$color-white;
            font-size: $font-size-text-small;
            border-top-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
    
}
</style>