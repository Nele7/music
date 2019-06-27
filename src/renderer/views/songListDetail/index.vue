<template>
  <div>
    {{this.$route.params.id}}
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
  export default {
    name: 'songlistdetail',
    data() {
      return {
        
      }
    },
    created() {
      this.getPlayListDetail()
      console.log(this.$route.params.id)
    },
    computed: {
      songId() {
        return parseInt(this.$route.params.id)
      },
    },
    methods: {
      // 获取歌单详情
      async getPlayListDetail() {
        let [res] = await to(neteaseApi.playlistDetail({
          id: this.songId
        }))
        console.log(res)
      }
      
    },
  }
</script>

<style lang="scss" scoped>

</style>