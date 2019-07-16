<template>
    <div class="progress-wrapper">
        <div class="progress"
        @mouseover.stop="mouseoverHandler"
        @mousedown.stop="mousedownHandler"
        @mousemove.stop="mousemoveHandler"
        @mouseup.stop="mouseupHandler"
        @mouseout.stop="mouseoutHandler"
        :style="progressStyle"
        >
            <div class="progress_inner" :style="innerStyle">
                <div class="progress_ball"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            percent: {                // 进度条百分比
                type: Number,
                default: 10,
            }
        },
        data() {
            return {
                innerStyle: {
                    'width':`${this.percent}%`,
                    'height':'2px'
                },
                progressStyle: {
                    'height':'4px'
                },
                // ballStyle: {
                //     top:this.innerStyle.height
                // }
                // 当鼠标按下左中右键时的标记
                isMouseDownOnBall: false,
                // 鼠标进body时是否是mousedown
                isMouseDownOnBody: false,
                // 主要用于防止一个页面内有多个本组件，MouseMove时互相影响而设置的字段
                isCurrentProgress: false,
                // 鼠标离开进度条时的clientX
                outProgressClientX: 0,
            }
        },
        computed:{
            progressElement() {
                return this.$el.getElementsByClassName('progress')[0];
            },
        },
        methods: {
            /**
             * 思路分析
             * 1.移入 2.按下 3.移动 4.松开 5.移出
             */
            
            // 当鼠标移入进度条时，触发的事件
            mouseoverHandler(e) {
                // 没有按左键进入进度条
                if (e.which === 0) {
                    this.isMouseDownOnBall = false;
                }
            },
            // 当鼠标指针移动到元素上方，并按下左中右键时，触发的事件
            mousedownHandler(e) {
                if(e.which === 1) {
                    this.isMouseDownOnBall = true
                    this.isCurrentProgress = true;
                }
            },
            // 当鼠标在元素上移动时，触发的事件
            mousemoveHandler(e) {
                // 判断按下时，移动
                if(this.isMouseDownOnBall && this.isCurrentProgress) {
                    // 取到当前inner占据的百分比
                    let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth
                    let percent = decimal * 100;
                    this.innerStyle.width = `${percent}%`
                    this.$emit('pbar-drag', percent)
                }
            },
            // 当鼠标在元素上松开左中右键时，触发的事件
            mouseupHandler(e) {
                if (this.isMouseDownOnBall && this.isCurrentProgress) {
                    // 取到当前inner占据的百分比
                    let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth
                    let percent = decimal * 100;
                    this.innerStyle.width = `${percent}%`
                    this.$emit('pbar-seek', percent)
                    this.isMouseDownOnBall = false
                    this.isCurrentProgress = false
                }
               
            },
            // 当鼠标移开时，触发的事件
            mouseoutHandler(e) {
                if (e.which === 1 && this.isCurrentProgress) {
                    this.outProgressClientX = e.clientX
                    this.isMouseDownOnBody = true
                    this.bodyEventHandler()
                }
            },
            // body元素的事件监听器
            bodyEventHandler() {
                let body = document.getElementsByTagName('body')[0];
                body.addEventListener('mousemove', this.bodyMousemoveHandler)
                body.addEventListener('mouseup', (e) => {
                    this.isMouseDownOnBall = false
                    this.isMouseDownOnBody = false
                    this.outProgressClientX = 0
                    this.isCurrentProgress = false
                    body.removeEventListener('mousemove', this.bodyMousemoveHandler)
                })
            },
            // body元素的Mousemove事件监听器
            bodyMousemoveHandler(e) {
                e.preventDefault()
                if(e.which === 1 && this.isMouseDownOnBody) {
                    // 用于判断鼠标离开时进度条往哪里移动了
                    // let offsetX = e.clientX - this.outProgressClientX
                    let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth
                    let percent = decimal * 100
                    this.innerStyle.width = `${percent}%`
                    this.$emit('pbar-drag', percent)
                }
            }
        },
        watch: {
            percent(cur,old){
                this.innerStyle.width = `${cur}%`
            }
        }
    }
</script>

<style lang="scss" scoped>
.progress-wrapper {
    position: relative;
    .progress {
        position: absolute;
        z-index: 999;
        width: 100%;
        height: 2px;
        .progress_inner {
            position: relative;
            height: 100%;
            width: 100%;
            background: #f56c6c;
            // transition: width 0.4s linear;
            .progress_ball {
                position: absolute;
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background: #f56c6c;
                right: -6px;
                top: -5px;
            }
        }
    }
}
</style>