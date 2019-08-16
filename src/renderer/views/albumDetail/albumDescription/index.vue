<template>
    <div class="albumdesc-wrapper">
        <h4>专辑介绍</h4>
        <div>
            <pre>{{desc}}</pre>
        </div>
    </div>
</template>

<script>
    export default {
        props:['desc']
    }
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.albumdesc-wrapper {
    padding: 20px;
    pre {
        color:$color-base-grey;
        white-space: pre-wrap;
        font-size: 12px;
        line-height: 30px;
    }
}
</style>