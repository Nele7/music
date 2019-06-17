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
                <div class="user-info-detail"></div>
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
                this.$store.commit(types.TOGGLE_USERINFO_DETAIL,true)
                // 打开用户信息
            }
        },
        closeUserDetail(){
            this.$store.commit(types.TOGGLE_USERINFO_DETAIL,false)
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
        
.user-detail-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // background: #000;
    z-index: 999;
    .user-info-detail {
        width: 300px;
        height: 300px;
        position: absolute;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        left: 184px;
        top: 70px;
        z-index: 33;
    }
}

</style>