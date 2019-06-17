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
    <transition name="slide-left">
      <div class="user-detail-wrapper" v-if="userDetail" @click="closeUserDetail">
        <div class="user-info-detail">
          <div class="user-info-count">
            <div class="dynamic">
              <span href class="count">0</span>
              <span>动态</span>
            </div>
            <div class="follow">
              <span href class="count">4</span>
              <span>关注</span>
            </div>
            <div class="fans">
              <span href class="count">2</span>
              <span>粉丝</span>
            </div>
          </div>
          <div class="user-info-sign">
              <div class="sign">
                  <span>
                    <i class="el-icon-coin"></i>
                    <i>签到</i>
                  </span>
              </div>
          </div>
          <div class="user-info-list user-info-ambitus">
              <div class="user-info-item">
                  <div class="icon item-style">
                      <i class="el-icon-school"></i>
                  </div>
                  <div class="name item-style">
                      <span>会员中心</span>
                  </div>
                  <div class="mark item-style">
                      <span>未订购</span>
                      <i class="el-icon-arrow-right"></i>
                  </div>
              </div>
              <div class="user-info-item">
                  <div class="icon item-style">
                      <i class="el-icon-school"></i>
                  </div>
                  <div class="name item-style">
                      <span>等级</span>
                  </div>
                  <div class="mark item-style">
                      <span>LV 7</span>
                      <i class="el-icon-arrow-right"></i>
                  </div>
              </div>
              <div class="user-info-item">
                  <div class="icon item-style">
                      <i class="el-icon-school"></i>
                  </div>
                  <div class="name item-style">
                      <span>商城</span>
                  </div>
                  <div class="mark item-style">
                      <span></span>
                      <i class="el-icon-arrow-right"></i>
                  </div>
              </div>
          </div>
          <div class="user-info-list user-info-setting">
              <div class="user-info-item">
                  <div class="icon item-style">
                      <i class="el-icon-school"></i>
                  </div>
                  <div class="name item-style">
                      <span>个人信息设置</span>
                  </div>
                  <div class="mark item-style">
                      <span></span>
                      <i class="el-icon-arrow-right"></i>
                  </div>
              </div>
              <div class="user-info-item">
                  <div class="icon item-style">
                      <i class="el-icon-school"></i>
                  </div>
                  <div class="name item-style">
                      <span>绑定社交账号</span>
                  </div>
                  <div class="mark item-style">
                      <span></span>
                      <i class="el-icon-arrow-right"></i>
                  </div>
              </div>
          </div>
          <div class="user-info-list" id="user-signout">
              <div class="user-info-item">
                  <div class="icon item-style">
                      <i class="el-icon-school"></i>
                  </div>
                  <div class="name item-style">
                      <span>退出登录</span>
                  </div>
                  <div class="mark item-style">
                      <span></span>
                      <i class="el-icon-arrow-right"></i>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as types from "@/store/mutation_types"
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
    },
    userDetail() {
      return this.$store.state.toggle.showUserInfoDetail
    }
  },
  methods: {
    openLogin() {
      if (!this.userStatus) {
        this.$store.commit(types.TOGGLE_LOGIN_DIALOG, true)
      } else {
        this.$store.commit(types.TOGGLE_USERINFO_DETAIL, true)
      }
    },
    closeUserDetail() {
      this.$store.commit(types.TOGGLE_USERINFO_DETAIL, false)
    }
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

.user-detail-wrapper {
  @include position(fixed, 0, 0, 0, 0);
  // background: #000;
  z-index: 999;
  .user-info-detail {
    @include position(absolute, 70px, auto, auto, 184px, 300px);
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    z-index: 33;
    .user-info-count {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 30px 30px 0px;
      .follow {
        border: 1px solid $color-border;
        border-top: 0;
        border-bottom: 0;
      }
      div {
        display: flex;
        flex-direction: column;
        padding: 0 21px;
        & > span:last-child {
          font-size: 13px;
          color: $color-base-grey;
        }
        span {
          text-align: center;
          width: 40px;
          &.count {
            font-size: 32px;
            font-weight: 400;
            margin-bottom: 2px;
            cursor: pointer;
          }
        }
      }
    }
    .user-info-sign {
        text-align: center;
        border-bottom: 1px solid $color-border;

        .sign {
            padding: 10px;
            span {
                display: inline-block;
                padding: 4px 24px;
                border-radius: 18px;
                border: 1px solid $color-border;
                color: $color-simple-black;
                cursor: pointer;
                &:hover {
                    color: $color-base-black;
                    background: $background-active;
                }
                i {
                    font-style: normal;
                }
            }
        }
    }
    #user-signout {
        border-bottom: 0;
    }
    .user-info-list {
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        border-bottom: 1px solid $color-border;
        
        .user-info-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 35px;
            padding: 0 5px;
            &:hover {
                background: $background-active;
            }
            .item-style {
                height: 100%;
                line-height: 35px;
                font-size: $font-size-baseText;
                color: $color-simple-black;
            }
            .icon {
                width: 35px;
                text-align: center;
            }
            .name {
                flex: 1;
            }
            .mark {
                text-align: right;
                width: 100px;
            }
        }
    }
  }
}
</style>