<template>
    <div class="comment-wrapper">
       <comment-input @sendComment="changeComment" ref="commentInput"></comment-input>
       <comment-list></comment-list>
    </div>
</template>

<script>
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    import {commentMixin} from '@/utils/mixin'
    import CommentInput from '@/components/comment-input'
    import CommentList from '@/components/comment-list'
    export default {
        mixins:[commentMixin],
        data() {
            return {
               hotType: 2
            }
        },
        props:['id'],
        created() {
        },
        methods: {
            // 监听回复组件内容,发送评论
            changeComment(v) {
                this.sendComment(v)
                // 调用子组件的方法
                this.$refs.commentInput.clear()
            },
        },
        components: {
            CommentInput,
            CommentList
        }
    }
</script>

<style lang="scss" scoped>

</style>