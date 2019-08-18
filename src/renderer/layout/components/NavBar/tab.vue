<template>
    <div class="nav-text">
      <div class="nav-text-area" v-if="currentShow">
        <router-link
          v-for="(item,index) in discoverTab"
          class="link"
          :key="index"
          :to="item.path"
          tag="div"
        >{{item.name}}</router-link>
      </div>
      <div class="nav-text-area" v-if="videoShow">
        <router-link
          class="link"
          v-for="(item,index) in videoTab"
          :key="index"
          :to="item.path"
          tag="div"
        >{{item.name}}</router-link>
      </div>
      <!-- 动态，关注，粉丝 -->
      <div class="nav-text-area nav-text-start" v-if="this.$route.fullPath === '/userDetail/index?type=1'">
        <div>
          {{userInfo.nickname}}{{eventTab[0].name}}
        </div>
      </div>
      <div class="nav-text-area nav-text-start" v-if="this.$route.fullPath === '/userDetail/index?type=2'">
        <div>
          {{userInfo.nickname}}{{eventTab[1].name}}
        </div>
      </div>
      <div class="nav-text-area nav-text-start" v-if="this.$route.fullPath === '/userDetail/index?type=3'">
        <div>
          {{userInfo.nickname}}{{eventTab[2].name}}
        </div>
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
                    // { path: '/music/radio', name: '主播电台' },
                    { path: '/music/rank', name: '排行榜' },
                    { path: '/music/singer', name: '歌手' },
                    { path: '/music/newMusic', name: '最新音乐' },
                ],
                videoTab: [
                    { path: '/mv/index', name: 'MV' },
                    { path: '/mv/av', name: '视频' },
                ],
                eventTab: [
                  { name: '动态' },
                  { name: '关注' },
                  { name: '粉丝' },
                ],
                currentShow:false,
                videoShow: false
            }
        },
        mounted(){
            this.currentShow = this.$route.meta.flag
            this.videoShow = this.$route.meta.show
        },
        computed:{
          userInfo() {
            return this.$store.getters.userInfo
          }
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
@import "@/assets/style/variables.scss";

.nav-text {
  flex: 1;
  display: flex;
  .nav-text-area {
    width: 384px;
    display: flex;
    // justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
    color: $color-base-grey;
    -webkit-app-region: no-drag;
    &.nav-text-start{
      justify-content:start;
    }
    cursor: pointer;
    & > div.link {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      &:hover{
        color: $color-base-red;
      }
    }
    .router-link-active {
      color: $color-base-red;
      font-weight: bold;
    }
  }
  .nav-null-content {
    flex: 1;
  }
}
</style>