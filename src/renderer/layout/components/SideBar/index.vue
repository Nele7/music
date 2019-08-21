<template>
    <div class="side-bar-wrapper">
        <user-info></user-info>
        <menus></menus>
    </div>
</template>

<script>
import Menus from '@/views/menus/'
import UserInfo from '@/views/userInfo/'
export default {
    data() {
        return {
            
        }
    },
    components:{
        Menus,
        UserInfo
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";

.side-bar-wrapper {
    position: relative;
    height: 100%;
    background: $background-grey;
}
</style>
