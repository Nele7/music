<template>
  <div class="comment-list-wrapper">
    <div class="comment-list">
      <h4>{{title}}</h4>
      <div class="comment-item" v-for="(item,index) in commentlist" :key="index">
        <div class="avatar">
          <img v-lazy="item.user.avatarUrl" :alt="item.user.nickname" @click="selectName(item)">
        </div>
        <div class="content">
          <div class="text">
              <span class="name" @click="selectName(item)">{{item.user.nickname}}：</span>
              {{item.content}}
          </div>
          <div class="other-reply text" v-if="item.beReplied && item.beReplied.length">
            <span class="name">@{{item.beReplied[0].user.nickname}}：</span>
            {{item.beReplied[0].content}}
          </div>
          <div class="meta">
            <span class="time">{{item.time | formatterTime}}</span>
            <div class="tools">
              <div class="praise" :class="{'active':item.liked}" @click="toggleCommentLike(index)">
                <i class="iconfont" :class="item.liked?'icon-icon':'icon-zan1'"></i>
                {{item.likedCount}}
              </div>
              <div class="block">
                <i class="iconfont icon-fenxiang"></i>
              </div>
              <div class="block">
                <i class="el-icon-chat-line-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatterTime} from '@/utils/util'
  export default {
    props: {
      title:{
        type:String,
        default(){
          return ''
        }
      },
      commentlist: {
        type:Array,
      }
    },
    created(){
    },
    methods: {
      toggleCommentLike(index) {
        this.$emit('toggleCommentLike',index)
      },
      selectName(item) {
        this.$emit('selectName',item.user.userId)
      }
    },
    filters: {
      formatterTime
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.comment-list-wrapper {
  .comment-list {
    padding: 0 20px;
    .comment-item {
      display: flex;
      flex-direction: row;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid $color-border;
        .text{
          font-size: 14px;
          .name {
            color:rgb(60, 94, 187);
            cursor: pointer;
          }
        }
        .other-reply {
          font-size: 13px;
          margin-top: 10px;
          padding: 5px;
          background:  $background-grey;
           line-height: 20px;
        }
        .meta {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          .time {
            color:#969696;
            font-size: 13px;  
          }
          .tools {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: #666;
            .praise {
              font-size: 13px;
              line-height: 18px;
              margin-right: 10px;
              &.active {
                color:#b31212;
              }
            }
            .block{
              width: 50px;
              height: 18px;
              text-align: center;
              &:nth-child(1) {
                margin-right: 5px;
              }
              &:nth-child(2){
                border-left: 1px solid $color-border;
                border-right: 1px solid $color-border;
              }
            }
          }
        }
      }
    }
  }
}
</style>