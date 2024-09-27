<template>
    <header class="w-logo">
        <a :href="homepageUrl" class="u-logo"><img class="u-img" svg-inline :src="logoUrl" /></a>
    </header>
</template>

<script>
const DEFAULT_APP = "iruxu";
export default {
    name: "CardHeader",
    props: {
        app: {
            type: String,
            default: DEFAULT_APP,
        },
    },
    data: function () {
        return {};
    },
    computed: {
        logoUrl() {
            // return require("../../assets/img/logo/" + (this.app || DEFAULT_APP) + ".svg");
            return require("@/assets/img/logo/" + "iruxu.svg");
        },
        homepageUrl() {
            // TODO: 从配置文件中读取
            return "/";
        },
    },
};
</script>

<style lang="less">
.w-logo {
    margin: 20px 0;
    margin-bottom: 40px;
    .flex;
    align-items: center;
    justify-content: center;
    .u-img {
        width: 68%;
        height: 68%;
    }

    .u-logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2px 6px #e6ecf1;
        .db;
        .flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
