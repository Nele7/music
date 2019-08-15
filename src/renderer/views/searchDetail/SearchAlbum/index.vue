<template>
  <div>
    <ul class="list-wrapper">
      <li class="list-item" v-for="(item,index) in albums" :key="index">
        <div class="item">
          <div class="avatar">
            <img v-lazy="item.blurPicUrl" alt="">
          </div>
          <div class="name">
            <span>{{item.name}}</span>
            <span v-for="(alias,index) in item.alias" :key="index" class="alias">{{alias}}</span>
          </div>
          <div class="hint">
            {{item.artist.name}}
          </div>
        </div>
      </li>
    </ul>
    <h4 class="more" v-if="isMore" @click="loadHotMore">
        <a href="#">
            加载更多专辑
            <i class="el-icon-arrow-down"></i>
        </a>
    </h4>
  </div>
</template>

<script>
  export default {
    name:'searchAlbum',
    props:{
      albums:{
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
     background: #f9f9f9;
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
       .alias{
         color: $color-base-grey;
         font-size: 12px;
       }
     }
     .hint {
       width: 250px;
       color: $color-base-grey;
       font-size: 12px;
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