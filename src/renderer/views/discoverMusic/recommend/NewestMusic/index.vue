<template>
    <ul class="new-music-wrapper">
        <li class="new-muisc-list" v-for="(item,index) in list" :key="index">
            <div class="new-muisc-item" v-for="(list,i) in item" :key="i">
                <div class="item-img" @click="selectItemMusic(list)">
                    <img :src="list.song.album.blurPicUrl" alt="">
                    <i class="iconfont icon-bofang"></i>
                </div>
                <div class="item-index">
                    {{list.index}}
                </div>
                <div class="item-text">
                    <p>
                        <span>{{list.name}}</span>
                        <span v-if="list.song.alias.length>0" class="alias">{{list.song.alias[0]}}</span>
                    </p>
                    <p>
                        <span class="sq" v-if="list.song.copyright === 0">SQ</span>
                        <span v-for="(ar,i) in list.song.artists" :key="i"> {{ar.name}}  
                            <i v-if="i !== list.song.artists.length-1">/</i> 
                        </span>
                    </p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
  import { neteaseApi } from "@/api/"
  import to from "@/utils/await-to.js"
  import { musicMixin } from '@/utils/mixin'

    export default {
        mixins:[musicMixin],
        props:{
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            async selectItemMusic(item) {
                try {
                await this.checkMusic(item.id)
                // 插入单首
                let obj = {...item.song,from:'最新音乐'}
                console.log(obj)
                    this.$store.dispatch('player/replaceMusicPlayList',obj)
                } catch (error) {
                    this.$toast(error.response.data.message)
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.new-music-wrapper{
    display: flex;
    .new-muisc-list {
        flex: 1;
        
        .new-muisc-item {
            display: flex;
            height: 60px;
            padding: 5px;
            border-bottom: 1px solid $color-border;
            transition: all 0.3s;

            .item-img {
                position: relative;
                width: 60px;
                height: 100%;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 100%;
                }
                i {
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    transform: translate(-13px,-13px);
                    border-radius: 50%;
                    color: $color-white;
                    font-size: 26px;
                    transition: all 0.3s;
                }
                
                &:hover {
                    i{
                        background:rgba(12, 12, 12, 0.452);
                    }
                }
            }
            &:first-child {
                border-top: 1px solid $color-border;
            }
            &:hover {
                background:$background-undertintgrey;
            }
            .item-index {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30px;
                height: 100%;
                color:$color-base-grey;
            }
            .item-text {
                flex: 1;
                p{
                    margin-top: 8px;
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
                        color: $color-base-grey;
                    }
                    &:first-child {
                        font-size: 14px;
                    }
                    &:last-child {
                        color: $color-base-grey;
                        font-size: 13px;
                    }
                }
            }
        }
    }
}

</style>