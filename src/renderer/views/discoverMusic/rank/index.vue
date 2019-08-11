<template>
    <div class="rank-wrapper">

    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"

export default {
    data() {
        return {
            
        }
    },
    mounted() {
        this.getTopList()
    },
    computed: {
    },
    methods: {
       async getTopList() {
           let [res] = await to(neteaseApi.topDetail())
           console.log(res)
       }
    },
    components: {
    },
    
    watch: {
        
    }
}
</script>

<style scoped>
.test > div {
    margin: 20px 0;
}
</style>