<template>
    <el-scrollbar wrap-class="scrollbar-wrapper" style="height:calc(100%);" ref="myScrollbar">
        <div class="search-suggest-wrapper">
            <div class="suggest-box" v-for="(order,index) in suggestSearch.order" :key="index">
                <div class="suggest-title">
                    <i class="iconfont" :class="suggestSearch && normalTitle(order)[1]"></i>
                    <span>{{suggestSearch && normalTitle(order)[0]}}</span>
                </div>
                <ul class="suggest-list">
                    <li v-for="(item,index) in suggestSearch[order]" :key="index">
                        <a href="#" @click="changeSuggest(order,index)">
                            <span>{{item.name}}</span>
                            <span v-for="(ar,i) in item.artists" :key="i">- {{ar.name}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
export default {
    props: ['suggestSearch'],
    methods: {
        normalTitle(order) {
            let obj = {
                'songs': ['单曲', 'icon-yinyue'],
                'albums': ['专辑', 'icon-dengji'],
                'mvs': ['视频', 'icon-shipin'],
                'artists': ['歌手', 'icon-yonghu'],
                'playlists': ['歌单', 'icon-liebiao']
            }
            return obj[order]
        },
        changeSuggest(order,index) {
            let orderArr = this.suggestSearch[order]
            let action = new Map([
                ['songs',() => { this.$store.dispatch('player/replaceMusicPlayList',orderArr[index]) }],
                ['artists',() => {this.$router.push(`/singerdetail/${orderArr[index].id}`)}],
                ['albums',() => { this.$router.push(`/albumdetail/${orderArr[index].id}`) }],
                ['playlists',() => { this.$router.push(`/songlistdetail/${orderArr[index].id}`) }],
                ['mvs',() => { this.$router.push(`/mvdetail/${orderArr[index].id}`) }],
            ])
            action.get(order).call(this)
            this.$parent.closeDialog() // 调用父组件方法
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.search-suggest-wrapper {
    .suggest-box {
        padding: 10px 0;
        .suggest-title {
            padding-left: 8px;
            color: $color-base-grey;
            font-size: 14px;
            i {
                font-size: 14px;
            }
        }
        .suggest-list {
            padding-top: 10px;
            li {
                font-size: 13px;
                height: 35px;
                line-height: 35px;
                cursor: pointer;
                &:hover {
                    background: $background-active;
                }
                a {
                    display: block;
                    @include ellipsized;
                    margin: 0 26px;
                    color: $color-base-black;
                }
            }
        }
    }
}
</style>