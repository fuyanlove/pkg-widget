<!-- 公共组件 手机号验证码登录 -->
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
                        <el-input v-model.trim="form.phone" size="large">
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="code" class="u-code">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.phone.code") }}</span>
                            <span class="u-resetpwd">
                                <a :href="resetPwdLink"
                                    >{{
                                        $t("account.email.forgetPassword")
                                    }}?</a
                                >
                            </span>
                        </div>
                    </template>
                    <el-input
                        v-model.trim="form.code"
                        @keydown.enter="onLogin"
                        size="large"
                    >
                    </el-input>
                    <el-button
                        class="u-btn-send"
                        size="small"
                        @click="senCode"
                        :disabled="interval > 0 || !phoneChecked"
                        >{{ $t("account.email.send")
                        }}<span v-if="interval"
                            >({{ interval }}s)</span
                        ></el-button
                    >
                </el-form-item>
            </el-form>
            <el-alert
                class="u-alert"
                v-if="error"
                type="error"
                show-icon
                :title="error"
            ></el-alert>
            <el-button class="u-btn u-submit" type="primary" @click="onLogin">{{
                $t("common.login")
            }}</el-button>
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
            <a
                class="el-button u-btn el-button--primary u-skip"
                :href="redirect"
                >{{ redirect_button }}</a
            >
        </div>
    </div>
    <div class="m-footer">
        <div class="m-footer-skip">
            {{ $t("common.noAccount") }}
            <a class="u-link" :href="registerLink"
                >{{ $t("common.registerNow") }} 👉</a
            >
        </div>
    </div>
</template>

<script>
import { loginByPhoneCode, sendLoginCode } from "../../../service/phone";
import CardHeader from "../../common/card-header.vue";
import User from "@iruxu/pkg-common/utils/user";
import LangSelect from "../../common/lang-select.vue";
import PhoneCodeSelect from "../../common/phone-code-select.vue";
import { parsePhoneNumberFromString } from "libphonenumber-js"
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
        },
    },
    data() {
        return {
            form: {
                phone: "",
                code: "",
            },

            phoneCode: 86,

            rules: {
                phone: [
                    {
                        required: true,
                        message: this.$t("account.phone.numberPlaceholder"),
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            const phone = `+${this.phoneCode}${value}`;
                            const phoneNumber = parsePhoneNumberFromString(phone);
                            if (!phoneNumber || !phoneNumber.isValid()) {
                                callback(new Error(this.$t("account.phone.numberError")));
                            } else {
                                this.phoneChecked = true;
                                callback();
                            }
                        },
                        trigger: "blur",
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("account.phone.codePlaceholder"),
                        trigger: "blur",
                    },
                ],
            },

            error: "",
            success: false,

            interval: 0,
            timer: null,

            redirect: "",
            redirect_button: "",
            homepage: "/",

            phoneChecked: false,
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
                        code: this.form.code,
                    };
                    loginByPhoneCode(data, { app: this.app })
                        .then((res) => {
                            this.$message.success(
                                this.$t("common.loginSuccess")
                            );
                            this.success = true;

                            User.update(res.data.data).then(() => {
                                this.skip();
                            });
                        })
                        .catch((err) => {
                            this.success = false;
                            this.error =
                                err.data?.msg ||
                                this.$t("account.phone.loginFailedWithPwd");
                        });
                }
            });
        },
        // 发送验证码
        senCode() {
            if (!this.form.phone) {
                return;
            }
            const phone = `+${this.phoneCode}${this.form.phone}`;
            sendLoginCode({ phone: phone }, { app: this.app }).then(() => {
                this.$message.success(this.$t("account.phone.sendSuccess"));
                this.interval = 60;
                this.timer = setInterval(() => {
                    this.interval--;
                    if (this.interval <= 0) {
                        clearInterval(this.timer);
                    }
                }, 1000);
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
