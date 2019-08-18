import { apiServer } from '../utils/httpUtil'

const apiData = (url, type = 'get') => (params) => apiServer[type](url, params)

export const neteaseApi = {
  // s   登录 api
  phoneLogin: apiData('/login/cellphone'),     // 手机登录
  emailLogin: apiData('/login'),               // 邮箱登录
  logout: apiData('/logout'),                  // 退出登录
  // loginRefresh: apiData('/login/refresh'),     // 刷新登录状态
  // loginStatus: apiData('/login/status'),       // 登录状态
  // e

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
  
  // s 个性推荐 api
  banner: apiData('/banner'),                          // 首页轮播图
  personalized: apiData('/personalized'),              // 推荐歌单
  exclusive: apiData('/personalized/privatecontent'),  // 独家放送
  newsong: apiData('/personalized/newsong'),           // 推荐新音乐
  personalizedmv: apiData('/personalized/mv'),         // 推荐mv
  djprogram: apiData('/personalized/djprogram'),       // 主播电台
  everydaySongs: apiData('/recommend/songs'),          // 每日推荐歌曲
  everydayResource: apiData('/recommend/resource'),    // 每日推荐歌单
  // e

  // s 歌单详情 api
  playlistDetail: apiData('/playlist/detail'),        // 获取歌单详情
  likelist: apiData('/likelist'),                     // 获取喜欢的音乐列表
  like: apiData('/like'),                             // 喜欢音乐
  subscribePlaylist: apiData('/playlist/subscribe'),  // 收藏歌单
  plSubscribers: apiData('/playlist/subscribers'),    // 歌单收藏者
  // e 

  // s 评论 api
  comment: apiData('/comment'),                       // 发送/删除评论
  commentHot: apiData('/comment/hot'),                // 热门评论
  commentLike: apiData('comment/like'),               // 给评论点赞
  commentPlaylist: apiData('/comment/playlist'),      // 歌单评论
  commentAlbum: apiData('/comment/album'),            // 专辑评论
  commentMv: apiData('/comment/mv'),                  // mv 评论
  commentVideo: apiData('/comment/video'),            // 视频评论
  // e

  // s 播放器api
  checkMusic: apiData('/check/music'),                // 检测音乐是否可用
  songURL: apiData('/song/url'),                      // 获取音乐URL
  lyric: apiData('/lyric'),                           // 获取歌词
  record: apiData('/user/record'),                    // 用户播放记录
  // e
  
  // s 搜索api
  hotSearch: apiData('/search/hot'),                  // 热门搜索(简略)
  search: apiData('/search'),                         // 搜索
  searchSuggest: apiData('/search/suggest'),          // 搜索建议
  // e

  // s 歌单api
  playlistCat: apiData('/playlist/catlist'),          // 全部歌单分类
  playlistHot: apiData('/playlist/hot'),              // 热门歌单分类
  playlistTop: apiData('/top/playlist'),              // 歌单
  // e

  // s 排行榜api
  toplist: apiData('/top/list'),                      // 排行榜
  topDetail: apiData('/toplist'),                     // 所有榜单内容摘要
  // e

  // s 歌手api
  topArtists: apiData('/top/artists'),                // 热门歌手
  artistlist: apiData('/artist/list'),                // 歌手分类
  artists: apiData('/artists'),                       // 歌手单曲
  artistSub: apiData('/artist/sub'),                  // 收藏歌手
  artistMv: apiData('/artist/mv'),                    // 歌手M V
  artistAlbum: apiData('/artist/album'),              // 歌手专辑
  artistDesc: apiData('/artist/desc'),                // 歌手描述
  simiArtist: apiData('/simi/artist'),                // 相似歌手
  // simiPlaylist: apiData('/simi/playlist'),            // 相似歌单
  // simiSong: apiData('/simi/song'),                    // 相似音乐
  // e

  // s 最新音乐api
  topSong: apiData('/top/song'),                      // 新歌速递
  topAlbum: apiData('/top/album'),                    // 新碟上架
  // e

  // s 专辑详情api
  album: apiData('/album'),                           // 专辑详情
  // albumSub: apiData('/album/sub'),                    // 收藏取消专辑
  // albumSublist: apiData('/album/sublist'),            // 获取已收藏的专辑列表
  // e

  // s 视频api
  videoTag: apiData('/video/group/list'),             // 获取视频标签列表
  videoGroup: apiData('/video/group'),                // 获取视频标签下的视频
  videoRelated: apiData('/related/allvideo'),         // 相关视频
  videoDetail: apiData('/video/detail'),              // 视频详情
  videoUrl: apiData('/video/url'),                    // 获取视频播放地址
  // e

  resourceLike: apiData('/resource/like'),            // 资源点赞（mv，视频）

  // s MV api
  mvTop: apiData('/top/mv'),                          // mv排行榜
  mvDetail: apiData('/mv/detail'),                    // mv数据
  mvUrl: apiData('/mv/url'),                          // mv地址
  mvSub: apiData('/mv/sub'),                          // mv收藏
  // e
}