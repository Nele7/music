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