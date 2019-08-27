# 运行
```
$ git clone git@github.com:Nele7/music.git
$ npm install （不建议使用cnpm install原因：打包时候会有问题）
$ npm run dev
```
# Vue 像素级还原Mac端网易云音乐

前一阵子学习了Vue，为了巩固所学的知识和提高实战经验，决定自己手撸一款网易云音乐。因为听歌一直在用网易云音乐，所以突发奇想就做一款仿网易云音乐吧！开发中遇到了很多在学习中没有遇到过的坑，也很感谢在我改不出BUG时给予帮助的老师同学！本着学习和分享的目的,希望能给你带来一点帮助,大佬轻点喷。

# 技术栈
- `Vue.js` ：用于构建用户界面的 MVVM 框架
- `Vue-cli3`：Vue 脚手架工具，快速初始化项目代码
- `Vue-Router`：页面路由切换
- `Vuex`：实现不同组件间的状态共享
- `Vue-lazyload`：实现图片懒加载，节省用户流量，提升页面加载速度
- `Element-ui`：快速构建页面UI框架
- `Axios`：一个基于 Promise 的 HTTP 库，向后端发起请求
- `Scss`：css预处理器
- `ES6、ES7`：采用ES6、ES7语法，箭头函数、Promise、async...await等等很nice
- `localStorage`：保存用户信息、搜索历史记录、最近播放歌单、播放历史....
- `NeteaseCloudMusicApi`：[网易云音乐 NodeJS 版 API](https://github.com/Binaryify/NeteaseCloudMusicApi)，提供音乐数据
- `iconfont` ：阿里巴巴图标库

# 功能

### 已完成
- [x] 手机号、邮箱登录
- [x] 发现音乐推荐、歌单、排行榜、歌手、最新音乐
- [x] 歌手、歌单、专辑、用户详情
- [x] 搜索，搜索结果，搜索历史
- [x] 音乐播放、播放模式、播放列表、播放历史
- [x] 歌词同步、键盘快捷键操作、音量调节
- [x] MV播放、视频播放
- [x] 歌曲、歌单、专辑、歌手、评论
- [x] 用户关注、粉丝列表
- [x] 主题换肤(浅色，深色，红色)

### 未完成
- [ ] 每日歌曲推荐
- [ ] 主播电台

#### 快捷键
Description|Keys
---|---
播发/暂停|<kbd>Space</kbd>
音量加|<kbd>Up</kbd>
音量减|<kbd>Down</kbd>
上一曲|<kbd>Ctrl</kbd>+<kbd>left</kbd>
下一曲|<kbd>Ctrl</kbd>+<kbd>right</kbd>
喜欢歌曲|<kbd>Ctrl</kbd>+<kbd>L</kbd>


# 预览
> 项目演示地址：[戳我](http://wyhan.art)

> 项目源码地址：[戳我](https://github.com/Nele7/music)

> win桌面版地址：[戳我]()

> mac桌面版地址：[戳我]()

>如果觉得我的项目还不错的话，就给个 star 鼓励一下吧~

### 部分截图
![推荐页](https://user-gold-cdn.xitu.io/2019/8/24/16cc321da4b17fb0?w=2000&h=1662&f=png&s=3069205)

![播放页](https://user-gold-cdn.xitu.io/2019/8/24/16cc34afa163af9e?w=2000&h=1340&f=png&s=1262488)

![最新音乐](https://user-gold-cdn.xitu.io/2019/8/24/16cc327fe7948120?w=2040&h=1412&f=png&s=471472)

![歌单](https://user-gold-cdn.xitu.io/2019/8/24/16cc32dacfcfe074?w=2000&h=1340&f=png&s=2130335)

![歌单详情](https://user-gold-cdn.xitu.io/2019/8/24/16cc32dacfcfe074?w=2000&h=1340&f=png&s=2130335)

![MV](https://user-gold-cdn.xitu.io/2019/8/24/16cc32e67e98d0e0?w=2040&h=1412&f=png&s=1322293)

![MV详情](https://user-gold-cdn.xitu.io/2019/8/24/16cc32ed42936ebe?w=2000&h=1662&f=png&s=814324)

![搜索、播放列表](https://user-gold-cdn.xitu.io/2019/8/24/16cc32f284b7ddb3?w=2040&h=1412&f=png&s=390877)

![排行榜](https://user-gold-cdn.xitu.io/2019/8/24/16cc32f71fcb86cb?w=2018&h=1374&f=png&s=509293)

![歌手详情](https://user-gold-cdn.xitu.io/2019/8/24/16cc34bc33622276?w=2000&h=1662&f=png&s=858546)

# 项目结构
```
├─.electron-vue
├─.idea
├─build                                         // 构建相关
├─dist                                          // 
├─node_modules                                  // 依赖相关
├─src                                           // 源代码
│  ├─main                                       // 主进程
│  └─renderer                                   
│      ├─api                                    // api接口
│      ├─assets                                 // 图标字体等静态资源
│      ├─components                             // 全局公用组件。不直接显示
│      │  ├─AlbumList                           // 专辑列表组件
│      │  ├─CommentInput                        // 回复评论输入框组件
│      │  ├─CommentList                         // 回复评论列表组件
│      │  ├─expectation                         // 敬请期待组件
│      │  ├─FollowList                          // 关注粉丝列表组件
│      │  ├─MusicList                           // 歌曲组件
│      │  ├─PlayerProgress                      // 进度条组件
│      │  ├─PlayList                            // 歌单列表组件
│      │  ├─RecommendList                       // 推荐组件
│      │  ├─SingerList                          // 歌手列表组件
│      │  └─VideoList                           // 视频列表组件    
│      ├─config                                 // 配置相关
│      ├─layout                                 // 总体布局
│      ├─router                                 // 路由
│      ├─store                                  // 全局store管理
│      ├─utils                                  // 全局公用方法
│      └─views                                  // view视图层
│          ├─albumDetail                        // 专辑详情页面
│          ├─audioVisual                        // 视频页面页面
│          ├─avDetail                           // 视频详情页面        
│          ├─discoverMusic                      // 推荐歌曲页面       
│          │  ├─newMusic                        // 推荐歌曲最新音乐页面
│          │  ├─radio                           // 推荐歌曲电台页面
│          │  ├─rank                            // 推荐歌曲排行页面
│          │  ├─recommend                       // 推荐歌曲首页页面
│          │  ├─singer                          // 推荐歌曲歌手页面
│          │  └─songList                        // 推荐歌曲歌单页面
│          ├─fm                                 // 私人FM页面    
│          ├─loginDialog                        // 登录页面    
│          ├─menus                              // 左侧菜单栏页面
│          ├─mv                                 // mv页面
│          ├─mvDetail                           // mv详情页面        
│          ├─pal                                // 朋友页面
│          ├─player                             // 播放页面
│          ├─search                             // 搜索页面
│          ├─searchDetail                       // 搜索详情页面
│          ├─singerDetail                       // 歌手详情页面
│          ├─songListDetail                     // 歌单详情页面
│          ├─userDetail                         // 用户详情页面    
│          ├─userFollow                         // 用户关注页面
│          └─userInfo                           // 用户信息页面
├─static
└─test
```

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
使用 el-tooltip 提示框无效的问题
https://github.com/SimulatedGREG/electron-vue/issues/361