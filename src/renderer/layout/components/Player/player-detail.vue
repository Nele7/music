<template>
<div class="player-detail-wrapper">
  <div class="player-detail">
    <div class="bg"></div>
    <div class="content">
      <div class="header">
        <div class="hide">
          <i class="el-icon-bottom"></i>
        </div>
      </div>
      <div class="main">
        <div class="music-cover"></div>
        <div class="music-lyric"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    
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
  .player-detail {
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
      transition: background-image 5s;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      .header {
        position: relative;
        height: 30px;
        .hide {
          position: absolute;
          width: 30px;
          height: 100%;
          left: 71px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .main {
        display: flex;

      }
    }
  }
}
</style>