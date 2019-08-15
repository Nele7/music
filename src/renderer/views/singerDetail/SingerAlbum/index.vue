<template>
    <div style="padding:20px">
        <div v-if="viewType === 1">
            <album-list @select="selectId" :list="hotAlbums"></album-list>
            <!-- <el-row :gutter="10" class="list-wrapper">
                <el-col
                    :md="6"
                    :lg="6"
                    :xl="6"
                    class="list"
                    v-for="(item,index) in hotAlbums"
                    :key="index"
                >
                    <div class="list-card" @click="selectId(item.id)">
                        <div class="list-item">
                            <img :src="item.picUrl" />
                            <div class="bg"></div>
                        </div>
                        <p class="text">
                            <span class="name">{{item.name}}</span>
                            <span v-for="(al,i) in item.alias" :key="i" class="al">({{al}})</span>
                        </p>
                        <p class="day">{{ item.publishTime | formatDateTime }}</p>
                    </div>
                </el-col>
            </el-row> -->
        </div>
        
        <div class="list-line-wrapper" v-if="viewType === 2">
            <div class="list-line">
                <div class="list-line-item" v-for="(item,index) in hotAlbums" :key="index" @click="selectAlbum(item.id)">
                    <div class="avatar">
                        <img :src="item.picUrl" />
                    </div>
                    <div class="text">{{item.name}}</div>
                    <div class="size">{{item.size}}首</div>
                    <div class="publish-time">发行时间:{{ item.publishTime | formatDateTime }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import { formatDateTime } from '@/utils/util'
import AlbumList from '@/components/AlbumList'
export default {
    props: ['id', 'viewType'],
    data() {
        return {
            hotAlbums: []
        }
    },
    created() {
        this.getSingerAlbum()
    },
    computed: {

    },
    methods: {
        async getSingerAlbum() {
            let [res] = await to(neteaseApi.artistAlbum({
                id: this.id
            }))
            this.hotAlbums = res.hotAlbums
        },
        selectId(id) {
            this.$emit('selectId',{
                type:'album',
                id
            })
        }
    },
    components: {
        AlbumList
    },
    filters: {
        formatDateTime
    },
    watch: {
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
                    background: url(../../../assets/image/album_cover_player.png)
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
.list-line-wrapper {
    .list-line {
        width: 100%;
        .list-line-item {
            display: flex;
            padding: 10px;
            height: 80px;
            line-height: 80px;
            transition: background .5s;
            &:nth-child(2n) {
                background: #f9f9f9;
            }
            &:hover {
                background: $background-active;

            }
            .avatar {
                width: 80px;
                height: 100%;
                img {
                   width: 100%;
                    border-radius: 4px;
                }
            }
            .text {
                flex: 1;
                padding: 0 15px;
                @include ellipsized;
            }
            .size {
                width: 220px;
                text-align: center;
            }
            .publish-time {
                font-size: 13px;
            }
        }
    }
}
</style>