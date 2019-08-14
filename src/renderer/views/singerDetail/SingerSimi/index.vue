<template>
  <div style="padding:20px">
    <singer-list :list="simiArtis"></singer-list>
  </div>
</template>

<script>
  import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import { formatDateTime } from '@/utils/util'
import SingerList from '@/components/SingerList'
export default {
    props: ['id'],
    data() {
        return {
            simiArtis: []
        }
    },
    activated() {
      this.getSimiArtist()
    },
    computed: {

    },
    methods: {
        async getSimiArtist(id) {
            let [res] = await to(neteaseApi.simiArtist({
                id: this.id
            }))
            this.simiArtis = res.artists
            console.log(res)
        },
        selectSinger(id) {
          this.$emit('selectSinger',id)
        }
    },
    components: {
      SingerList
    },
    filters: {
        formatDateTime
    },
    watch: {
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.simi-artist-wrapper {
  .list {
    margin-bottom: 10px;
    .list-item {
      position: relative;
      padding-bottom: 100%;
      width: 100%;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      img {
        @include position(absolute,0,0,0,0,100%);
        border-radius: 4px;
        transition: all 0.5s;
        &:hover {
          transform: scale(1.2)
        }
      }
    }
    p {
      margin: 5px 0;
      font-size: 13px;
      cursor: pointer;
    }
  }
}
</style>