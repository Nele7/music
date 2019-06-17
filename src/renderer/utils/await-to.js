import Vue from 'vue'
import {ERR_OK,DEFAULT_ERR_MSG} from '../config/'

export default function to(promise) {
  return promise.then(data => {
    if(data.code === ERR_OK && data){
      return [data]
    }else{
      Vue.prototype.$toast(DEFAULT_ERR_MSG)
    }
  })
  .catch(err => {
    if(err.response.data.msg && err){
      Vue.prototype.$toast(err.response.data.msg)
    }else{
      Vue.prototype.$toast(DEFAULT_ERR_MSG)
    }
  })
}