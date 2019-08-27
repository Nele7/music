<template>
  <div>
    <ul class="list-wrapper">
      <li class="list-item" v-for="(item,index) in artists" :key="index">
        <div class="item" @click="selectItem(item.id)">
          <div class="avatar">
            <img v-lazy="item.img1v1Url" alt="">
          </div>
          <div class="name">
            <span>{{item.name}}</span>
          </div>
          <div class="hint">
            <p>
              <span>专辑:</span>
              <span>{{item.albumSize}}</span>
            </p>
            <p>
              <span>视频:</span>
              <span>{{item.mvSize}}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <h4 class="more" v-if="isMore" @click="loadHotMore">
        <a href="#">
            加载更多歌手
            <i class="el-icon-arrow-down"></i>
        </a>
    </h4>
  </div>
</template>

<script>
  export default {
    name:'searchArtist',
    props:{
      artists:{
        type:Array
      },
      isMore:{

      }
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
       this.$router.push(`/singerdetail/${id}`)
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
     .hint {
       background: $background-grey;
       color: $color-base-grey;
       padding: 3px 8px;
       border-radius: 5px;
       font-size: 12px;
       width: 80px;
       p {
         line-height: 20px;
         span:first-child {
            display: inline-block;
            width: 45px;
            text-align: justify;
            text-align-last: justify;
         }
       }
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