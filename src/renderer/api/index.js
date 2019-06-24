import { apiServer } from '../utils/httpUtil'

const apiData = (url, type = 'get') => (params) => apiServer[type](url, params)
// function apiData(url,type) {
//   return function(params){
//     return apiServer[type](url,params)
//   }
// }
export const neteaseApi = {
  // start   登录Api
  phoneLogin: apiData('/login/cellphone'),     // 手机登录
  emailLogin: apiData('/login'),               // 邮箱登录
  logout: apiData('/logout'),                  // 退出登录
  // loginRefresh: apiData('/login/refresh'),     // 刷新登录状态
  // loginStatus: apiData('/login/status'),       // 登录状态
  // end

  // s 用户 api
  sign: apiData('/daily_signin'),              // 用户签到 
  userFollows: apiData('/user/follows'),       // 获取用户--关注列表
  userFollowed: apiData('/user/followeds'),    // 获取用户--粉丝列表
  userEvent: apiData('user/event'),            // 获取用户动态
  userPlayList: apiData('/user/playlist'),     // 获取用户--歌单
  userDetail: apiData('/user/detail'),         // 获取用户--详情
  // userDJ: apiData('/user/dj'),                 // 获取用户--电台
  follow: apiData('/follow'),                  // 关注用户和取消用户
  // e
  
  banner: apiData('/banner'),                         // 首页轮播图
  personalized: apiData('/personalized'),             // 推荐歌单
  exclusive: apiData('/personalized/privatecontent'), // 独家放送
  newsong: apiData('/personalized/newsong'),          // 推荐新音乐
  personalizedmv: apiData('/personalized/mv'),        // 推荐mv
  djprogram: apiData('/personalized/djprogram'),      // 主播电台
  everydaySongs:apiData('/recommend/songs'),          // 每日推荐歌曲
  everydayResource:apiData('/recommend/resource'),    // 每日推荐歌单
}