import { apiServer } from '../utils/httpUtil'

const apiData = (url, type = 'get') => (params) => apiServer[type](url, params)
// function apiData(url,type) {
//   return function(params){
//     return apiServer[type](url,params)
//   }
// }
export const neteaseApi = {
  phoneLogin: apiData('/login/cellphone'),     // 手机登录
  emailLogin: apiData('/login'),               // 邮箱登录
}