<template>
    <div class="side-bar-wrapper">
        <user-info></user-info>
        <fixed-menus></fixed-menus>
    </div>
</template>

<script>
import FixedMenus from './FixedMenus';
import UserInfo from './UserInfo';
export default {
    data() {
        return {
            
        }
    },
    components:{
        FixedMenus,
        UserInfo
    }
};
</script>

<style lang="scss" scoped>
.side-bar-wrapper {
    position: relative;
    height: 100%;
    background: rgba(233, 233, 233, 0.575);
}
</style>
