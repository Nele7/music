<template>
  <div>
歌单213
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
  export default {
    name:'songList',
    data() {
      return {
      }
    },
    created(){
      this.getPlaylistHotCategory()
      this.getPlaylistAllCategory()
    },
    computed: {

    },
    methods: {
      async getPlaylistHotCategory() {
        let [res] = await to(neteaseApi.playlistHot())
        console.log('热门分类--',res)
      },
      async getPlaylistAllCategory() {
        let [res] = await to(neteaseApi.playlistCat())
        console.log('所有分类--',res)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>