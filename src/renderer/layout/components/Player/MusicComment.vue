<template>
    <div class="comment-wrapper">
        <comment-input @sendComment="changeComment" ref="commentInput"></comment-input>
        <p class="noComment" v-if="hotComments.length === 0 && comments.length === 0">
            <span>暂时还没有评论，快来抢沙发~~</span>
        </p>
        <comment-list 
        title="精彩评论" 
        :commentlist="hotComments"
        @toggleCommentLike="toggleHotCommentLike"
        @selectName="selectName"
        v-if="hotComments.length"></comment-list>
        <h4 v-if="isMore" @click="loadHotMore" class="comment-hot-more">
            <a href="#">
                加载更多精彩评论
            <i class="el-icon-arrow-down"></i>
            </a>
        </h4>
        <comment-list 
        title="最新评论"
        :commentlist="comments" 
        @toggleCommentLike="toggleCommentLike"
        @selectName="selectName"
        v-if="comments.length"></comment-list>
        <div class="pages-container" v-if="total > pagesize">
            <el-pagination
                :page-size="pagesize"
                :total="total"
                layout="prev, pager, next"
                @current-change="currentChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    import {commentMixin} from '@/utils/mixin'
    import { commentListType } from '@/api/apiType'
    import CommentInput from '@/components/CommentInput'
    import CommentList from '@/components/CommentList'
    export default {
        mixins:[commentMixin],
        data() {
            return {
               hotType: commentListType.music_type,
            }
        },
        props:['id'],
        created() {
            this.getCommentList()
        },
        methods: {
            async getCommentList() {
                let offset = (this.currentPage - 1) * this.pagesize
                let [res] = await to(neteaseApi.commentMusic({
                    id:this.id,
                    limit:this.pagesize,
                    offset
                }))
                console.log(res)
                this.comments = res.comments
                if(res.hotComments){            // 没有热门评论时
                    if(res.moreHot) {           // 展示是否显示更多评论
                        this.getCommentHotList(this.id)
                    }else {
                        this.hotComments = res.hotComments
                    }
                }
                this.total = res.total
            },
            // 改变分页时
            currentChange(pages) {
                this.currentPage = pages
                this.getCommentList()
            },
            // 监听回复组件内容,发送评论
            changeComment(v) {
                this.sendComment(v)
            },
            // 热门评论加载更多
            loadHotMore() {
                this.currentPageHot += 1
                this.getCommentHotList(this.id)
            },
            selectName(userId) {
                this.$emit('selectName',userId)
            }
        },
        components: {
            CommentInput,
            CommentList
        },
        watch: {
            id:{
                immediate:false, // immediate:true代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行
                handler() {
                    // console.log('id变化----')
                    this.comments = []
                    this.hotComments = []
                    this.currentPage = 1
                    this.total = 0
                    this.currentPageHot = 1
                    this.getCommentList()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.noComment {
    text-align: center;
    color:#969696;
}
.comment-hot-more {
    text-align: center;
    a {
        display: inline-block;
        background: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 15px;
        color: #666;
        padding: 4px 16px;
        font-size: 15px;
        font-weight: 400;
        &:hover {
            background: rgba(223, 223, 223, 0.555);
        }
    }
}
.pages-container {
    margin: 20px 0;
    text-align: center;
}
</style>