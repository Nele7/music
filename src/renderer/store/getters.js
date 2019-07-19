const getters = {
    // s user.js
    uid: state => state.user.userInfo.userId,
    userInfo: state => state.user.userInfo,
    loginStatus: state => state.user.userLoginStatus,
    signStatus: state => state.user.userSignStatus,
    playList: state => state.user.userPlayList,
    followList: state => state.user.userFollowList,
    followerList: state => state.user.userFollowerList,
    eventList: state => state.user.userEvent,
    // e

    // s toggle.js
    showLoginDialog: state => state.toggle.showLoginDialog,
    showUserInfoDetail: state => state.toggle.showUserInfoDetail,
    // e

    // s player.js
    playerList: state => state.player.playList,
    playerStatus: state => state.player.playStatus,
    currentMusic: state => state.player.playList[state.player.playCurrentIndex],
    // e
}

export default getters