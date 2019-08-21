<template>
    <div class="app-wrapper">
        <div class="sidebar-container">
            <sidebar/>
        </div>
        <div class="navbar-container">
            <navbar/>
        </div>
        <div class="main-container">
            <el-scrollbar
                wrap-class="scrollbar-wrapper"
                style="height:100%;"
                ref="myScrollbar"
            >
                <app-main/>
            </el-scrollbar>
        </div>
        <div class="player-container">
            <player/>
        </div>
        <transition name="slide-top">
            <login-dialog class="login-dialog-container" v-if="loginVisible"/>
        </transition>
    </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from "./components";
import LoginDialog from '@/views/loginDialog/'
import Player from '@/views/player/'
export default {
    name: "Layout",
    components: {
        Sidebar,
        AppMain,
        Navbar,
        Player,
        LoginDialog
    },
    mounted(){
        if(this.loginStatus) {
            this.$store.dispatch('user/getUserLikelist')
        }
    },
    computed:{
        // 登录模态框状态
        loginVisible(){
            return this.$store.getters.showLoginDialog
        },
        loginStatus() {
            return this.$store.getters.loginStatus
        }
    },
    methods: {
    },
    watch:{
        
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
@import "@/assets/style/transition.scss";
.app-wrapper {
    @include position(relative, 0, 0, 0, 0, 100%, 100%);
}
.sidebar-container {
    @include position(
        absolute,
        $navBarHeight,
        auto,
        $playerHeight,
        0,
        $sideBarWidth,
        calc(100% - #{$navplayHeight})
    );
}
.main-container {
    @include position(
        absolute,
        $navBarHeight,
        0,
        $playerHeight,
        $sideBarWidth,
        calc(100% - #{$sideBarWidth}),
        calc(100% - #{$navplayHeight})
    );
    z-index: 200;
}
.navbar-container {
    @include position(absolute, 0, 0, auto, auto, 100%, $navBarHeight);
}

.player-container {
    @include position(absolute, auto, 0, 0, 0, 100%, $playerHeight);
}
</style>