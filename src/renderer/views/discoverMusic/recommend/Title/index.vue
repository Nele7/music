<template>
    <h4>
        <span>{{t}}</span>
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
        }
    }
</script>

<style lang="scss" scoped>

</style>