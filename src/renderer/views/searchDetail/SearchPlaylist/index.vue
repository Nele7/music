<template>
  <div>
    <ul class="list-wrapper">
      <li class="list-item" v-for="(item,index) in playlists" :key="index">
        <div class="item" @click="selectItem(item.id)">
          <div class="avatar">
            <img v-lazy="item.coverImgUrl" alt="">
          </div>
          <div class="name">
            <span>{{item.name}}</span>
          </div>
          <div class="count">
            {{item.trackCount}}首
          </div>
          <div class="hint">
            by {{item.creator.nickname}}
          </div>
        </div>
      </li>
    </ul>
    <h4 class="more" v-if="isMore" @click="loadHotMore">
        <a href="#">
            加载更多歌单
            <i class="el-icon-arrow-down"></i>
        </a>
    </h4>
  </div>
</template>

<script>
  export default {
    name:'searchArtist',
    props:{
      playlists:{
        type:Array
      },
      isMore:{}
    },
    data() {
      return {
        
      }
    },
    methods: {
     loadHotMore() {
       this.$emit('loadMore')
     },
     selectItem(id){
       this.$router.push(`/songlistdetail/${id}`)
     }
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.list-wrapper {
 .list-item {
   padding: 10px 30px;
   box-sizing: border-box;
   transition: background 0.2s;
   &:nth-child(2n) {
     background: $background-active;
   }
   &:hover {
     background: $background-active
   }
   .item {
     display: flex;
     flex-direction: row;
     align-items: center;
     .avatar {
       width: 80px;
       height: 80px;
       img {
         width: 100%;
         height: 100%;
         border-radius: 7px;
       }
     }
     .name {
       flex: 1;
       margin-left: 15px;
     }
     .count {
       width: 200px;
       color: $color-base-grey;
       font-size: 12px;
     }
     .hint {
       color: $color-base-grey;
       padding: 3px 8px;
       font-size: 12px;
       width: 120px;
     }
   }
 } 
}
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