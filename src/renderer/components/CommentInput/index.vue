<template>
    <div class="comment-input-wrapper">
        <el-input
            type="textarea"
            :placeholder="placeholder"
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
               textareaVal:'',
               placeholder:'期待你的神评论！！！'
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
@import '@/assets/style/variables.scss';

 .comment-input-wrapper {
    padding: 20px;
    .comment-tools {
        display: flex;
        flex-direction: row-reverse;
        padding: 10px 0;
        .btn {
            background: $background-grey;
            border: 1px solid $color-border;
            border-radius: 15px;
            color: $color-base-grey;
            &:hover {
                background: rgba(223, 223, 223, 0.555);
            }
        }
    }
}
</style>
<style>

</style>
