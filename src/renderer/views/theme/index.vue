<template>
    <el-popover
        placement="top"
        :visible-arrow="true"
        height="100px"
      >
          <ul class="themes">
            <li class="theme-item" @click="selectTheme(item.value)" v-for="(item,index) in themelist" :key="index">
               <div class="item-bg">
                    <span :class="[{'el-icon-check':item.value === getTheme},item.value]">
                        <!-- <i class="el-icon-check" v-show="theme === item.value"></i> -->
                    </span>
               </div>
                <p>{{item.name}}</p>
            </li>
          </ul>
        <div slot="reference">
            <span class="iconfont icon-pifu"></span>
        </div>
      </el-popover>
</template>

<script>
    import * as types from '@/store/mutation_types'
    export default {
        data() {
            return {
                themelist:[
                    {
                        name:'浅色',
                        value:'default'
                    },
                    {
                        name:'深色',
                        value:'dark'
                    },
                    {
                        name:'红色',
                        value:'red'
                    }
                ],
            }
        },
        computed:{
            getTheme() {
                return this.$store.getters.theme
            }
        },
        methods: {
            selectTheme(theme) {
                this.$store.commit(`user/${types.USER_THEME}`,theme)
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
.themes {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .theme-item {
        text-align: center;
        margin: 0 10px;
        cursor: pointer;
        .item-bg{
            width: 23px;
            height: 23px;
            span {
                display: inline-block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                color:#fff;
                text-align: center;
                border: 1px solid $color-border;
                line-height: 23px;
                &.default {
                    color:$color-base-red;
                    background-color: rgb(246, 246, 246);
                }
                &.dark {
                    background-color: rgb(32, 32, 32);
                }
                &.red {
                    background-color: rgb(211, 58, 49);
                }
            }
        }
        
        p {
            font-size: 13px;
            margin-top: 5px;
        }
    }
}
</style>