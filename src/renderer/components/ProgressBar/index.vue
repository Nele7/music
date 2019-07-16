<template>
    <div class="progress-wrapper" :style="wrapStyle">
        <div
            class="progress"
            @mousedown.stop="mousedownHandler"
            @mouseover.stop="mouseoverHandler"
            @mousemove.stop="mousemoveHandler"
            @mouseup.stop="mouseupHandler"
            @mouseout.stop="mouseoutHandler"
            :style="pBarStyle"
        >
            <div class="left" :style="leftStyle">
                <div class="ball" :style="ballStyle"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        leftBg: String,           // 进度条已划过部分背景色
        bgc: String,              // 进度条还未划过部分背景色
        ballBgc: String,          // 滑块的背景色
        height: String,           // 进度条高度
        width: String,            // 进度条占父组件的宽度百分百   
        percent: {                // 进度条百分比
            type: Number,
            default: 10,
        }
    },
    data: function () {
        return {
            wrapStyle: {
                'width': this.width,
            },
            pBarStyle: {
                'backgroundColor': this.bgc,
                'height': this.height,
            },
            leftStyle: {
                'width': this.percent + '%',
                'background': this.leftBg,
                'height': this.height,
            },
            ballStyle: {
                'backgroundColor': this.ballBgc,
                'height': this.height,
                'width': this.height,
                'borderRadius': parseInt(this.height) / 2 + 'px',
                'right': - parseInt(this.height) / 2 + 'px',
            },
            // 标记是否按下鼠标
            isMouseDownOnBall: false,
            // 鼠标进body时是否是mousedown
            isMouseDownOnBody: false,
            // 鼠标离开进度条时的clientX
            outProgressClientX: 0,
            // 主要用于防止一个页面内有多个本组件，MouseMove时互相影响而设置的字段
            isCurrentProgress: false,
        }
    },
    computed: {
        progressElement() {
            return this.$el.getElementsByClassName('progress')[0];
        },
    },
    methods: {
        mousedownHandler(e) {
            if (e.which === 1) {
                this.isMouseDownOnBall = true;
                this.isCurrentProgress = true;
            }
        },
        mousemoveHandler(e) {
            if (this.isMouseDownOnBall && this.isCurrentProgress) {
                console.log(this.$el.offsetLeft)
                let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth;
                let percent = decimal * 100;
                this.leftStyle.width = percent + '%';
                this.$emit('pbar-drag', percent);
            }
        },
        mouseupHandler(e) {
            if (this.isMouseDownOnBall && this.isCurrentProgress) {
                
                let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth;
                let percent = decimal * 100;
                this.leftStyle.width = percent + '%';
                this.$emit('pbar-seek', percent);

                this.isMouseDownOnBall = false;
                this.isCurrentProgress = false;
            }
        },
        mouseoverHandler(e) {
            // 没有按左键进入进度条
            if (e.which === 0) {
                this.isMouseDownOnBall = false;
            }
        },
        mouseoutHandler(e) {
            if (e.which === 1 && this.isCurrentProgress) {
                this.outProgressClientX = e.clientX;
                this.isMouseDownOnBody = true;
                this.bodyEventHandler();
            }
        },
        // body元素的事件监听器
        bodyEventHandler() {
            let body = document.getElementsByTagName('body')[0];
            body.addEventListener('mousemove', this.bodyMousemoveHandler);
            body.addEventListener('mouseup', (e) => {
                this.isMouseDownOnBall = false;
                this.isMouseDownOnBody = false;
                this.outProgressClientX = 0;
                this.isCurrentProgress = false;
                body.removeEventListener('mousemove', this.bodyMousemoveHandler);
            })
        },
        // body元素的mousemove事件监听器
        bodyMousemoveHandler(e) {
            e.preventDefault();
            if (e.which === 1 && this.isMouseDownOnBody === true) {
                let offsetX = e.clientX - this.outProgressClientX;
                // 右移了
                if (offsetX > 0) {
                    // 在进度条右边界内
                    
                    if (e.clientX < this.progressElement.clientWidth + this.$el.offsetLeft) {
                        let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth;
                        let percent = decimal * 100;
                        this.leftStyle.width = percent + '%';
                        this.$emit('pbar-drag', percent)
                        // 超出右边界
                    } else {
                        this.leftStyle.width = '100%';
                        this.$emit('pbar-drag', 100);
                    }
                    // 左移了
                } else if (offsetX < 0) {
                    // 在进度条左边界内
                    if (e.clientX > this.$el.offsetLeft) {
                        let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth;
                        let percent = decimal * 100;
                        this.leftStyle.width = percent + '%';
                        this.$emit('pbar-drag', percent)
                        // 超出左边界
                    } else {
                        this.leftStyle.width = '0%';
                        this.$emit('pbar-drag', 0);
                    }
                }
            }
        },

    },
    watch: {
        percent(cur, old) {
            this.leftStyle.width = cur + '%';
        }
    }
}
</script>

<style scoped>
.progress-wrapper {
    /*width:100%;*/
}
.progress {
    width: 100%;
    height: 20px;
    background-color: #ccc;
    overflow: hidden;
    cursor: pointer;
}
.left {
    height: 100%;
    width: 30%;
    background-color: greenyellow;
    position: relative;
}
.ball {
    height: 100%;
    width: 20px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background-color: red;
    position: absolute;
    right: -10px;
}
</style>