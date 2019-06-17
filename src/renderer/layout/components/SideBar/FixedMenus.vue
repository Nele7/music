<template>
<el-scrollbar wrap-class="scrollbar-wrapper" style="height:calc(100% - 54px);" ref="myScrollbar">
    <div class="menu-list">
        <div class="menu-item">
            <div class="menu-title">在线音乐</div>
            <!-- 固定的 -->
            <router-link v-for="(item,index) in fixedMenus" :key="index" :to="item.path" class="menu-text" tag="div">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{item.name}}</span>
            </router-link>
            <div class="menu-item">
                <div class="menu-title">创建的歌单</div>
                <div class="menu-text">
                    <i class="iconfont icon-xin"></i>
                    <span>我喜欢</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>年度歌单</span>
                </div>
            </div>
            <div class="menu-item">
                <div class="menu-title">收藏歌单</div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐馆</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐音乐馆音乐馆音乐馆音乐馆音乐馆馆</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐音乐馆音乐馆音乐馆音乐馆音乐馆馆</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐音乐馆音乐馆音乐馆音乐馆音乐馆馆</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐音乐馆音乐馆音乐馆音乐馆音乐馆馆</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐音乐馆音乐馆音乐馆音乐馆音乐馆馆</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐音乐馆音乐馆音乐馆音乐馆音乐馆馆</span>
                </div>
                <div class="menu-text">
                    <i class="iconfont icon-yinyue"></i>
                    <span>音乐音乐馆音乐馆音乐馆音乐馆音乐馆馆</span>
                </div>
            </div>
        </div>
    </div>
</el-scrollbar>
</template>

<script>
    export default {
        data() {
            return {
                fixedMenus: [
                    { path:'/music', name:'发现音乐', icon:'icon-yinle-yuanshijituantubiao'},
                    { path:'/fm', name:'私人FM', icon:'icon-tubiaozhizuomobanyihuifu-'},
                    { path:'/mv', name:'视频', icon:'icon-shipin'},
                    { path:'/pal', name:'朋友', icon:'icon-pengyou'},
                ]
            }
        },
        mounted(){

        },
        methods: {
            name() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";

.menu-item {
    .menu-title {
        padding: 10px 20px;
        font-size: 14px;
        color: $color-menu-title;
    }
    .menu-text {
        padding: 0 30px;
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        line-height: 30px;
        cursor: pointer;
        &.router-link-active {
            background: $background-active;
            color: $color-base-red;
        }
        &:hover{
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