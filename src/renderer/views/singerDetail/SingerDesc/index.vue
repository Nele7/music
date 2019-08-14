<template>
  <div class="desc-wrapper">
    <h4>简介</h4>
    <div class="desc">{{desc}}</div>
    <div v-for="(item,index) in introduction" :key="index" class="desc-item">
      <h4 class="title">{{item.ti}}</h4>
      <pre>{{item.txt}}</pre>
    </div>
  </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
  export default {
    props:['id'],
    data() {
      return {
        introduction:[],
        desc:''
      }
    },
    created() {
      this.getSingerDesc()
    },
    computed: {

    },
    methods: {
      async getSingerDesc() {
        let [res] = await to(neteaseApi.artistDesc({
          id:this.id
        }))
        this.desc = res.briefDesc
        this.introduction = res.introduction
        console.log(res)
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.desc-wrapper {
  padding: 20px;
  .desc {
    color:$color-base-grey;
    text-indent: 18px;
  }
  .desc-item {
    pre {
      color:$color-base-grey;
      white-space: pre-wrap;
      text-indent: 18px;
    }
  }
}
</style>