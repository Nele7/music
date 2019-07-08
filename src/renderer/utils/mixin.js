import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"

export const commentMixin = {
    data() {
        return {
            comments:[]
        }
    },
    methods: {
        async sendComment(content) {
            let [res] = await to(neteaseApi.comment({
                t:1,
                type:this.hotType,
                id:this.id,
                content
            }))
            this.$toast('评论成功')
        }
    },
}