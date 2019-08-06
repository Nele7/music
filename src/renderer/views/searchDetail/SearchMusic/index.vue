<template>
  <div>
      <music-list :musiclist="songs" @select="selectItem"></music-list>
  </div>
</template>

<script>
  import MusicList from '../../songListDetail/MusicList'
  import { musicMixin } from '@/utils/mixin'

  export default {
    name:'searchMusic',
    mixins: [musicMixin],
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
      async selectItem(item){
        try {
          await this.checkMusic(item.id)
          // let { url } = await this.getSongURL(item.id)
          // 插入单首
          console.log(item)
          this.$store.dispatch('player/replaceMusicPlayList',item)
        } catch (error) {
          this.$toast(err.response.data.message)
        }
      }
    },
    components:{
      MusicList
    }
  }
</script>

<style lang="scss" scoped>

</style>