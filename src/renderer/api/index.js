import { apiServer } from '../utils/httpUtil'

const apiData = (url, type = 'get') => (params) => apiServer[type](url, params)
// function apiData(url,type) {
//   return function(params){
//     return apiServer[type](url,params)
//   }
// }
export const neteaseApi = {
  // 登录
  phoneLogin: apiData('/login/cellphone'),     // 手机登录
  emailLogin: apiData('/login'),               // 邮箱登录
  logout: apiData('/logout'),                  // 退出登录
  // loginStatus: apiData('/login/status'),       // 登录状态             
  userPlayList: apiData('/user/playlist'),     // 获取用户歌单
}