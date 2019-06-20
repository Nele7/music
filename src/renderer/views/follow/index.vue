<template>
    <div>
        {{this.$route.query.type}}
    </div>
</template>

<script>
    export default {
        name:'userDetail',
        data() {
            return {
                queryType:0
            }
        },
        created() {
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