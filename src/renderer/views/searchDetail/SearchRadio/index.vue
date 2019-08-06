<template>
  <div>
    <ul class="list-wrapper">
      <li class="list-item" v-for="(item,index) in djRadios" :key="index">
        <div class="item">
          <div class="avatar">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="name">
            <span>{{item.name}}</span>
          </div>
          <div class="hint">
            by {{item.dj.nickname}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'searchArtist',
    props:{
      djRadios:{
        type:Array
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
     
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
       color: $color-base-grey;
       padding: 3px 8px;
       font-size: 12px;
     }
   }
 } 
}
</style>