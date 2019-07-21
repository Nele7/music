<template>
    <div>
        <i href="#"
        class="iconfont"
        v-for="(item,index) in normalIconList"
        :key="index"
        :class="item.icon"
        @click="togglePlayerMode(item.id)"
        ></i>
    </div>
</template>

<script>
    export default {
        name:'palyer-mode',
        data() {
            return {
                iconList: [
                    {id:0,icon:'icon-liebiaoxunhuan',mode:'loop',name:'列表循环'},
                    {id:1,icon:'icon-xindong',mode:'beckon',name:'心动模式'},
                    {id:2,icon:'icon-danquxunhuan',mode:'singleLoop',name:'单曲循环'},
                    {id:3,icon:'icon-shunxubofang',mode:'sequence',name:'顺序播放'},
                    {id:4,icon:'icon-bofangye-caozuolan-suijibofang',mode:'random',name:'随机播放'}
                ],
                id: 0
            }
        },
        computed: {
            normalIconList() {
                return this.iconList.filter(item => item.id === this.id)
            }
        },
        methods: {
            togglePlayerMode(id) {
                id++
                this.id = id
                if(id === this.iconList.length) {
                    this.id = 0
                    id = 0
                }
                this.$toast(this.iconList[id].name)
                this.$emit('playMode',this.iconList[id].mode)
            }
        },
    }
</script>

<style lang="scss" scoped>
a {
    color: #666;
    font-size: 18px;
    &.icon-liebiaoxunhuan {
        font-size: 14px;
    }
}
</style>