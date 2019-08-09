<template>
    <el-row :gutter="10" class="list-wrapper">
        <el-col
            :md="6"
            :lg="4"
            :xl="3"
            class="list"
            v-for="(item,index) in playlists&&playlists"
            :key="index"
        >
            <div class="item" @click="selectItem(item)">
                <img :src="item.coverImgUrl" />
                <div class="nick-name">
                    <i class="iconfont icon-yonghu"></i>
                    <span>{{item.creator.nickname}}</span>
                </div>
                <div class="play-count">
                    <i class="iconfont icon-bofang1"></i>
                    {{item.playCount | covertUnit}}
                </div>
            </div>
            <p class="name">{{item.name}}</p>
        </el-col>
    </el-row>
</template>

<script>
import { covertUnit } from '@/utils/util.js'
export default {
    props: ['playlists'],
    filters: {
        covertUnit
    },
    methods: {
        selectItem(item) {
            this.$emit('selectId', item.id)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
$background-icon: rgba(12, 12, 12, 0.452);
.list-wrapper {
    display: flex;
    flex-wrap: wrap;
    min-height: 120px;
    .list {
        margin-bottom: 10px;
        .item {
            position: relative;
            padding-bottom: 100%;
            width: 100%;
            overflow: hidden;
            border-radius: 4px;
            cursor: pointer;
            img {
                @include position(absolute, 0, 0, 0, 0, 100%);
                border: 1px solid $color-border;
                border-radius: 4px;
                transition: all 0.5s;
                &:hover {
                    transform: scale(1.3);
                }
            }
            & > div {
                position: absolute;
                background: $background-icon;
                color: $color-white;
                transition: all 0.3s;
            }
            .play-count {
                top: 3px;
                right: 2px;
                padding: 4px;
                font-size: $font-size-text-small;
                border-radius: 4px;
                .icon-bofang1 {
                    font-size: $font-size-text-small;
                }
            }
            .nick-name {
                bottom: 0;
                font-size: 12px;
                padding: 3px 13px;
                border-radius: 4px;
            }
        }
        .name {
            margin-top: 5px;
            font-size: 14px;
        }
    }
}
</style>