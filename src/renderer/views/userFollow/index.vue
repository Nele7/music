<template>
    <div>
        <follow-list :list="followList" v-if="queryType === 2"></follow-list>
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
                let [res] = await to(neteaseApi.userFollows({
                    uid:this.uid
                }))

                this.followList = res.follow
            },
            async getFollower() {
                let [res] = await to(neteaseApi.userFollowed({
                    uid:this.uid
                }))
                this.followedsList = res.followeds
                console.log(res)
            },
            changeFollow() {
                
            }
        },
        components: {
            FollowList
        }
    }
</script>

<style lang="scss" scoped>

</style>