<template>
    <div class="login-dialog-wrapper">
        <div class="login-header">
            <h3>登录网易云音乐</h3>
            <i class="el-icon-close" @click="closeLoginDialog"></i>
        </div>
        <div class="login-input">
            <div class="login-tip">请使用网易云音乐账号进行登录</div>
            <div class="input-row-first">
                <el-input v-model="username" placeholder="手机号/邮箱" @keyup.enter.native="login">
                <i slot="prefix" class="el-input__icon iconfont icon-pengyou"></i>
                </el-input>
            </div>
            <div>
                <el-input v-model="password" type="password" placeholder="密码" @keyup.enter.native="login">
                <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
                </el-input>
            </div>
            <div class="error">{{errorMsg}}</div>
            <div class="button" >
                <button :class="{disabled: logging}" @click="dologin">立即登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {neteaseApi} from '../../../api/'
    import to from '@/utils/await-to.js'
    export default {
        name:'loginDialog',
        data() {
            return {
                username: '',
                password: '',
                errorMsg:'',
                logging:false
            }
        },
        methods: {
            closeLoginDialog(){
                this.$store.commit('setLoginDialogStatus',false)
            },
            async dologin() {
                let [err, res] = await to(neteaseApi.phoneLogin({
                    phone:18652737531,
                    password:'wangyuhan1'
                }))
                if(err){
                    console.log(err.response.data.msg)
                    return 
                }
                
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
        border-bottom: 1px solid $color-border;
        line-height: 40px;
        color:$color-base-red;
        h3{
            margin: 0;
            border-bottom: 2px solid $color-base-red;
            // font-family:'微软雅黑';
            font-weight: 500;
            font-size: $font-size-baseText;
        }
        i{
            cursor: pointer;
        }
    }
    .login-input{
        flex: 1;
        padding: 40px 30px;
        .login-tip{
            color: $color-mark;
            font-size: $font-size-baseText;
            margin-bottom: 10px;
        }
        .input-row-first {
            margin-bottom: 30px;
        }
        .error {
            min-height: 14px;
            margin: 10px 0 20px 0;
            text-align: right;
            color: $color-base-red;
        }
        .button{
            text-align: center;
            button {
                padding: 10px 26px;
                border: none;
                border-radius: 2px;
                letter-spacing: 4px;
                font-size: $font-size-baseText;
                color: $color-white;
                background: $color-base-red;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
                &.disabled {
                    pointer-events: none;
                }
            }
        }
    }
    
}
</style>