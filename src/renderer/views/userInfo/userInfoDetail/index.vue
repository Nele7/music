<template>
    <transition name="slide-left">
        <div class="user-detail-wrapper" v-if="userDetail" @click="closeUserDetail">
            <div class="user-info-detail" @click="cancelDefault">
                <div class="detail-list">
                    <div class="user-info-wrapper" v-if="!userInfoLoading">
                        <div class="user-info-count">
                            <div class="info">
                                <div class="dynamic" >
                                    <span href class="count">{{ userCount.event > 99 ? '99+' : userCount.event }}</span>
                                    <span>动态</span>
                                </div>
                                <div class="follow" @click="clickFollowList">
                                    <span class="count">{{ userCount.follow > 99 ? '99+' : userCount.follow }}</span>
                                    <span>关注</span>
                                </div>
                                <div class="fans" @click="clickFollowerList">
                                    <span class="count">{{ userCount.follower > 99 ? '99+' : userCount.follower }}</span>
                                    <span>粉丝</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="user-info-sign">
                            <div class="sign">
                                <span @click="sign" v-if="!signStatus" class="noSign">
                                    <i class="el-icon-coin"></i>
                                    <i>签到</i>
                                </span>
                                <span v-else class="isSign">
                                    <i class="el-icon-coin"></i>
                                    <i>已签到</i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="loading" v-if="userInfoLoading">
                        <Spinner name="ball-scale-multiple" color="#b31212"/>
                    </div>
                </div>
                
                <div class="user-info-list" v-for="(data,index) in userDetailData" :key="index">
                    <div
                        class="user-info-item"
                        v-for="(item,index) in data.list"
                        :key="index"
                        @click="noViews"
                    >
                        <div class="icon item-style">
                            <i :class="item.icon"></i>
                        </div>
                        <div class="name item-style">
                            <span>{{item.title}}</span>
                        </div>
                        <div class="mark item-style">
                            <span>{{item.mark}}</span>
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
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import Spinner from 'vue-spinkit'

export default {
    props:['userCount'],
    data() {
        return {
            userDetailData: [
                {
                    list: [
                        {
                            icon: 'iconfont icon-huiyuanzhongxin',
                            title: '会员中心',
                            mark: '未选购'
                        },
                        {
                            icon: 'iconfont icon-dengji',
                            title: '等级',
                            mark: 'LV 7'

                        },
                        {
                            icon: 'iconfont icon-gouwuche',
                            title: '商城',
                        }
                    ]
                },
                {
                    list: [
                        {
                            icon: 'iconfont icon-shezhi',
                            title: '个人信息设置',
                        },
                        {
                            icon: 'iconfont icon-shouji',
                            title: '绑定社交账号'
                        }
                    ]
                }
            ],
        }
    },
    mounted() {
        if (this.userLoginStatus) {
            this.getUserDetail()
        }
    },
    computed: {
        // 显示状态
        userDetail() {
            return this.$store.getters.showUserInfoDetail
        },
        // 登录状态
        userLoginStatus() {
            return this.$store.getters.loginStatus
        },
        uid() {
            return this.$store.getters.uid
        },
        userInfo() {
            return this.$store.getters.userInfo
        },
        signStatus() {
            return this.$store.getters.signStatus
        },
        userInfoLoading() {
            return this.$store.getters.userInfoLoading
        }
    },
    methods: {
        cancelDefault() {
            window.event.stopPropagation()  // 解决父元素点击事件的问题，阻止事件冒泡即可
        },
        // 关闭用户详情页
        closeUserDetail() {
            this.$store.commit(`toggle/${types.TOGGLE_USERINFO_DETAIL}`, false)
        },
        // 点击其他项
        noViews() {
            this.$toast('暂未开放，敬请期待~~~')
        },
        // 获取用户详情，需登录
        async getUserDetail() {
            await this.$store.dispatch('user/getUserDetail')
        },
        // 用户签到
        async sign() {
            let res = await this.$store.dispatch('user/sign')
            this.$toast('签到成功积分+'+res.point)
            // 更新签到状态
            this.$store.commit(`user/${types.USER_SIGN}`,true)
        },
        // 点击动态进入动态列表
        // clickEventList() {
        //     this.$router.push({path:'/userDetail',query:{type:1}})
        //     this.closeUserDetail()
        // },
        // 点击关注进入关注列表
        clickFollowList() {
            this.$router.push({path:`/userfollow/${this.uid}`,query:{type:2,tab:`${this.userInfo.nickname}的关注`}})
            this.closeUserDetail()
        },
        // 点击粉丝进入粉丝列表
        clickFollowerList() {
            this.$router.push({path:`/userfollow/${this.uid}`,query:{type:3,tab:`${this.userInfo.nickname}的粉丝`}})
            this.closeUserDetail()
        },
        // 退出登录
        async userSignOut() {
            let res = await this.$store.dispatch('user/logout')
            this.$toast(res)
            this.$store.commit(`toggle/${types.TOGGLE_USERINFO_DETAIL}`, false)
            this.$router.push('/')
        }
    },
    components: {
        Spinner
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";

.user-detail-wrapper {
    @include position(fixed, 0, 0, 0, 0);
    z-index: 201;
    .user-info-detail {
        @include position(absolute, 70px, auto, auto, 184px, 300px);
        display: flex;
        flex-direction: column;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        z-index: 201;
        .detail-list {
            position: relative;
            height: 131px;
            .user-info-wrapper {
                .user-info-count {
                    position: relative;
                    .info {
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
                            cursor: pointer;
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
                                }
                            }
                        }
                    }
                    .loading {
                        div {
                            position: absolute;
                            top:50%;
                            left: 50%;
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
                            &.noSign:hover {
                                color: $color-base-black;
                                background: $background-active;
                                cursor: pointer;
                            }
                            &.isSign {
                                color: $color-base-grey;
                                background: $background-active;
                            }
                            i {
                                font-style: normal;
                            }
                        }
                    }
                }
            }
            .loading {
                div {
                    position: absolute;
                    top:50%;
                    left: 50%;
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