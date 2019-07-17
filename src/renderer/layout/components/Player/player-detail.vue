<template>
<div class="player-detail-wrapper">
    <div class="bg"></div>
    <div class="content">
      <div class="header">
        <div class="hide" @click="toggleFullPlayer">
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <!-- <div class="main">
        <div class="cover-lyric">
          <div class="music-cover"></div>
          <div class="music-lyric"></div>
        </div>
      </div> -->
    </div>
</div>
</template>

<script>
  export default {
    methods: {
      toggleFullPlayer() {
        console.log(123)
      }
    },
  }
</script>

<style lang="scss" scoped>
.player-detail-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #999;
    // height: calc(100% - 60px);
    z-index: 1000;
    overflow: hidden;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url(http://p1.music.126.net/2fdyC-Gix6v72i7MkU4OyQ==/109951162933281005.jpg) no-repeat;
      background-size: 120% 120%;
      background-position: center center;
      background-attachment: fixed;
      background-color: beige;
      transform: scale(1.2);
      filter: blur(20px);
      transition: background 5s;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      padding: 30px 20px 0;
      box-sizing: border-box;
      position: relative;
      .header {
        display: flex;
        height: 30px;
        .hide {
          width: 30px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 21px;
          color: #969696;
        }
      }
      // .main {
      //   flex:1;
      //   display: flex;
      //   flex-direction: row;
      //   .cover-lyric {
      //     display: flex;
      //     width: 100%;

      //     .music-cover {
      //       position: relative;
      //       flex: 1;
      //       text-align: right;
      //       border: 1px solid;
      //     }
      //     .music-lyric {
      //       flex: 1;
      //       border: 1px solid;

      //     }
      //   }
      // }
    }
}
</style>