<template>
    <div>
        <follow-list :list="followList" v-if="queryType === 2" @follow="changeFollow"></follow-list>
        <follow-list :list="followedsList" v-if="queryType === 3" @follow="changeFollow"></follow-list>
    </div>
</template>

<script>
    import FollowList from '@/components/FollowList'
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    export default {
        data() {
            return {
                followList:[],
                followedsList:[]
            }
        },
        created() {
            this.getFollow()
            this.getFollower()
        },
        computed: {
            queryType() {
                return parseInt(this.$route.query.type)
            },
            uid() {
                return parseInt(this.$route.params.uid)
            }
        },
        methods: {
            async getFollow() {
                let {follow} = await this.$store.dispatch('user/getUserFollow',this.uid)
                this.followList = follow
            },
            async getFollower() {
                let {followeds} = await this.$store.dispatch('user/getUserFollower',this.uid)
                this.followedsList = followeds
            },
            async changeFollow({item,index}) {
                let [res] = await to(neteaseApi.follow({
                    id: item.userId,
                    t: 1
                }))
                if(this.queryType === 2) {
                    this.followList[index].followed = true
                }else if(this.queryType === 3) {
                    this.followedsList[index].followed = true
                }
                this.$toast('关注成功')
            },
        },
        components: {
            FollowList
        }
    }
</script>

<style lang="scss" scoped>

</style>