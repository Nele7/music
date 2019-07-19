import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"

export const commentMixin = {
    data() {
        return {
            comments: [],        // 全部歌单评论列表
            hotComments:[],      // 热门歌单评论列表
            isMore: false,       // 展示更多精彩评论
            pagesize: 20,        // 最新评论一页数量
            pagesizeHot: 10,     // 热门评论一页数量
            currentPage: 1,      // 最新评论当前页数
            currentPageHot: 1,   // 热门评论当前页数
            total:0,             // 总数
        }
    },
    methods: {
        // 歌单发送评论
        async sendComment(content) {
            let [res] = await to(neteaseApi.comment({
                t:1,
                type:this.hotType,
                id:this.id,
                content
            }))
            // 评论成功以后更新最近评论数据，如果为第一页，则更新数组
            let list = [...this.comments]
            if(this.currentPage === 1) {
                list.unshift(res.comment)
                list.pop()                   // 评论成功以后删除最后一个数据，保证当前页数量为20个
            }
            this.comments = list
            this.total = this.total + 1
            this.$emit('addComment')         // 通知父组件
            this.$refs.commentInput.clear()  // 调用子组件的方法
            this.$toast('评论成功')
        },
        // 歌单评论列表
        async getCommentList(id) {
            let offset = (this.currentPage - 1) * this.pagesize
            let [res] = await to(neteaseApi.commentPlaylist({
                id,
                limit:this.pagesize,
                offset
            }))
            this.comments = res.comments
            if(res.hotComments){            // 没有热门评论时
                if(res.moreHot) {           // 展示是否显示更多评论
                    this.getCommentHotList(id)
                }else {
                    this.hotComments = res.hotComments
                }
            }
            this.total = res.total
        },
        // 热门评论列表
        async getCommentHotList(id) {
            let offset = (this.currentPageHot - 1) * this.pagesizeHot
            let [res] = await to(neteaseApi.commentHot({
                id,
                type: this.hotType,
                limit: this.pagesizeHot,
                offset
            }))
            this.isMore = res.hasMore
            this.hotComments = [...this.hotComments, ...res.hotComments]    // 拼接
        },
        // 热门评论点赞
        toggleHotCommentLike(index) {
            this.toggleCommentLike(index,'hotComments')
        },
        // 评论点赞
        async toggleCommentLike(index,commentName = 'comments') {
            let comment = this[commentName][index]
            await to(neteaseApi.commentLike({
                id: this.id,
                cid: comment.commentId,
                t: comment.liked ? 0 : 1,
                type: this.hotType
            }))
            let result = comment.liked ? '取消点赞成功' : '点赞成功' 
            this.$toast(result)
            comment.liked = !comment.liked
            let add = comment.liked ? 1 : -1
            comment.likedCount += add
        },
        // 改变分页时
        currentChange(pages) {
            this.currentPage = pages
            this.getCommentList(this.id)
        }
    },
}

export const musicMixin = {
    methods: {
        // 检测歌曲是否有版权
        checkMusic(id) {
            return new Promise(async(resolve,reject) => {
                try {
                let res = await neteaseApi.checkMusic({
                    id
                })
                if(res.success) {
                    resolve(res)
                }
                } catch (error) {
                    reject(error)
                }
            })
        },
    }
}