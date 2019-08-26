<template>
  <div class="nav-wrapper">
    <div class="nav-arrows-area">
      <div class="nav-arrows-icon">
        <i class="el-icon-arrow-left" @click="back"></i>
        <i class="el-icon-arrow-right" @click="next"></i>
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
    </div> -->
    <div class="nav-setting-area">
      <span class="el-icon-setting"></span>
      <span class="el-icon-message"></span>
      <theme></theme>
      <span class="el-icon-close" @click="clickItem('window-min')"></span>
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
  components:{
    Tab,
    Search,
    Theme
  },
  data() {
    return {
      
    }
  },
  mounted(){
    
  },
  methods: {
    back(){
      if(history.length <= 1){ 
        return
      }
      this.$router.go(-1)
    },
    next(){
      console.log('前进了···')
      this.$router.go(1)
    },
     clickItem(item) {
       console.log(item);
        ipcRenderer.send(item)
      }
  },
  watch:{
    
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
  box-shadow: 0 0 3px rgba(0,0,0,.25);
  -webkit-app-region: drag;
}
.nav-arrows-area {
  position: relative;
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  background: $background-nav-arrows;
  
  .nav-arrows-icon {
    position: absolute;
    right: 0;
    display: flex;
    width: 50px;
    justify-content: space-between;
    -webkit-app-region: no-drag;
    span {
      flex: 1;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      text-align: center;
      color: $color-base-grey;
      cursor: pointer;
    }
  }
}


.nav-setting-area {
  flex: 0 0 180px;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  -webkit-app-region: no-drag;
  i {
    flex: 1;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: $font-size-iconfont;
    color: $color-base-grey;
  }
}
</style>