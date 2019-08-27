<template>
    <div class="nav-wrapper">
        <div class="nav-arrows-area">
            <div class="nav-arrows-icon">
                <span class="btn-mini">
                    <i class="el-icon-arrow-left" @click="back"></i>
                </span>
                <span class="btn-mini">
                    <i class="el-icon-arrow-right" @click="next"></i>
                </span>
            </div>
        </div>
        <!-- tab栏 -->
        <tab></tab>
        <search></search>
        <!-- <div class="nav-search-area">
      <div class="nav-search">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="搜索您想听的歌曲...">
      </div>
        </div>-->
        <div class="nav-setting-area">
            <span class="btn-mini">
                <i class="el-icon-setting"></i>
            </span>
            <span class="btn-mini">
                <i class="el-icon-message"></i>
            </span>
            <theme class="btn-mini"></theme>
            <span @click="clickItem('window-min')" class="btn-mini">
                <i class="el-icon-close"></i>
            </span>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import Tab from './Tab'
import Search from '@/views/search/'
import Theme from '@/views/theme/'
export default {
    name: 'navbar',
    components: {
        Tab,
        Search,
        Theme
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        back() {
            if (history.length <= 1) {
                return
            }
            this.$router.go(-1)
        },
        next() {
            console.log('前进了···')
            this.$router.go(1)
        },
        clickItem(item) {
            console.log(item);
            ipcRenderer.send(item)
        }
    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.nav-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    -webkit-app-region: drag;
    background: $background-nav-arrows;
}
.nav-arrows-area {
    position: relative;
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    background: $background-nav-arrows;
    color: $color-text;

    .nav-arrows-icon {
        position: absolute;
        right: 8px;
        display: flex;
        justify-content: space-between;
        -webkit-app-region: no-drag;
        span {
            &:first-child {
                margin-right: 10px;
            }
        }
    }
}

.nav-setting-area {
    flex: 0 0 180px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: $color-base-grey;
    cursor: pointer;
    -webkit-app-region: no-drag;
}
.btn-mini {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    line-height: 25px;
    cursor: pointer;

    &:hover {
        background: $background-active;
    }
    i {
        width: 15px;
        font-size: 16px;
        text-align: center;
        color: $color-base-grey;
    }
}
</style>