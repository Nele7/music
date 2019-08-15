export const commentListType = {
    music_type:0,
    mv_type:1,
    songlist_type:2,
    album_type:3,
    station_type:4,
    video_type:5
}

export const searchTabList = [
    {
        tab:'单曲',
        type:1,
        component:'SearchMusic'
    },
    {
        tab:'歌手',
        type:100,
        component:'SearchArtist'
    },
    {
        tab:'专辑',
        type:10,
        component:'SearchAlbum'
    },
    {
        tab:'视频',
        type:1014,
        component:'SearchVideo'
    },
    {
        tab:'歌单',
        type:1000,
        component:'SearchPlaylist'
    },
    {
        tab:'歌词',
        type:1006,
        component:'SearchLyric'
    },
    {
        tab:'主播电台',
        type:1009,
        component:'SearchRadio'
    },
    {
        tab:'用户',
        type:1002,
        component:'SearchUser'
    },
]

export const rankMusicType = {
    newMusic:0,               // 云音乐新歌榜
    hotMusic:1,              //  云音乐热歌榜
    originalMusic:2,         //  网易原创歌曲榜
    soaringMusic:3,          //  云音乐飙升榜
}

export const singerCatlist = [
    {
        name:'华语男歌手',
        catCode:1001
    },
    {
        name:'华语女歌手',
        catCode:1002
    },
    {
        name:'华语组合/乐队',
        catCode:1003
    },
    {
        name:'欧美男歌手',
        catCode:2001
    },
    {
        name:'欧美女歌手',
        catCode:2002
    },
    {
        name:'欧美组合/乐队',
        catCode:2003
    },
    {
        name:'其他男歌手',
        catCode:4001
    },
    {
        name:'其他女歌手',
        catCode:4002
    },
    {
        name:'其他组合/乐队',
        catCode:4003
    },
    {
        name:'入驻歌手',
        catCode:5001
    },
    {
        name:'日本男歌手',
        catCode:6001
    },
    {
        name:'日本女歌手',
        catCode:6002
    },
    {
        name:'日本组合/乐队',
        catCode:6003
    },
    {
        name:'韩国男歌手',
        catCode:7001
    },
    {
        name:'韩国女歌手',
        catCode:7002
    },
    {
        name:'韩国组合/乐队',
        catCode:7003
    },
]

export const alphalist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'

export const topSongTabListType = [
    {
        name:'全部',
        type:0
    },
    {
        name:'华语',
        type:7
    },
    {
        name:'欧美',
        type:96
    },
    {
        name:'日本',
        type:8
    },
    {
        name:'韩国',
        type:16
    },
]