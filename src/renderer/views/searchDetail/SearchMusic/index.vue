<template>
  <div>
      <music-list :musiclist="songs" @select="selectItem"></music-list>
      <h4 class="more" v-if="isMore" @click="loadHotMore">
          <a href="#">
              加载更多单曲
              <i class="el-icon-arrow-down"></i>
          </a>
      </h4>
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
      },
      isMore:{

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
          // 插入单首
          console.log(item)
          this.$store.dispatch('player/replaceMusicPlayList',item)
        } catch (error) {
          this.$toast(error.response.data.message)
        }
      },
      loadHotMore() {
        this.$emit('loadMore')
      }
    },
    components:{
      MusicList
    }
  }
</script>

<style lang="scss" scoped>
.more {
    text-align: center;
    a {
        display: inline-block;
        background: #fff;
        border: 1px solid #e9e9e9;
        border-radius: 15px;
        color: #666;
        padding: 4px 16px;
        font-size: 13px;
        font-weight: 400;
        &:hover {
            background: rgba(223, 223, 223, 0.555);
        }
    }
}

</style>