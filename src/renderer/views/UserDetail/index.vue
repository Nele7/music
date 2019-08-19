<template>
  <div class="user-detail-wrapper">
    <div>
      <div class="user-info-wrapper">
        <div class="cover-img">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <div class="info">
          <h4>{{userInfo.nickname}}</h4>
          <div class="tools">
            <div class="btn-group">
              <span class="level">LV {{level}}</span>
              <span class="sex">
                <i class="iconfont" :class="getGender(userInfo.gender)"></i>
              </span>
            </div>
            <div class="follow-wrapper">
              <span @click="toggleFollow" class="follow">
                <i class="el-icon-plus"></i>
                关注
              </span>
            </div>
          </div>
          <div class="event">
            <ul class="list">
              <li class="item">
                <span>{{userInfo && userInfo.eventCount}}</span>
                <span>动态</span>
              </li>
              <li class="item">
                <span>{{userInfo && userInfo.follows}}</span>
                <span>关注</span>
              </li>
              <li class="item">
                <span>{{userInfo &&userInfo.followeds}}</span>
                <span>粉丝</span>
              </li>
            </ul>
          </div>
          <div class="desc">
            <p>
              <span>个人介绍:</span>
              {{userInfo.description || '暂无介绍'}}
            </p>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import { neteaseApi } from "@/api/"
  import to from "@/utils/await-to.js"
  export default {
    data() {
      return {
        userInfo:{},
        level:null,
      }
    },
    created() {
      this.getUserDetail()
    },
    computed: {
      userId() {
        return parseInt(this.$route.params.uid)
      }
    },
    methods: {
      async getUserDetail() {
        let [res] = await to(neteaseApi.userDetail({
          uid:this.userId
        }))
        this.userInfo = res.profile
        this.level = res.level
        console.log(res)
      },
      // 获取性别
      getGender(gender) {
          return gender === 0 ? '' : (gender === 1 ? 'icon-nan' : 'icon-nv')
      },
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.user-detail-wrapper {

  .user-info-wrapper {
    display: flex;

    .cover-img {
      width: 200px;
      height: 200px;
      padding: 20px 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      flex:1;
      padding: 20px 20px 20px 0;
      h4 {
        margin: 0;
        font-size: 23px;
      }
      .tools {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .btn-group {
          .level {
            background: $background-undertintgrey;
            padding: 2px 10px;
            font-size: 12px;
          }
          .sex {
            .iconfont {
              font-size: 12px;
              padding: 2px 10px;
              border-radius: 10px;
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
          
        }
        .follow-wrapper {
          width: 95px;
          text-align: center;
          height: 100%;
          font-size: 14px;
          span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: $font-size-text-small;
            border-radius: 28px;
            padding: 0 14px;
            background: rgb(252, 243, 244);
            &.follow {
              color: $color-base-red;
              cursor: pointer;
            }
            &.followed {
              color: $color-base-grey;
            }
          }
        }
      }

      .event {
        display: flex;
        .list {
          width: 240px;
          display: flex;
          flex-direction: row;
          .item {
            flex: 1;
            height: 80px;
            line-height: 80px;
            border-right: 1px solid;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>