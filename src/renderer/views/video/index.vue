<template>
    <div>
      <div>

      </div>
      <div class="loading" v-if="loading">
          <Spinner name="ball-scale-multiple" color="#b31212" />
      </div>
    </div>
</template>

<script>
import { neteaseApi } from "@/api/"
import to from "@/utils/await-to.js"
import Spinner from 'vue-spinkit'

    export default {
      name: 'video',
      data() {
        return {
          loading:false,
        }
      },
      created() {
        this.getVideoTags()
      },
      methods: {
        async getVideoTags() {
          let [res] = await to(neteaseApi.videoTag())
          console.log(res)
        }
      },
      components: {
        Spinner
      }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
@import "@/assets/style/mixin.scss";
.loading {
    @include position(absolute, 0, 0, 0, 0);
    background: #fff;
    z-index: 99999;
    div {
        position: absolute;
        top: 50%;
        left: 50%;
    }
}
</style>