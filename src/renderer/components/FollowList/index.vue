<template>
    <div style="height:100%;padding:10px">
        <ul class="follow-wrapper">
            <li v-for="(item,index) in dataList" :key="index">
                <div class="follow-item">
                    <div class="follow-avatar">
                        <img v-lazy="item.avatarUrl" :alt="item.nickname">
                    </div>
                    <div class="follow-text">
                        <p class="name" @click="selectName(item.userId)">{{item.nickname}}</p>
                        <p class="description">{{item.signature}}</p>
                        <p class="">
                            <a href="">
                                歌单
                                <span>{{item.playlistCount}}</span>
                            </a>
                            <a href="">
                                粉丝
                                <span>{{item.followeds}}</span>
                            </a>
                        </p>
                    </div>
                    <div class="follow-cancel">
                        <span v-if="item.followed && item.mutual" class="followed">
                            <i class="el-icon-check"></i>
                            互相关注
                        </span>
                        <span @click='follow(item,index)' v-if="!item.followed" class="follow">
                            <i class="el-icon-plus"></i>
                            关注
                        </span>
                        <span v-if="item.followed && !item.mutual" class="followed">
                            <i class="el-icon-check"></i>
                            已关注
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'FollowList',
        props:{
            list:{
                type:Array,
                required:true
            }
        },
        data() {
            return {
                
            }
        },
        computed: {
            dataList() {
                return this.list
            }
        },
        methods: {
            follow(item,index) {
               this.$emit('follow',{item,index})
           },
           selectName(uid) {
               this.$router.push(`/userdetail/${uid}`)
           }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
@import "@/assets/style/transition.scss";

.follow-wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    li {
        width: 50%;
        height: 110px;

        .follow-item{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px;
            box-sizing: border-box;
            height: 100%;
            transition: all 0.3s;

            &:hover{
                background: $background-undertintgrey;
            }

            .follow-avatar,.follow-cancel{
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .follow-avatar{
                width: 80px;
                height: 100%;
                
                img{
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .follow-text{
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                padding:0 10px;
                box-sizing: border-box;
                
                P{
                    color:#666;
                }
                .name {
                    font-weight: bold;
                    font-size: 16px;
                    margin: 10px 0 5px 0;
                    cursor: pointer;
                }
                .description{
                    @include ellipsized;
                    height: 30px;
                    line-height: 30px;
                    font-size: 14px;
                    width: 200px;

                }
                &>p:last-child{
                    font-size: 13px;
                    margin-top: 5px;
                    a{
                        color:#666;
                    }
                    a:first-child{
                        padding-right: 20px;
                        border-right: 1px solid $color-border;
                    }
                    a:last-child{
                        padding-left: 20px;
                    }
                }
            }

            .follow-cancel {
                width: 95px;
                height: 100%;
                font-size: 14px;
                span {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    font-size: 12px;
                    border-radius: 4px;
                    padding: 0 7px;
                    background: $background-grey;
                    &.follow {
                        color: $color-base-red;
                        cursor: pointer;
                    }
                    &.followed {
                        color: $color-base-grey;
                    }
                }
            }
        }
    }
}
// 当屏幕宽小于1400px时
@media only screen and (max-width: 1400px) {
    .follow-wrapper{
        li {
            width: 50%;
        }
    }
}
@media only  screen and (min-width: 1400px) and (max-width: 1600px) {
    .follow-wrapper{
        li {
            width: 33.33333333%;
        }
    }
}
@media only screen and (min-width: 1600px) {
    .follow-wrapper {
        li {
            width: 25%;
            .follow-item{
                .follow-text {
                    .description{
                    @include ellipsized;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                    }
                    & > p:last-child {
                        display: flex;
                        justify-content: space-between;
                        a:last-child{
                            padding-left: 0px;
                        }
                    }
                }
            }
        }
    }
}
</style>