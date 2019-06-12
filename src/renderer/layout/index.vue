<template>
    <div class="app-wrapper">
        <div class="sidebar-container">
            <sidebar/>
        </div>
        <div class="navbar-container">
            <navbar/>
        </div>
        <div class="main-container">
            <router-view></router-view>
            <!-- <app-main/> -->
        </div>
        <div class="player-container">
            <player/>
        </div>
    </div>
</template>

<script>
import { Sidebar, Navbar, AppMain, Player } from "./components";
export default {
    name: "Layout",
    components: {
        Sidebar,
        AppMain,
        Navbar,
        Player
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
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
    background: green;
}
.navbar-container {
    @include position(absolute, 0, 0, auto, auto, 100%, $navBarHeight);
}

.player-container {
    @include position(absolute, auto, 0, 0, 0, 100%, $playerHeight);
    background: #999;
}
</style>