<template>
  <div>
    <div class="user-info">
      <div class="head-photo">
        <img :src="userInfo.backgroundUrl" alt width="40" height="40" v-if="userStatus">
        <i class="iconfont icon-touxiang" v-else></i>
      </div>
      <div class="name" :class="{nickName:userStatus}" @click="openLogin">
        <span>{{userStatus?userInfo.nickname:'未登录'}}</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <user-info-detail/>
  </div>
</template>

<script>
import * as types from "@/store/mutation_types"
import userInfoDetail from './userInfoDetail'
export default {
  data() {
    return {};
  },
  mounted() { },
  computed: {
    userStatus() {
      return JSON.stringify(this.userInfo) != "{}"
    },
    userInfo() {
      return this.$store.state.login.userInfo
    }
  },
  methods: {
    openLogin() {
      if (!this.userStatus) {
        this.$store.commit(`toggle/${types.TOGGLE_LOGIN_DIALOG}`, true)
      } else {
        this.$store.commit(`toggle/${types.TOGGLE_USERINFO_DETAIL}`, true)
      }
    },
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