<template>
  <div class="search-video-wrapper">
    <video-list :isMore="isMore" :videos="videos" @selectId="selectId"></video-list>
  </div>
</template>

<script>
  import {covertUnit,formatTimeMMSS} from '@/utils/util.js'
  import VideoList from '@/components/VideoList/'
  export default {
    name:'searchVideo',
    props:{
      videos:{
        type:Array
      },
      isMore:{

      }
    },
    methods: {
      loadHotMore() {
       this.$emit('loadMore')
     },
     selectId(item) {
       console.log(item)
       this.$router.push(`/avdetail/${item.vid}`)
     }
    },
    filters: {
      covertUnit,
      formatTimeMMSS
    },
    components: {
      VideoList
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.search-video-wrapper {
  padding: 10px 30px;
}

</style>