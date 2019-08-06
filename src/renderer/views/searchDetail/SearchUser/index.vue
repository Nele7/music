<template>
  <div>
    <ul class="list-wrapper">
      <li class="list-item" v-for="(item,index) in userprofiles" :key="index">
        <div class="item">
          <div class="avatar">
            <img :src="item.avatarUrl" alt="">
          </div>
          <div class="name">
            <span>{{item.nickname}}</span>
          </div>
          <div class="hint">
            {{item.signature}}
            <!-- <p>
              <span>专辑:</span>
              <span>{{item.albumSize}}</span>
            </p>
            <p>
              <span>视频:</span>
              <span>{{item.mvSize}}</span>
            </p> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'user',
    props:{
      userprofiles:{
        type:Array
      }
    },
    data() {
      return {
        key: value
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
     }
     .hint {
    //    background: $background-grey;
       color: $color-base-grey;
    //    padding: 3px 8px;
    //    border-radius: 5px;
    //    font-size: 14px;
    //    width: 80px;
    //    p {
    //      line-height: 20px;
    //      span:first-child {
    //         display: inline-block;
    //         width: 45px;
    //         text-align: justify;
    //         text-align-last: justify;
    //      }
    //    }
     }
   }
 } 
}
</style>