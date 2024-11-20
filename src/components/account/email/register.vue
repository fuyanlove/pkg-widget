<template>
    <div class="m-card m-register-card">
        <card-header :title="$t('account.common.register')">
            <template #right>
                <lang-select :lang="form.lang" @change="changeLang" />
            </template>
        </card-header>

        <div class="m-card-main" v-if="success === null">
            <el-form
                class="m-card-form"
                hide-required-asterisk
                ref="registerForm"
                :model="form"
                :rules="rules"
                size="large"
                status-icon
                label-position="top"
            >
                <!-- <el-form-item prop="nickname">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.email.nickname") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.nickname" size="large" :maxlength="20"> </el-input>
                </el-form-item> -->
                <!-- <el-form-item prop="invite_code">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.email.invite_code") }}</span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.invite_code" size="large"> </el-input>
                </el-form-item> -->
                <el-form-item prop="email">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.email.address") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim.lazy="form.email" size="large"> </el-input>
                </el-form-item>
                <el-form-item prop="code" class="u-code">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.email.code") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.code" size="large"> </el-input>
                    <el-button
                        class="u-btn-send"
                        size="small"
                        @click="senCode"
                        :disabled="interval > 0 || !emailChecked"
                        >{{ $t("account.email.send") }}<span v-if="interval">({{ interval }}s)</span></el-button
                    >
                </el-form-item>
                <el-form-item prop="password" class="m-password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.common.password") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password" type="password" size="large" show-password> </el-input>
                </el-form-item>
                <el-form-item prop="password1" class="m-password">
                    <template #label>
                        <div class="m-card-form-label">
                            <span>{{ $t("account.common.passwordConfirm") }}<i class="is-required">*</i></span>
                        </div>
                    </template>
                    <el-input v-model.trim="form.password1" type="password" size="large" show-password> </el-input>
                </el-form-item>
            </el-form>
            <div class="u-terms">
                <el-checkbox v-model="agreement" class="u-checkbox"
                    >{{ $t("account.common.read") }}
                    <a :href="terms" target="_blank">《{{ $t("account.common.terms") }}》 </a>
                </el-checkbox>
            </div>
            <el-button class="u-btn u-submit" type="primary" @click="onRegister">{{ $t("account.common.register") }}</el-button>
        </div>

        <main class="m-card-main" v-if="success == true">
            <el-alert
                class="m-alert"
                :title="$t('account.email.registerSuccess')"
                type="success"
                :description="$t('account.email.registerSuccessDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button size="large" class="u-btn u-back" type="primary" @click="goLogin">{{
                $t("account.common.login")
            }}</el-button>
        </main>

        <main class="m-card-main" v-if="success == false">
            <el-alert
                class="m-alert"
                :title="$t('account.email.registerFailed')"
                type="error"
                :description="$t('account.email.registerFailedDesc')"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button size="large" class="u-btn u-back" type="primary" @click="onBack">{{
                $t("account.common.back")
            }}</el-button>
        </main>
    </div>
    <div class="m-footer">
        <div class="m-footer-skip">
            {{ $t("account.common.hadAccount") }} <a class="u-link" :href="loginLink">{{ $t("account.common.login") }} &raquo;</a>
        </div>
    </div>
</template>

<script>
import { checkEmail, registerByEmail, activeByEmail } from "../../../service/email";
import CardHeader from "../../common/card-header.vue";
import User from "@iruxu/pkg-common/utils/user";
import LangSelect from "../../common/lang-select.vue";

export default {
    name: "EmailRegister",
    props: {
        app: {
            type: String,
            default: "",
        },
        loginLink: {
            type: String,
            default: "",
        },
    },
    components: {
        CardHeader,
        LangSelect,
    },
    data() {
        return {
            form: {
                // nickname: "",
                email: "",
                password: "",
                password1: "",
                lang: "",
                code: "",
                // invite_code: "",
            },

            rules: {
                email: [
                    { required: true, message: this.$t("account.email.addressPlaceholder"), trigger: "blur" },
                    { type: "email", message: this.$t("account.email.addressError"), trigger: ["blur"] },
                    { validator: this.check, trigger: "blur" },
                ],
                password: [
                    { required: true, message: this.$t("account.common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
                ],
                password1: [
                    { required: true, message: this.$t("account.common.password2Placeholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.form.password) {
                                callback(new Error(this.$t("account.common.passwordError2")));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
            },

            agreement: false,

            success: null,
            emailChecked: false,

            terms: "/doc/terms",

            interval: 0,
            timer: null,
        };
    },
    computed: {
        canSubmit() {
            return this.form.email && this.form.password && this.agreement;
        },
    },
    mounted() {
        // 生成特征码
        User.generateFingerprint();

        // 获取浏览器语言|系统语言
        this.form.lang = User.getLocale();
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                this.emailChecked = false;
                callback(new Error(this.$t("account.email.addressPlaceholder")));
            } else {
                const res = await checkEmail(value);
                if (res) {
                    this.emailChecked = false;
                    callback(new Error(this.$t("account.email.emailRegistered")));
                    return;
                }
                this.emailChecked = true;
                callback();
            }
        },
        checkNickname(rule, value, callback) {
            // 不允许有空格和特殊符号
            if (!value) {
                callback(new Error(this.$t("account.email.nicknamePlaceholder")));
            } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                callback(new Error(this.$t("account.email.nicknameError")));
            } else {
                callback();
            }
        },
        // 发送验证码
        senCode() {
            if (!this.form.email) {
                this.$refs.registerForm.validateField("email");
                return;
            }
            registerByEmail({ email: this.form.email }, { app: this.app }).then(() => {
                this.$message.success(this.$t("account.email.sendSuccess"));
                this.interval = 60;
                this.timer = setInterval(() => {
                    this.interval--;
                    if (this.interval <= 0) {
                        clearInterval(this.timer);
                    }
                }, 1000);
            });
        },
        onRegister() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    const data = {
                        lang: this.form.lang,
                        email: this.form.email,
                        password: this.form.password,
                        // invite_code: this.form.invite_code,
                        code: this.form.code,
                        // nickname: this.form.nickname,
                    };
                    activeByEmail(data, { app: this.app })
                        .then(() => {
                            this.success = true;
                        })
                        .catch(() => {
                            this.success = false;
                        });
                }
            });
        },
        goLogin() {
            this.$emit("toEmailLogin");
        },
        onBack() {
            this.success = null;
        },
        changeLang(lang) {
            this.form.lang = lang;
        },
    },
};
</script>
