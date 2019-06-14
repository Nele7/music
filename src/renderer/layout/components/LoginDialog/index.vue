<template>
    <div class="login-dialog-wrapper">
        <div class="login-header">
            <h3>登录网易云音乐</h3>
            <i class="el-icon-close"></i>
        </div>
        <div class="login-input">
            <div class="login-tip">请使用网易云音乐账号进行登录</div>
            <div class="input-row-first">
                <el-input v-model="username" placeholder="手机号" @keyup.enter.native="login">
                <i slot="prefix" class="el-input__icon iconfont icon-pengyou"></i>
                </el-input>
            </div>
            <div>
                <el-input v-model="password" type="password" placeholder="密码" @keyup.enter.native="login">
                <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
                </el-input>
            </div>
            <div class="error">{{errorMsg}}</div>
            <div class="button">
                <button :class="{disabled: logging}" @click="login">立即登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'loginDialog',
        data() {
            return {
                username: '',
                password: '',
                errorMsg:'',
                logging:true
            }
        },
        methods: {
            login() {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.login-dialog-wrapper{
    @include position(absolute, 0, 0, 0, 0, 300px, 350px);
    display: flex;
    flex-direction: column;
    z-index: 999;
    margin: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .login-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        height: 40px;
        border-bottom: 1px solid rgb(233, 233, 233);
        line-height: 40px;
        color:#b31212;
        h3{
            margin: 0;
            border-bottom: 2px solid #b31212;
            font-family:'微软雅黑';
            font-weight: 500;
            font-size: 17px;
        }
        i{
            cursor: pointer;
        }
    }
    .login-input{
        flex: 1;
        padding: 40px 30px;
        .login-tip{
            color: #ccc;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .input-row-first {
            margin-bottom: 30px;
        }
        .error {
            min-height: 14px;
            margin: 10px 0 20px 0;
            text-align: right;
            color: red;
        }
        .button{
            text-align: center;
            button {
                padding: 10px 26px;
                border: none;
                border-radius: 2px;
                font-size: 15px;
                color: #fff;
                background: #b31212;
                letter-spacing: 4px;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
            }
        }
    }
    
}
</style>