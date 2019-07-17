<template>
    <el-carousel :interval="40000" type="card" height="200px" indicator-position="none">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
            <div class="banner-area">
                <img :src="item.imageUrl" class="banner-img" ref="imgHeight">
                <span class="banner-category" :style="'background:'+item.titleColor">{{item.typeTitle}}</span>
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        props: {
            bannerList: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
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
</style>