<template>
    <div class="side-bar-wrapper">
        <div class="user-info">
            <div class="head-photo">
                <i class="iconfont icon-touxiang"></i>
            </div>
            <div class="name">
                未登录
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" style="height:calc(100% - 54px);" ref="myScrollbar">
            <div class="menu-list">
                <div class="menu-item">
                    <div class="menu-title">在线音乐</div>
                    <div class="menu-text menu-text-active">
                        <i class="iconfont icon-yinle-yuanshijituantubiao"></i>
                        <span>发现音乐</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                        <span>私人FM</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-shipin"></i>
                        <span>视频</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-pengyou"></i>
                        <span>朋友</span>
                    </div>
                </div>
                <div class="menu-item">
                    <div class="menu-title">创建的歌单</div>
                    <div class="menu-text">
                        <i class="iconfont icon-xin"></i>
                        <span>我喜欢</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>年度歌单</span>
                    </div>
                </div>
                <div class="menu-item">
                    <div class="menu-title">收藏歌单</div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                    <div class="menu-text">
                        <i class="iconfont icon-yinyue"></i>
                        <span>音乐馆</span>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.side-bar-wrapper {
    position: relative;
    height: 100%;
    // padding: 10px 20px;
    background: rgba(233, 233, 233, 0.575);
    .user-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 20px;
        .head-photo {
            i {
                color: rgba(179, 179, 179, 0.925);
                font-size: 30px;
            }
        }
        .name {
            margin-left: 10px;
            font-weight: bold;
            color: rgba(94, 94, 94, 0.925);
        }
    }
    .menu-list {
        height: calc(100% - 54px);
        overflow: hidden;
        .menu-item {
            .menu-title {
                padding: 10px 0;
                font-size: 14px;
                padding-left: 20px;
                color: rgb(154,154,154)
            }
            .menu-text {
                padding-left: 30px;
                display: flex;
                align-items: center;
                margin-bottom: 4px;
                line-height: 30px;
                cursor: pointer;
                &.menu-text-active {
                    background: rgba(223, 223, 223, 0.555);
                    color: rgb(179, 18, 18);
                }
                &:hover{
                    background: rgba(223, 223, 223, 0.555);
                    color: rgb(179, 18, 18);
                }
                i {
                    font-size: 19px;
                }
                span {
                    font-size: 13px;
                    margin-left: 8px;
                }
            }
        }
    }
}

</style>
<style>
.scrollbar-wrapper {
    overflow-x: hidden !important;
}
</style>
