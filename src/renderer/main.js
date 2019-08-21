import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './assets/style/index.scss'
import './assets/iconfont/font_1289985_mce6mjejuw/iconfont.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
Vue.use(Toast, {
  type: 'center'
});

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/image/default.png')
})

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import'vue-video-player/src/custom-theme.css'
Vue.use(VideoPlayer)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
