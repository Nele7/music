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
        <el-dialog title="调整栏目顺序" :visible.sync="dialogVisible" width="500px" center :modal="false">
            <SlickList 
            :lockToContainerEdges="true"
            :hideSortableGhost="false"
            helperClass="actives"
            class="list" 
            axis="y"
            lockAxis="y"
            lockOffset="100%"
            @input="changeRecommendArr($event)"
            v-model="listFilters">
                <SlickItem class="list-item" v-for="(item, index) in listFilters" :index="index" :key="index">
                    {{ item.t }}
                    <i class="el-icon-finished"></i>
                </SlickItem>
            </SlickList>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" plain>取 消</el-button>
                <el-button @click="updateRecommendArr" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import * as types from '@/store/mutation_types'
    export default {
        name: 'adjust',
        data() {
            return {
                dialogVisible:false,
                listFilters: this.$store.state.personalize.recommendListFilters,
                tempArr:[]
            }
        },
        methods: {
            // 监听数组顺序
            changeRecommendArr(v) {
                this.tempArr = v
            },
            // 更新数组
            updateRecommendArr() {
                this.$store.commit(`personalize/${types.UPDATE_RECOMMEND}`,this.tempArr)
                this.dialogVisible = false
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
.actives{
    box-shadow:0 0 10px rgb(187, 187, 187);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    background: #fff;
    box-sizing: border-box;
    color: #333;
    font-weight: 400;
    z-index:99999;
    i{
        cursor: pointer;
        font-size: 22px;
    }
}


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
        max-height: 80vh;
        margin: 0 auto;
        padding: 0;
        overflow: auto;
        background-color: #f3f3f3;
        border: 1px solid #efefef;
        .list-item {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            padding: 20px;
            background-color: #fff;
            border-bottom: 1px solid #efefef;
            box-sizing: border-box;
            user-select: none;
            color: #333;
            font-weight: 400;
            font-size: 15px;
            i {
                cursor: pointer;
                font-size: 22px;
            } 
        }
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
.el-dialog__title {
    font-size: 16px;
    color: #969696;
}
.el-dialog__footer{
    padding:10px ;
}
.el-button.is-plain:focus, .el-button.is-plain:hover {
    background: #FFF;
    border-color: #b31212;
    color: #b31212;
}
</style>
