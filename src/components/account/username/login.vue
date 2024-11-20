<!-- 公共组件 用户名注册 -->
<template>
    <el-card class="m-card">
        <card-header></card-header>
        <el-form ref="loginForm" :model="form" :rules="rules" size="large" v-if="!success">
            <el-form-item prop="username">
                <el-input v-model.trim="form.username" size="large" :placeholder="$t('account.username.name')">
                    <template #prepend
                        ><el-icon><UserFilled></UserFilled></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model.trim="form.password"
                    @keydown.enter="onLogin"
                    type="password"
                    size="large"
                    show-password
                    :placeholder="$t('account.common.password')"
                >
                    <template #prepend
                        ><el-icon><Lock></Lock></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-alert class="u-alert" v-if="error" type="error" show-icon :title="error"></el-alert>
            <el-form-item>
                <el-button class="u-button u-submit" type="primary" @click="onLogin" :disabled="!canSubmit">{{
                    $t("account.common.login")
                }}</el-button>
            </el-form-item>
            <el-form-item class="m-footer">
                <p class="u-login">
                    {{ $t("account.common.noAccount") }} <a :href="registerLink">{{ $t("account.common.registerNow") }} &raquo;</a>
                </p>
            </el-form-item>
        </el-form>

        <main v-else class="m-card-main">
            <el-alert
                :title="$t('account.common.loginSuccess')"
                type="success"
                :description="`${$t('account.common.loginSuccess')}(#^.^#)`"
                show-icon
                :closable="false"
            >
            </el-alert>
            <a class="u-skip el-button u-button el-button--primary" :href="redirect">{{ redirect_button }}</a>
        </main>
    </el-card>
</template>

<script>
import { loginByUsername } from "../../../service/username";
import CardHeader from "../../common/card-header.vue";
import User from "@iruxu/pkg-common/utils/user";
import LangSelect from "../../common/lang-select.vue";
export default {
    name: "UsernameLogin",
    components: {
        CardHeader,
    },
    props: {
        app: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            form: {
                username: "",
                password: "",
            },

            rules: {
                username: [
                    { required: true, message: this.$t("account.username.namePlaceholder"), trigger: "blur" },
                    { min: 3, max: 20, message: this.$t("account.username.nameError"), trigger: "blur" },
                ],
                password: [
                    { required: true, message: this.$t("account.common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
                ],
            },

            error: "",
            success: false,
            redirect: "",
            redirect_button: "跳转",
            homepage: "/",
        };
    },
    computed: {
        canSubmit() {
            return this.form.username && this.form.password;
        },
        registerLink() {
            const path = this.$router.resolve({ name: "username-register", query: { app: this.app } });

            return path.href;
        },
    },
    mounted() {
        // 生成特征码
        User.generateFingerprint();
        this.checkDirect();
    },
    methods: {
        onLogin() {
            this.error = "";
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    loginByUsername(this.form, { app: this.app })
                        .then((res) => {
                            this.$message.success(this.$t("account.common.loginSuccess"));
                            this.success = true;

                            User.update(res.data.data).then(() => {
                                this.skip();
                            });
                        })
                        .catch((err) => {
                            this.success = false;
                            this.error = err.data?.msg || this.$t("account.username.loginFailed");
                        });
                }
            });
        },
        checkDirect() {
            let search = new URLSearchParams(document.location.search);
            let redirect = search.get("redirect");
            if (redirect) {
                this.redirect = redirect;
                this.redirect_button = this.$t("account.common.jump");
            } else {
                this.redirect = this.homepage;
                this.redirect_button = this.$t("account.common.backToHome");
            }
        },
        skip() {
            if (this.redirect) {
                setTimeout(() => {
                    location.href = decodeURIComponent(this.redirect);
                }, 1200);
            }
        },
    },
};
</script>
