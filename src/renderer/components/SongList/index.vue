<template>
    <el-row :gutter="10" class="song-list-wrapper">
        <el-col :md="6" :lg="4" :xl="3" v-for="(item,index) in songsList" :key="index" class="song-list-item">
            <div class="item-songs" @click="selectItem(item.id)">
                <img :src="item.picUrl" alt="">
                <div class="hover-from">
                    {{item.copywriter}}
                </div>
                <div class="hover-play-count">
                    <div class="play-count">
                        <i class="iconfont icon-bofang1"></i>
                        {{item.playCount | covertUnit}}
                    </div>
                </div>
                <div class="play-icon">
                        <i class="iconfont icon-bofang"></i>
                    </div>
            </div>
            <p class="item-name">{{item.name}}</p>
        </el-col>
    </el-row>
</template>

<script>
    import {covertUnit} from '@/utils/util.js'
    export default {
        props:{
            songsList: {
                type:Array,
                required:true,
                default() {
                    return []
                }
            }
        },
        created(){
        },
        methods:{
            selectItem(id){
                this.$emit('selectSong',id)
            }
        },
        filters:{
            covertUnit
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.song-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    min-height: 120px;
    .song-list-item {
        margin-bottom: 20px;
        cursor: pointer;
        .item-songs {
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            overflow: hidden;
            img {
                @include position(absolute,0,0,0,0,100%);
                border: 1px solid $color-border;
                border-radius: 4px;
                transition: all 0.5s;
            }
            .hover-from{
                position: absolute;
                left: 0;
                right: 0;
                top: -50px;
                background: rgba(12, 12, 12, 0.452);
                color:$color-white;
                padding: 5px;
                font-size: $font-size-text-small;
                transition: top 0.5s;
            }
            .hover-play-count {
                position: absolute;
                top:0;
                right: 0px;
                background: rgba(12, 12, 12, 0.452);
                padding: 4px;
                color:$color-white;
                font-size: $font-size-text-small;
                transition: opacity 0.3s;
                border-radius: 4px;
                .icon-bofang1 {
                    font-size: $font-size-text-small;
                }
            }
            .play-icon {
                @include position(absolute,50%,50%);
                transform: translate(30px,-30px);
                color:$color-white;
                opacity: 0;
                transition: opacity 0.3s;
                .icon-bofang{
                    font-size: 60px;
                } 
            }
            &:hover {
                .hover-from {
                    top:0;
                }
                img {
                    filter: blur(2px);
                    transform: scale(1.3);
                }
                .play-icon {
                    opacity:1
                }
                .hover-play-count{
                    opacity: 0;
                }
            }
        }
        .item-name {
            margin-top: 6px;
            line-height: 18px;
            font-size: $font-size-text-small;
            &:hover {
                color:$color-base-red;
            }
        }
    }
}

</style>