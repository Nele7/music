<template>
    <div class="expect-wrpper">
      <div>
        <i class="el-icon-warning-outline"></i>
        <p>功能暂未开放，敬请期待~~</p>
        
        <a href="https://github.com/Nele7/music" target="_blank">
        <i class="iconfont icon-git"></i>
        求star...
        </a>
      </div>
    </div>
</template>

<script>
export default {
  
}
</script>
<style type="text/scss" lang="scss" scoped>
.expect-wrpper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    text-align: center;
    color:#f56c6c;
    font-size: 14px;
    
    i {
      font-size: 59px;
      margin-bottom: 10px;
      &.icon-git {
          font-size: 20px;
      }
    }
    a {
        display: block;
        color:#000;
    }
    p {
        margin-bottom: 10px;
    }
  }
}
</style>