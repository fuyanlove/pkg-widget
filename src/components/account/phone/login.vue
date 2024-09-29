<!-- 公共组件 手机注册 -->
<template>
    <div class="m-card m-login-card">
        <card-header :title="$t('common.login')">
            <template #right>
                <lang-select :lang="lang" />
            </template>
        </card-header>

        <div class="m-card-main" v-if="!success">
            <el-form
                class="m-card-form"
                hide-required-asterisk
                ref="loginForm"
                label-position="top"
                :model="form"
                :rules="rules"
                size="large"
            >
                <el-form-item prop="phone">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.phone.number") }}</span>
                        </div>
                    </template>
                    <div class="m-card-form-value">
                        <phone-code-select v-model="phoneCode" size="large" />
                        <el-input v-model.trim="form.phone" size="large"> </el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("common.password") }}</span>
                            <span class="u-resetpwd">
                                <a :href="resetPwdLink">{{ $t("account.email.forgetPassword") }}?</a>
                            </span>
                        </div>
                    </template>
                    <el-input
                        v-model.trim="form.password"
                        @keydown.enter="onLogin"
                        type="password"
                        size="large"
                        show-password
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <el-alert class="u-alert" v-if="error" type="error" show-icon :title="error"></el-alert>
            <el-button class="u-btn u-submit" type="primary" @click="onLogin">{{ $t("common.login") }}</el-button>
        </div>

        <div class="m-card-main" v-else>
            <el-alert
                class="m-alert"
                :title="$t('common.loginSuccess')"
                type="success"
                :description="$t('common.loginSuccessDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <a class="el-button u-btn el-button--primary u-skip" :href="redirect">{{ redirect_button }}</a>
        </div>
    </div>
    <div class="m-footer">
        <div class="m-footer-skip">
            {{ $t("common.noAccount") }} <a class="u-link" :href="registerLink">{{ $t("common.registerNow") }} 👉</a>
        </div>
    </div>
</template>

<script>
import { loginByPhone } from "../../../service/phone";
import CardHeader from "../../common/card-header.vue";
import User from "@iruxu/pkg-common/utils/user";
import LangSelect from "../../common/lang-select.vue";
import PhoneCodeSelect from "../../common/phone-code-select.vue";
export default {
    name: "EmailLogin",
    components: {
        CardHeader,
        LangSelect,
        PhoneCodeSelect,
    },
    props: {
        app: {
            type: String,
            default: "",
        },
        registerLink: {
            type: String,
            default: "",
        },
        resetPwdLink: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },

            phoneCode: 86,

            rules: {
                phone: [
                    { required: true, message: this.$t("account.phone.numberPlaceholder"), trigger: "blur" },
                ],
                password: [
                    { required: true, message: this.$t("common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("common.passwordError"), trigger: "blur" },
                ],
            },

            error: "",
            success: false,

            redirect: "",
            redirect_button: "",
            homepage: "/",
        };
    },
    computed: {
        lang() {
            return User.getLocale();
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
                    const data = {
                        phone: `+${this.phoneCode}${this.form.phone}`,
                        password: this.form.password,
                    }
                    loginByPhone(data, { app: this.app })
                        .then((res) => {
                            this.$message.success(this.$t("common.loginSuccess"));
                            this.success = true;

                            User.update(res.data.data).then(() => {
                                this.skip();
                            });
                        })
                        .catch((err) => {
                            this.success = false;
                            this.error = err.data?.msg || this.$t("account.phone.loginFailedWithPwd");
                        });
                }
            });
        },
        checkDirect() {
            let search = new URLSearchParams(document.location.search);
            let redirect = search.get("redirect");
            if (redirect) {
                this.redirect = redirect;
                this.redirect_button = this.$t("common.jump");
            } else {
                this.redirect = this.homepage;
                this.redirect_button = this.$t("common.backToHome");
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
