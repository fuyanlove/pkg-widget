<template>
    <div id="app">
        <h1>IRuxu Pkg Widget</h1>
    </div>
</template>

<script>
import Logo from "./components/common/logo.vue";
export default {
    name: "App",
    components: {
        Logo,
    },
    data() {
        return {
            app: "miipet",
            active: "sixth",
        };
    },
};
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
