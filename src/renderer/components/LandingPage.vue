<template>
<div id="window-top">
  <div class="header-bar-button">
    
    <!-- <div class="buttons">
      <a class="btn closes" title="关闭" @click="clickItem('window-close')"></a>
      <a class="btn minimize" title="最小化" @click="clickItem('window-min')"></a>
      <a class="btn maximize" title="最大化" @click="clickItem('window-max')"></a>
    </div> -->
</div>
</div>
</template>

<script>
import { ipcRenderer } from 'electron';
  export default {
    methods: {
      clickItem(item) {
        ipcRenderer.send(item)
      }
    }
  }
</script>

<style lang="scss" scope>
#window-top {
  -webkit-app-region: drag;
  background-color: #fff;
}
  .header-bar-button {
  position: relative;
  font-size: 0;
  z-index: 200;
  padding: 3px 5px;
  .btn {
    -webkit-app-region: no-drag;
    display: inline-block;
    position: relative;
    padding: 0;
    border: none;
    box-shadow: 0 0 1px rgba(0,0,0,0.3);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 0 4px;
    cursor: pointer;
    &.closes {
      background-color: #fc625d;
    }
    &.minimize {
      background-color: #fdbc40;
    }
    &.maximize {
      background-color: #34c84a;
    }
  }
}
</style>
