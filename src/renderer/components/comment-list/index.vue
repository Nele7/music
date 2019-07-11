<template>
  <div class="comment-list-wrapper">
    <div class="comment-list">
      <div class="comment-tiem">
        <div class="avatar">
          <img src="https://p3.music.126.net/2fdyC-Gix6v72i7MkU4OyQ==/109951162933281005.jpg" alt="">
        </div>
        <div class="content">
          <div class="text">
              <span class="name">FreezeMee:</span>
              据说，做这个歌单的员工在做完这个歌单以后神秘失踪了，现场十分诡异，只留下了一个篮球。。。
          </div>
          <div class="meta">
            <span class="time">03:32</span>
            <div class="tools">
              <div class="praise active">
                <i class="iconfont icon-icon"></i>
                1234324
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
      <div class="comment-tiem">
        <div class="avatar">
          <img src="https://p3.music.126.net/2fdyC-Gix6v72i7MkU4OyQ==/109951162933281005.jpg" alt="">
        </div>
        <div class="content">
          <div class="text">
              <span class="name">FreezeMee:</span>
              据说，做这个歌单的员工在做完这个歌单以后神秘失踪了，现场十分诡异，只留下了一个篮球。。。
          </div>
          <div class="other-reply text">
            <span class="name">@Message:</span>
            四级？？？初中生感觉不难啊。。。
          </div>
          <div class="meta">
            <span class="time">03:32</span>
            <div class="tools">
              <div class="praise">
                <i class="iconfont icon-icon"></i>
                1
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
  export default {
    
  }
</script>

<style lang="scss" scoped>
.comment-list-wrapper {
  .comment-list {
    .comment-tiem {
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
        }
      }
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #e9e9e9;
        .text{
          font-size: 14px;
          .name {
            color:rgb(60, 94, 187)
          }
        }
        .other-reply {
          font-size: 13px;
          margin-top: 10px;
          padding: 5px;
          background: rgba(233, 233, 233, 0.575);
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
                border-left: 1px solid #e9e9e9;
                border-right: 1px solid #e9e9e9;
              }
            }
          }
        }
      }
    }
  }
}
</style>