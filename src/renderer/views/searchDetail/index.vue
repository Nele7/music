<template>
    <div>
        123
<!-- {{$route.params.keywords}} -->
    </div>
</template>

<script>
    import { neteaseApi } from "@/api/"
    import to from "@/utils/await-to.js"
    export default {
        name:'searchdetail',
        data() {
            return {
                // keywords:null
            }
        },
        created() {
            console.log(12)
            // if(this.keywords){
                this.getSearch()
            // }
        },
        computed: {
            keywords() {
                return this.$route.params.keywords
            }
        },
        methods: { 
            async getSearch() {
                let [res] = await to(neteaseApi.search({
                    keywords:this.keywords,
                    type:10
                }))
                console.log(res)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>