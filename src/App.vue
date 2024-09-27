<template>
    <div id="app">
        <h1>IRuxu Pkg Widget</h1>
        <EmailLogin />
        <EmailRegister />
    </div>
</template>

<script>
import EmailLogin from "./components/account/email/login.vue";
import EmailRegister from "./components/account/email/register.vue";
export default {
    name: 'App',
    components: {
        EmailLogin,
        EmailRegister
    },
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
