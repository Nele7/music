<template>
  <div class="user-detail-wrapper">
    <div>
      <div class="user-info-wrapper">
        <div class="cover-img">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <div class="info">
          <h4>{{userInfo.nickname}}</h4>
          <div class="tools">
            <div class="sex">
              <span class="level">LV {{level}}</span>
              <span class="sex">
                <i class=""></i>
              </span>
            </div>
            <div class="">
              <span>关注</span>
            </div>
          </div>
          <div class="event">
            <ul class="list">
              <li class="item">
                <p>0</p>
                <p>动态</p>
              </li>
              <li class="item">
                <p>10</p>
                <p>关注</p>
              </li>
              <li class="item">
                <p>40</p>
                <p>粉丝</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { neteaseApi } from "@/api/"
  import to from "@/utils/await-to.js"
  export default {
    data() {
      return {
        userInfo:{},
        level:null,
      }
    },
    created() {
      this.getUserDetail()
    },
    computed: {
      userId() {
        return parseInt(this.$route.params.uid)
      }
    },
    methods: {
      async getUserDetail() {
        let [res] = await to(neteaseApi.userDetail({
          uid:this.userId
        }))
        this.userInfo = res.profile
        this.level = res.level
        console.log(res)
      }
    },
  }
</script>

<style lang="scss" scoped>
.user-detail-wrapper {

  .user-info-wrapper {
    display: flex;

    .cover-img {
      width: 230px;
      height: 230px;
      padding: 20px;
    }
    .info {
      flex:1;
      
      .tools {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>