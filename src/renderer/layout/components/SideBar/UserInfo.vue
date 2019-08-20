<template>
  <div>
    <div class="user-info">
      <div class="head-photo">
        <img :src="userInfo.avatarUrl" width="40" height="40" v-if="userStatus">
        <i class="iconfont icon-touxiang" v-else></i>
      </div>
      <div class="name" :class="{nickName:userStatus}" @click="openLogin">
        <span>{{userStatus?userInfo.nickname:'未登录'}}</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <user-info-detail :userCount="userCount" />
  </div>
</template>

<script>
import * as types from "@/store/mutation_types"
import userInfoDetail from './userInfoDetail'
export default {
  data() {
    return {
      userCount:{
        event:null,
        follow:null,
        follower:null,
      }
    }
  },
  mounted() { },
  computed: {
    userStatus() {
      return this.$store.getters.loginStatus
    },
    userInfo() {
      return this.$store.getters.userInfo
    },
    uid() {
        return this.$store.getters.uid
    },
   
  },
  methods: {
    openLogin() {
      if (!this.userStatus) {
        this.$store.commit(`toggle/${types.TOGGLE_LOGIN_DIALOG}`, true)
      } else {
        this.$store.commit(`toggle/${types.TOGGLE_USERINFO_DETAIL}`, true)
        // this.$store.dispatch('user/getUserInfo')
        this.getCount()
        // this.getUserInfo()
      }
    },
    getCount() {
      this.$store.dispatch('user/getUserFollow',this.uid).then(res => {
        this.userCount.follow = res.follow.length
      })
      this.$store.dispatch('user/getUserFollower',this.uid).then(res => {
        this.userCount.follower = res.followeds.length
      })
      // console.log(this.userCount)
      this.$store.dispatch('user/getUserEvent',this.uid).then(res => {
        this.userCount.event = res.events.length
      })
    }
    //  同时请求接口
    // getUserInfo() {
    //   this.$store.commit(`user/${types.USER_INFO_LOADING}`,true)
    //   Promise.all([
    //     this.$store.dispatch('user/getUserFollow'),
    //     this.$store.dispatch('user/getUserFollower'),
    //     this.$store.dispatch('user/getUserEvent')
    //   ]).then(()=> {
    //     setTimeout(() => {
    //       this.$store.commit(`user/${types.USER_INFO_LOADING}`,false)
    //       console.log('成功')
    //     },1500)
    //   })
    // }
  },
  components:{
    userInfoDetail
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  .head-photo {
    img {
      border-radius: 50%;
      border: 2px solid rgb(187, 187, 187);
    }
    i {
      color: rgba(179, 179, 179, 0.925);
      font-size: 30px;
    }
  }
  .name {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
    font-weight: bold;
    color: $color-base-grey;
    height: 22px;
    line-height: 22px;
    cursor: pointer;
    &.nickName {
      color: rgb(66, 66, 66);
    }
    span {
      width: 85px;
      height: 22px;
      text-align: center;
      @include ellipsized;
    }
    i {
      height: 22px;
      line-height: 22px;
    }
  }
}
</style>