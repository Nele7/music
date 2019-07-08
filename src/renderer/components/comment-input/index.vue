<template>
    <div class="comment-input-wrapper">
        <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textareaVal"
            maxlength="140"
            show-word-limit
            resize="none"
            height="80"
            >
        </el-input>
        <div class="comment-tools">
                <!-- <i class="el-icon-orange" slot="reference"></i> -->
            <el-button type="primary" size="mini" class="btn" @click="sendComment">评论</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               textareaVal:''
            }
        },
        created() {

        },
        methods: {
            sendComment() {
                this.$emit('sendComment', this.textareaVal)
            },
            clear() {
                this.textareaVal = ''
            }
        },
        components: {
        }
    }
</script>

<style lang="scss" scoped>
 .comment-input-wrapper {
    padding: 20px 0;
    .comment-tools {
        display: flex;
        flex-direction: row-reverse;
        padding: 10px 0;
        .btn {
            background: #e55c4b;
            border: 1px solid #e55c4b;
        }
    }
}
</style>
<style>
.el-textarea__inner {
    height: 80px;
}
.el-textarea__inner:focus {
    border-color:#e55c4b;
}
</style>
