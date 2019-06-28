<template>
    <div class="music-list-wrapper">
        <ul class="songs-list">
            <li class="song-item title">
                <div class="blank"></div>
                <div class="music-title">音乐标题</div>
                <div class="songs">歌手</div>
                <div class="album">专辑</div>
                <div class="duration">时长</div>
            </li>
            <li class="song-item" v-for="(item,index) in musiclist" :key="index">
                <div class="blank">
                    <span>{{index+1}}</span>
                    <!-- <i class="iconfont icon-xin"></i> -->
                    <i class="iconfont icon-hongxin liked"></i>
                </div>
                <div class="music-title">
                    <p>
                        <span>{{item.name}}</span>
                        <span class="sq" v-if="item.copyright ===1">SQ</span>
                        <span class="alias" v-if="item.alia && item.alia.length > 0">{{item.alia[0]}}</span>
                        <span class="alias" v-if="item.tns && item.tns.length > 0">{{item.tns[0]}}</span>
                    </p>
                    <i class="iconfont icon-bofang1"></i>
                </div>
                <div class="songs">{{item.ar[0].name}}</div>
                <div class="album">{{item.al.name}}</div>
                <div class="duration">{{item.dt || item.duration }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MusicList',
        props:{
            musiclist:{
                type:Array,
                default() {
                    return []
                },
            }
        },
        data() {
            return {
            }
        },
        methods: {
            
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.music-list-wrapper {
    .songs-list {
        .song-item {
            width: 100%;
            height: 40px;
            display: flex;
            border-bottom: 1px solid $color-border;
            transition: all 0.3s;
            &.title {
                div{
                    font-size: 16px;
                }
                color:$color-base-grey;
            }
            
            &:nth-child(n+2) {
                cursor: pointer;
                &:hover {
                    background: $background-undertintgrey !important;
                    .music-title {
                        i{
                            display: block;
                        }
                    }
                }
            }

            &:nth-child(2n+3) {
                background: rgba(245, 222, 222, 0.13)
            }
            div {
                display: flex;
                align-items: center;
                height: 100%;
                font-weight: 500;
                font-size: 13px;
            }

            .blank {
                width: 10%;
                span {
                    display: inline-block;
                    width: 50%;
                    height: 100%;
                    text-align: center;
                    line-height: 40px;
                }
                i {
                    font-size: 20px;
                    height: 100%;
                    line-height: 40px;
                    cursor: pointer;
                    &.liked {
                        color:#E55C4B;
                    }
                }
            }

            .music-title {
                width: 40%;
                padding: 0 20px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;

                p{
                    @include ellipsized;
                    .sq {
                        display: inline-block;
                        height: 12px;
                        border-radius: 4px;
                        line-height: 12px;
                        border:1px solid $color-base-red;
                        color:$color-base-red;
                        font-size: 12px;
                    }
                    .alias {
                        display: inline-block;
                         color:$color-base-grey;
                    }
                }
                i{
                    transition: all 0.3s;
                    font-size: 14px;
                    color:$color-base-grey;
                    display: none;
                }
            }

            .songs {
                width: 20%;
            }

            .album {
                width: 20%;

            }
            .duration {
                width: 10%;

            }
        }
    }
}
</style>