<template>
    <el-row :gutter="10" class="list-wrapper">
        <el-col
            :md="6"
            :lg="6"
            :xl="6"
            class="list"
            v-for="(item,index) in list"
            :key="index"
        >
            <div class="list-card" @click="selectId(item.id)">
                <div class="list-item">
                    <img v-lazy="item.picUrl" />
                    <div class="bg"></div>
                </div>
                <p class="text">
                    <span class="name">{{item.name}}</span>
                    <span v-for="(al,i) in item.alias" :key="i" class="al">({{al}})</span>
                </p>
                <p class="day">{{ item.publishTime | formatDateTime }}</p>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import { formatDateTime } from '@/utils/util'

    export default {
        props:['list'],
        methods: {
            selectId(id) {
                this.$emit('selectId',id)
            }
        },
        filters: {
            formatDateTime
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.list-wrapper {
    display: flex;
    flex-wrap: wrap;
    .list {
        margin-bottom: 10px;
        .list-card {
            width: 164px;
            margin:auto;
            cursor: pointer;
            .list-item {
                position: relative;
                width: 100%;
                height: 164px;
                border-radius: 4px;
                img {
                    @include position(absolute, 0, 0, 0, 0, 100%);
                    border-radius: 4px;
                    z-index: 2;
                }
                .bg {
                    @include position(absolute, 0, -20px, 0, auto, 100%);
                    background: url(../../assets/image/album_cover_player.png)
                        no-repeat 100% 100%;
                }
            }
            p {
                margin: 5px 0;
                font-size: 13px;
                line-height: 20px;
                color: $color-base-grey;
                .name {
                    color: $color-base-black;
                }
            }
        }
    }
}
</style>