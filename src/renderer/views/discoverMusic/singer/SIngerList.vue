<template>
  <el-row class="list-wrapper" :gutter="10">
          <el-col class="list-item" 
            :md="6"
            :lg="4"
            :xl="3">
            <div class="item">
              <img src="http://p1.music.126.net/wTcIyvb9xPsNzZTJ7ettow==/109951164273697592.jpg" alt="">
            </div>
            <p class="name">Alan Walker</p>
          </el-col>
          <el-col class="list-item" 
            :md="6"
            :lg="4"
            :xl="3">
            <div class="item">
              <img src="http://p1.music.126.net/wTcIyvb9xPsNzZTJ7ettow==/109951164273697592.jpg" alt="">
            </div>
            <p>Alan Walker</p>
          </el-col>
          <el-col class="list-item" 
            :md="6"
            :lg="4"
            :xl="3">
            <div class="item">
              <img src="http://p1.music.126.net/wTcIyvb9xPsNzZTJ7ettow==/109951164273697592.jpg" alt="">
            </div>
            <p>Alan Walker</p>
          </el-col>
          <el-col class="list-item" 
            :md="6"
            :lg="4"
            :xl="3">
            <div class="item">
              <img src="http://p1.music.126.net/wTcIyvb9xPsNzZTJ7ettow==/109951164273697592.jpg" alt="">
            </div>
            <p>Alan Walker</p>
          </el-col>
          <el-col class="list-item" 
            :md="6"
            :lg="4"
            :xl="3">
            <div class="item">
              <img src="http://p1.music.126.net/wTcIyvb9xPsNzZTJ7ettow==/109951164273697592.jpg" alt="">
            </div>
            <p>Alan Walker</p>
          </el-col>
          <el-col class="list-item" 
            :md="6"
            :lg="4"
            :xl="3">
            <div class="item">
              <img src="http://p1.music.126.net/wTcIyvb9xPsNzZTJ7ettow==/109951164273697592.jpg" alt="">
            </div>
            <p>Alan Walker</p>
          </el-col>
          <el-col class="list-item" 
            :md="6"
            :lg="4"
            :xl="3">
            <div class="item">
              <img src="http://p1.music.126.net/wTcIyvb9xPsNzZTJ7ettow==/109951164273697592.jpg" alt="">
            </div>
            <p>Alan Walker</p>
          </el-col>
        </el-row>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
.list-wrapper {
  .list-item {
    margin-bottom: 10px;
    .item {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;
      border-radius: 4px;
      cursor: pointer;
      img {
          @include position(absolute, 0, 0, 0, 0, 100%);
          border: 1px solid $color-border;
          border-radius: 4px;
          transition: all 0.5s;
          &:hover {
              transform: scale(1.3);
          }
      }
    }
    p {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>