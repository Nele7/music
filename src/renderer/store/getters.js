const getters = {
    // start user.js
    uid: state => state.user.userInfo.userId,
    userInfo: state => state.user.userInfo,
    loginStatus: state => state.user.userLoginStatus,
    playList: state => state.user.userPlayList.playlist,
    followList: state => state.user.userFollowList,
    followerList: state => state.user.userFollowerList,
    eventList: state => state.user.userEvent,
    // end

    // start toggle.js
    showLoginDialog: state => state.toggle.showLoginDialog,
    showUserInfoDetail: state => state.toggle.showUserInfoDetail
    // end
}

export default getters