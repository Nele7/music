<template>
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
                            <i class="iconfont icon-huiyuanzhongxin"></i>
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
                            <i class="iconfont icon-dengji"></i>
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
                            <i class="iconfont icon-gouwuche"></i>
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
                            <i class="iconfont icon-shezhi"></i>
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
                            <i class="iconfont icon-shouji"></i>
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
                    <div class="user-info-item" @click="userSignOut">
                        <div class="icon item-style">
                            <i class="iconfont icon-tuichu"></i>
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
</template>

<script>
import * as types from "@/store/mutation_types"

export default {
    data() {
        return {};
    },
    mounted() { },
    computed: {
        userDetail() {
            return this.$store.state.toggle.showUserInfoDetail
        }
    },
    methods: {
        closeUserDetail() {
            this.$store.commit(`toggle/${types.TOGGLE_USERINFO_DETAIL}`, false)
        },
        userSignOut() {
            window.event.stopPropagation() // 解决父元素点击事件的问题，阻止事件冒泡即可
            this.$store.dispatch('login/logout').then(res => {
                this.$toast(res)
                this.$store.commit(`toggle/${types.TOGGLE_USERINFO_DETAIL}`, false)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";

.user-detail-wrapper {
  @include position(fixed, 0, 0, 0, 0);
  z-index: 30;
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