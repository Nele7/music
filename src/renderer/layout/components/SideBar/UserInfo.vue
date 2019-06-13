<template>
<div>
    <div class="user-info">
        <div class="head-photo">
            <i class="iconfont icon-touxiang"></i>
        </div>
        <div class="name" @click="showLogin = true">
            <span>未登录</span>
            <i class="el-icon-arrow-right"></i>
        </div>
        
    </div>
</div>
    
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted(){
            console.log(this.$store.state.Counter.main)
        },
        methods: {
            
        },
    }
</script>

<style lang="scss" scoped>
.user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    .head-photo {
        i {
            color: rgba(179, 179, 179, 0.925);
            font-size: 30px;
        }
    }
    .name {
        margin-left: 10px;
        font-weight: bold;
        color: rgba(94, 94, 94, 0.925);
        cursor: pointer;
    }
}
</style>