import {ERR_OK} from '../config/'
export default function to(promise) {
  return promise.then(data => {
    if(data.code === ERR_OK && data){
      return [null, data]
    }
  })
  .catch(err => [err])
}