<template>
    <h4>
        <span @click="selectTitle">{{t}}</span>
        <i class="el-icon-arrow-right"></i>
    </h4>
</template>

<script>
    export default {
        props:{
            t:{
                type:String,
                default() {
                    return '标题'
                }
            }
        },
        methods: {
            selectTitle() {
                let actions = new Map([
                    ['推荐歌单',() => {this.$router.push(`/music/songList`)}],
                    ['推荐MV',() => {this.$router.push(`/mv/index`)}],
                    ['最新音乐',() => {this.$router.push(`/music/newMusic`)}],
                ])
                actions.get(this.t).call(this)
                console.log(this.t)
            }
        },
    }
</script>

<style lang="scss" scoped>
h4 {
    cursor: pointer;
}
</style>