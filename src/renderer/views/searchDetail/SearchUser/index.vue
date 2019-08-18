<template>
  <div>
    <ul class="list-wrapper">
      <li class="list-item" v-for="(item,index) in userprofiles" :key="index" @click="selectUid(item)">
        <div class="item">
          <div class="avatar">
            <img v-lazy="item.avatarUrl" alt="">
          </div>
          <div class="name">
            <span>{{item.nickname}}</span>
            <i class="iconfont" :class="getGender(item.gender)"></i>
          </div>
          <div class="hint">
            {{item.signature}}
            
          </div>
        </div>
      </li>
    </ul>
    <h4 class="more" v-if="isMore" @click="loadHotMore">
        <a href="#">
            加载更多用户
            <i class="el-icon-arrow-down"></i>
        </a>
    </h4>
  </div>
</template>

<script>
  export default {
    name:'user',
    props:{
      userprofiles:{
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
     getGender(gender) {
            return gender === 0 ? '' : (gender === 1 ? 'icon-nan' : 'icon-nv')
      },
      selectUid(item) {
        this.$router.push(`/userdetail/${item.userId}`)
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
       .iconfont {
          font-size: 12px;
          padding: 2px;
          border-radius: 50%;
        }
        .icon-nv {
          background: rgb(255, 193, 227);
          color: rgb(220, 43, 113);
        }
        .icon-nan {
          background: rgb(192, 240, 255);
          color: rgb(48, 141, 197);
        }
     }
     .hint {
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