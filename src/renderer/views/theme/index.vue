<template>
    <el-popover
        placement="top"
        :visible-arrow="true"
        height="100px"
      >
          <ul class="themes">
            <li class="theme-item" @click="selectTheme('default')">
                <span class="default"></span>
                <p>浅色</p>
            </li>
            <li class="theme-item" @click="selectTheme('dark')">
                <span class="dark"></span>
                <p>深色</p>
            </li>
            <li class="theme-item" @click="selectTheme('red')">
                <span class="red"></span>
                <p>红色</p>
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
.themes {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .theme-item {
        text-align: center;
        margin: 0 10px;
        cursor: pointer;
        span {
            display: inline-block;
            width: 23px;
            height: 23px;
            border-radius: 50%;

            &.default {
                background-color: rgb(246, 246, 246);
            }

            &.dark {
                background-color: rgb(32, 32, 32);
            }
            &.red {
                background-color: rgb(211, 58, 49);
            }
        }
        p {
            font-size: 13px;
        }
    }
}
</style>