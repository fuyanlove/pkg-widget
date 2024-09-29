<template>
    <div id="app">
        <h1>IRuxu Pkg Widget</h1>
        <el-tabs type="card" v-model="active">
            <el-tab-pane label="EmailLogin" name="first">
                <div class="p-account p-account-email--login">
                    <el-row class="m-container" justify="center">
                        <div class="m-login">
                            <logo :app="app" />
                            <EmailLogin :app="app" />
                        </div>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="EmailRegister" name="second">
                <div
                    class="p-account p-account-email p-account-email--register"
                >
                    <el-row class="m-container" justify="center">
                        <div class="m-register">
                            <logo :app="app" />
                            <EmailRegister :app="app" />
                        </div>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="PhoneRegister" name="third">
                <div
                    class="p-account p-account-phone p-account-phone--register"
                >
                    <el-row class="m-container" justify="center">
                        <div class="m-register">
                            <logo :app="app" />
                            <PhoneRegister :app="app" />
                        </div>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="PhoneLogin" name="fourth">
                <div
                    class="p-account p-account-phone p-account-phone--login"
                >
                    <el-row class="m-container" justify="center">
                        <div class="m-login">
                            <logo :app="app" />
                            <PhoneLogin :app="app" />
                        </div>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="PhoneCodeLogin" name="fifth">
                <div
                    class="p-account p-account-phone p-account-phone--login"
                >
                    <el-row class="m-container" justify="center">
                        <div class="m-login">
                            <logo :app="app" />
                            <PhoneCodeLogin :app="app" />
                        </div>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import EmailLogin from "./components/account/email/login.vue";
import EmailRegister from "./components/account/email/register.vue";
import PhoneRegister from "./components/account/phone/register.vue";
import PhoneLogin from "./components/account/phone/login.vue";
import PhoneCodeLogin from "./components/account/phone/code-login.vue";
import Logo from "./components/common/logo.vue";
export default {
    name: "App",
    components: {
        EmailLogin,
        EmailRegister,
        Logo,
        PhoneRegister,
        PhoneLogin,
        PhoneCodeLogin,
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
@import "./assets/css/app.less";
@import "./assets/css/account/common.less";
@import "./assets/css/account/email/login.less";
@import "./assets/css/account/email/register.less";
@import "./assets/css/account/email/forgot.less";
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
