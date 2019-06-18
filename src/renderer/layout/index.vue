<template>
    <div class="app-wrapper">
        <div class="sidebar-container">
            <sidebar/>
        </div>
        <div class="navbar-container">
            <navbar/>
        </div>
        <div class="main-container">
            <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
            </transition>
            <!-- <app-main/> -->
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
import { Sidebar, Navbar, AppMain, Player, LoginDialog } from "./components";
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
    },
    computed:{
        // 登录模态框状态
        loginVisible(){
            return this.$store.state.toggle.showLoginDialog
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
    // -webkit-app-region: drag;
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
    // background: red;
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
    padding: 20px;
    box-sizing: border-box;
    // background: green;
}
.navbar-container {
    @include position(absolute, 0, 0, auto, auto, 100%, $navBarHeight);
}

.player-container {
    @include position(absolute, auto, 0, 0, 0, 100%, $playerHeight);
    background: #999;
}
</style>