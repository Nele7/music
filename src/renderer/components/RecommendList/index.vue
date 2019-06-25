<template>
    <el-row :gutter="10" class="list-wrapper">
        <el-col :md="md" :lg="lg" :xl="xl" v-for="(item,index) in list" :key="index" class="list-item">
            <div class="item" :class="{'song-item':listType=='Song','mv-item':listType=='Mv','private-item':listType=='Private'}" @click="selectItem(item.id)">
                <img :src="item.picUrl" alt="">
                <div class="hover-from" v-if="listType!='Private'">
                    {{item.copywriter}}
                </div>
                <div class="hover-play-count" v-if="listType!='Private'">
                    <div class="play-count">
                        <i class="iconfont icon-bofang1" v-if="listType!='Mv'"></i>
                        <i class="el-icon-video-camera" v-else></i>
                        {{item.playCount | covertUnit}}
                    </div>
                </div>
                <div class="video-icon" v-if="listType=='Private'">
                    <i class="el-icon-video-camera"></i>
                </div>
                <div :class="{'play-icon':listType=='Song'}" v-if="listType=='Song'">
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
            list: {
                type:Array,
                required:true,
                default() {
                    return []
                }
            },
            md: {
                type:Number,
                default() {
                    return 6
                }
            },
            lg: {
                type:Number,
                default() {
                    return 4
                }
            },
            xl: {
                type:Number,
                default() {
                    return 3
                }
            },
            listType: {
                type: String,
                default() {
                    return 'Song'
                }
            }
        },
        created(){
        },
        methods:{
            selectItem(id){
                this.$emit('selectId',id)
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
$background-icon:rgba(12, 12, 12, 0.452);
.list-wrapper {
    display: flex;
    flex-wrap: wrap;
    min-height: 120px;
    .list-item {
        margin-bottom: 20px;
        cursor: pointer;
        .item {
            position: relative;
            width: 100%;
            overflow: hidden;
            &.song-item {
                padding-bottom: 100%;
            }
            &.mv-item {
                padding-bottom: 57%;
            }
            &.private-item {
                padding-bottom: 37%;
            }
            img {
                @include position(absolute,0,0,0,0,100%);
                border: 1px solid $color-border;
                border-radius: 4px;
                transition: all 0.5s;
            }
            & > div {
                position: absolute;
                background: $background-icon;
                color:$color-white;
                transition: all 0.3s;
            }
            .hover-from{
                left: 0;
                right: 0;
                top: -50px;
                padding: 5px;
                font-size: $font-size-text-small;
            }
            .hover-play-count {
                top:0;
                right: 0px;
                padding: 4px;
                font-size: $font-size-text-small;
                border-radius: 4px;
                .icon-bofang1 {
                    font-size: $font-size-text-small;
                }
            }
            .play-icon {
                background: transparent !important;
                top: 50%;
                right: 50%;
                transform: translate(30px,-30px);
                opacity: 0;
                .icon-bofang{
                    font-size: 60px;
                } 
            }
            .video-icon {
                top: 5px;
                left: 8px;
                padding: 4px 5px;
                font-size: 18px;
                border-radius: 50%;
            }
            &:hover {
                .hover-from {
                    top:0;
                }
                img {
                    // filter: blur(2px);
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