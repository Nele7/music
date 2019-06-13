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
    <div class="nav-search-area">
      <div class="nav-search">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="搜索您想听的歌曲...">
      </div>
    </div>
    <div class="nav-setting-area">
      <i class="el-icon-setting"></i>
      <i class="el-icon-message"></i>
      <i class="iconfont icon-pifu"></i>
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
import Tab from './tab'
export default {
  name: 'navbar',
  components:{
    Tab
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
    }
  },
  watch:{
    
  }
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  // z-index: 999;
  // -webkit-app-region: drag;
}
.nav-arrows-area {
  position: relative;
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgba(243, 243, 243, 0.26);

  .nav-arrows-icon {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 50px;
    i {
      flex: 1;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      text-align: center;
      color: rgb(158, 158, 158);
      cursor: pointer;
    }
  }
}
// .nav-text {
//   flex: 1;
//   display: flex;

//   .nav-text-area {
//     width: 384px;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     padding: 0 20px;
//     font-size: 14px;
//     color: #969696;
//     cursor: pointer;
//     & > div {
//       height: 50;
//       line-height: 50px;
//       &:hover{
//         color: #000;
//       }
//     }
//     .router-link-active {
//       color: #000;
//       font-weight: bold;
//     }
//   }
//   .nav-null-content {
//     flex: 1;
//   }
// }

.nav-search-area {
  flex: 0 0 180px;
  width: 180px;

  .nav-search {
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
    i {
      position: absolute;
      left: 5px;
      color: #969696 !important;
    }
    input {
      outline: none;
      border: 0;
      color: rgb(66, 66, 66);
      background-color: rgba(151, 150, 150, 0.199);
      padding: 0 23px;
      border-radius: 20px;
      height: 25px;
      width: 100%;
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
  i {
    flex: 1;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 17px;
    color: rgb(138, 138, 138);
  }
}
// placeholder css
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
  font-size: 13px;
}
input:focus::-webkit-input-placeholder {
  color: transparent;
}
</style>