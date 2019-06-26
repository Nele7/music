<template>
    <div class="adjust-wrapper">
        <div class="adjust">
            <p>
                现在可以根据个人喜好，自由调整首页栏目顺序啦~
            </p>
            <p>
                <span @click="dialogVisible=true">调整栏目顺序</span>
            </p>
        </div>
        <p class="footer">---------------我是有底线的---------------</p>
        <el-dialog title="调整栏目顺序" :visible.sync="dialogVisible" width="500px" center>
            <SlickList lockAxis="y" v-model="items" class="list" :lockToContainerEdges="true" axis="y" lockOffset="100%" helperClass="actives">
                <SlickItem v-for="(item, index) in items" :index="index" :key="index" class="list-item">
                {{ item }}
                </SlickItem>
            </SlickList>
        </el-dialog>
    </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';
    export default {
        name: 'adjust',
        data() {
            return {
                dialogVisible:false,
                items: ['推荐歌单', '推荐MV', '最新音乐', '独家放送']
            }
        },

        components:{
            SlickItem,
            SlickList
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.adjust-wrapper {
    .adjust{
        border-top:1px solid $color-border;
        border-bottom:1px solid $color-border;
        padding: 20px;
        p{
            text-align: center;
            color: $color-base-grey;
            font-size: $font-size-text-small;
            &:last-child {
                margin-top: 20px;
                span {
                    display: inline-block;
                    border: 1px solid $color-base-red;
                    color:$color-base-red;
                    padding: 5px 10px;
                    border-radius: 12px;
                    transition: all 0.3s;
                    cursor: pointer;
                    &:hover {
                        background: $color-base-red;
                        color:$color-white;
                    }
                }
            }
        }
    }
    .list {
        // display: flex;
        // flex-direction: column;
        // background: $background-grey;
        background-color: #f3f3f3;
        .list-item {
            padding: 20px;
            color:#333;
        }
    }
    .actives {
        box-shadow:0 0 10px #282A2E;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 20px;
        background: #36383C;
        box-sizing: border-box;
        color: #ccc;
        font-weight: 400;
    }
    .footer {
        text-align: center;
        margin-top: 20px;
        color: $color-base-grey;
        font-size: $font-size-text-small;
    }
}

</style>
<style>
.el-dialog--center .el-dialog__body {
    padding: 0;
}
.el-dialog__body {
    padding: 0;
}
</style>
