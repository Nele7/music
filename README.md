This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
使用 el-tooltip 提示框无效的问题
https://github.com/SimulatedGREG/electron-vue/issues/361

# Vue 像素级还原Mac端网易云音乐

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

# 功能

- [x] 手机号、邮箱登录
- [x] 发现音乐推荐、歌单、排行榜、歌手、最新音乐
- [x] 歌手、歌单、专辑、用户详情
- [x] 搜索，搜索结果，搜索历史
- [x] 音乐播放、播放模式、播放列表、播放历史
- [x] 歌词同步、键盘快捷键操作、音量调节
- [x] MV播放、视频播放
- [x] 歌曲、歌单、专辑、歌手、评论
- [x] 用户关注、粉丝列表

- [] 每日歌曲推荐
- [] 主播电台
- [] 主题换肤