<template>
  <div class="mvtop-wrapper">
    <ul class="mvtop">
      <li v-for="(item,index) in list" :key="index" class="mvtop-item">
          <a href="#" class="mvtop-group">
              <div class="index">
                  {{index+1}}
              </div>
              <div class="cover-img" @click="selectId(item.id)">
                  <img :src="item.cover" alt="">
              </div>
              <div class="info">
                  <p class="name">{{item.name}}</p>
                  <p class="singer">
                      <span v-for="(ar,i) in item.artists" :key="ar.id">
                          {{ar.name}} 
                          <i v-if="i !== item.artists.length - 1">/</i>
                      </span>
                  </p>
                  <p class="brief" v-if="item.briefDesc">{{item.briefDesc}}</p>
              </div>
          </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['list'],
    data() {
      return {
      }
    },
    created() {

    },
    computed: {

    },
    methods: {
      selectId(id) {
        this.$router.push(`/mvdetail/${id}`)
      }
    },
    watch: {
        
    }
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/assets/style/variables.scss";
.mvtop-wrapper {
  .mvtop {
    display: flex;
    flex-wrap: wrap;
    .mvtop-item {
      width: 50%;
      padding: 5px;
      box-sizing: border-box;
      &:nth-child(2n+1) {
        border-right: 1px solid $color-border;
      }
      .mvtop-group {
        display: flex;
        align-items: center;
        height: 105px;
        .index {
          text-align: center;
          width: 45px;
          font-size: 23px;
          color:$color-base-grey;
        }
        .cover-img {
          width: 168px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        }
        .info {
          flex:1;
          font-size: 13px;
          padding-left: 10px;
          height: 100%;
          min-width: 170px;
          color:$color-base-black;
          p {
            margin-top: 15px;
            @include ellipsized;
          }
          .name {
            
          }
          .singer {
            font-size: 12px;

            color:$color-simple-black
          }
          .brief {
            font-size: 12px;
            color:$color-base-grey;
          }
        }
      }
    }
  }
}
</style>