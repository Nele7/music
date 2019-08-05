<template>
  <div>
      <music-list :musiclist="songs" @select="selectItem"></music-list>
  </div>
</template>

<script>
  import MusicList from '../../songListDetail/MusicList'
  export default {
    name:'searchMusic',
    props: {
      songs: {
        type: Array
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      selectItem(){
        
      }
    },
    components:{
      MusicList
    }
  }
</script>

<style lang="scss" scoped>

</style>