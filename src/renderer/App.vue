<template>
  <div id="app" :class="getTheme" v-cloak>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'music',
    computed: {
      getTheme() {
        return this.$store.getters.theme
      }
    }
  }
</script>

<style>
/* CSS */
#app {
  height: 100%;
  width: 100%;
}
[v-cloak] {
  color: transparent;
  -webkit-text-fill-color: transparent;
}

</style>
