const getters = {
    // s user.js
    uid: state => state.user.userInfo.userId,
    userInfo: state => state.user.userInfo,
    loginStatus: state => state.user.userLoginStatus,
    signStatus: state => state.user.userSignStatus,
    playList: state => state.user.userPlayList,
    userInfoLoading: state => state.user.userInfoLoading,
    theme: state => state.user.userTheme,
    // e

    // s toggle.js
    showLoginDialog: state => state.toggle.showLoginDialog,
    showUserInfoDetail: state => state.toggle.showUserInfoDetail,
    showPlayerListDialog: state => state.toggle.showPlayerListDialog,
    // e

    // s player.js
    playerList: state => state.player.playList,
    sequentList: state => state.player.sequentList,
    playerStatus: state => state.player.playStatus,
    playCurrentIndex: state => state.player.playCurrentIndex,
    playMode: state => state.player.playMode,
    playerHistory: state => state.player.playerHistory,
    currentMusic: state => state.player.playList[state.player.playCurrentIndex] || {
        name:'让生活充满音乐',
        album: {
            picUrl:'http://p3.music.126.net/n6TbquCbGzIpJS9t6VGD2A==/109951164208864013.jpg'
        }
    },
    // e
}

export default getters