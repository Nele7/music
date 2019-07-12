import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './assets/style/index.scss'
import './assets/iconfont/font_1289985_ycgqjhh3eml/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'
Vue.use(Toast, {
  type: 'center'
});
// import moment from 'moment'
// Vue.moment = Vue.prototype.$moment = moment;//赋值使用
// moment.locale('zh-cn');
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
