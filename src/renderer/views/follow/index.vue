<template>
    <div style="height:100%">
        <follow-list :list="followList" v-if="queryType == 2"></follow-list>
        <follow-list :list="followerList" v-if="queryType == 3" @follow="changeFollow"></follow-list>
    </div>
</template>

<script>
    import FollowList from '@/components/FollowList'
    import * as types from "@/store/mutation_types"
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    export default {
        name:'userDetail',
        data() {
            return {
                queryType:0
            }
        },
        created() {
            this.$store.dispatch('user/getUserEvent')
            this.$store.dispatch('user/getUserFollow')
            this.$store.dispatch('user/getUserFollower')
            this.queryType = this.$route.query.type
        },
        mounted() {
        },
        computed:{
            followList() {
                return this.$store.getters.followList
            },
            followerList() {
                return this.$store.getters.followerList
            }
        },
        methods: {
            // 关注
            async changeFollow({item,index}) {
                // 查看粉丝时，未关注的可以关注
                let [res] = await to(neteaseApi.follow({
                    id: item.userId,
                    t: 1
                }))
                // 关注成功以后，操作数组，
                this.$toast('关注成功')
                this.$store.commit(`user/${types.CHANGE_FOLLOWER}`,{user:res.user,index})
            }
        },
        components: {
            FollowList
        },
        watch:{
            $route({query:{type}}){
                this.queryType = type
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>