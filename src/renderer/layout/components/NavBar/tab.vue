<template>
    <div class="nav-text">
      <div class="nav-text-area" v-if="currentShow">
        <router-link
          v-for="(item,index) in discoverTab"
          :key="index"
          :to="item.path"
          tag="div"
        >{{item.name}}</router-link>
      </div>
      <div class="nav-text-area" v-if="videoShow">
        <router-link
          v-for="(item,index) in videoTab"
          :key="index"
          :to="item.path"
          tag="div"
        >{{item.name}}</router-link>
      </div>
      <div class="nav-null-content"></div>
    </div>
</template>

<script>
    export default {
        name:'tab',
        data() {
            return {
                discoverTab: [
                    { path: '/music/recommend', name: '个性推荐' },
                    { path: '/music/songList', name: '歌单' },
                    { path: '/music/radio', name: '主播电台' },
                    { path: '/music/rank', name: '排行榜' },
                    { path: '/music/singer', name: '歌手' },
                    { path: '/music/newMusic', name: '最新音乐' },
                ],
                videoTab: [
                    { path: '/mv/video', name: '视频' },
                    { path: '/mv/index', name: 'MV' },
                ],
                currentShow:false,
                videoShow: false
            }
        },
        mounted(){
            this.currentShow = this.$route.meta.flag
            this.videoShow = this.$route.meta.show
        },
        watch:{
            $route(to){
                this.currentShow = to.meta.flag
                this.videoShow = to.meta.show
            }
        }
    }
</script>

<style lang="scss" scoped>
.nav-text {
  flex: 1;
  display: flex;

  .nav-text-area {
    width: 384px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
    color: #969696;
    cursor: pointer;
    & > div {
      height: 50;
      line-height: 50px;
      &:hover{
        color: #000;
      }
    }
    .router-link-active {
      color: #000;
      font-weight: bold;
    }
  }
  .nav-null-content {
    flex: 1;
  }
}
</style>