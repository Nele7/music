<template>
    <div class="test">
        <!--demo-0-->
        <h3>demo 0 默认效果</h3>
        <progress-bar ref="aa"></progress-bar>

        <!--demo-1-->
        <h3>demo 1 基本效果</h3>
        <progress-bar width="40%" leftBg="greenyellow" bgc="#ccc" ballBgc="red"></progress-bar>

        <!--demo-2-->
        <h3>demo 2 渐变效果</h3>
        <progress-bar
            width="60%"
            leftBg="linear-gradient(to right, yellow, pink)"
            bgc="#ccc"
            ballBgc="red"
        ></progress-bar>

        <!--demo-3-->
        <h3>demo 3 加高效果</h3>
        <progress-bar width="80%" leftBg="yellow" bgc="#ccc" ballBgc="red" height="30px"></progress-bar>

        <!--demo-4-->
        <h3>demo 4 小球透明效果</h3>
        <progress-bar leftBg="greenyellow" bgc="#ccc" ballBgc="rgba(255,0,0,0.2)" height="40px"></progress-bar>

        <!--demo-5-->
        <h3>demo 5 接收pbar-drag、pbar-seek事件数据</h3>
        <progress-bar
            width="40%"
            leftBg="greenyellow"
            bgc="#ccc"
            ballBgc="red"
            :percent="percent"
            @pbar-drag="drag"
            @pbar-seek="seek"
        ></progress-bar>
        <div>当前秒数：{{currentMiao}}, 百分比 = {{percent}}</div>

    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar/';
export default {
    data: function () {
        return {
            miao: 300,
            currentMiao: 10,
            percent: 0,
        }
    },
    computed: {
    },
    methods: {
        drag(percent) {
            this.currentMiao = percent / 100 * 300;
        },
        seek(percent) {
            this.currentMiao = percent / 100 * 300;
        },
        btnClick() {
            window.setInterval(() => {
                this.currentMiao++;
            }, 1000);
        }
    },
    components: {
        'progress-bar': ProgressBar,
    },
    mounted() {
        //this.percent = Number((this.currentMiao / this.miao * 100).toFixed(3));
        this.percent = this.currentMiao / this.miao * 100;
    },
    watch: {
        currentMiao(cur, old) {
            this.percent = cur / this.miao * 100;
        }
    }
}
</script>

<style scoped>
.test > div {
    margin: 20px 0;
}
</style>