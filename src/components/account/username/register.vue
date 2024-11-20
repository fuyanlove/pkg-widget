<!-- 公共组件 用户名注册 -->
<template>
    <el-card class="m-card">
        <card-header></card-header>
        <el-form ref="registerForm" :model="form" :rules="rules" size="large" status-icon>
            <el-form-item prop="username">
                <el-input v-model.trim="form.username" size="large" :placeholder="$t('account.username.name')">
                    <template #prepend
                        ><el-icon><UserFilled></UserFilled></el-icon
                    ></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" class="m-password">
                <el-input
                    v-model.trim="form.password"
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
            <el-form-item class="u-terms">
                <el-checkbox v-model="agreement" class="u-checkbox"
                    >{{ $t("account.common.read") }}
                    <a v-for="(item, index) in agreements" :key="index" :href="item.href" target="_blank"
                        >《{{ item.name }}》
                        {{ index === agreements.length - 1 ? "" : "、" }}
                    </a>
                </el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="u-button u-submit" type="primary" @click="onRegister" :disabled="!canSubmit">{{
                    $t("account.common.register")
                }}</el-button>
            </el-form-item>
            <el-form-item class="m-footer">
                <p class="u-login">
                    {{ $t("account.common.hadAccount") }} <a :href="loginLink">{{ $t("account.common.login") }} &raquo;</a>
                </p>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { checkUsername, registerByUsername } from "../../../service/username";
import CardHeader from "../../common/card-header.vue";
import User from "@iruxu/pkg-common/utils/user";
import LangSelect from "../../common/lang-select.vue";
export default {
    name: "UsernameRegister",
    components: {
        CardHeader,
    },
    props: {
        app: {
            type: String,
            default: "",
        },
        agreements: {
            // 协议
            type: Array,
            default: () => [
            ],
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
                    { validator: this.check, trigger: "blur" },
                    { min: 3, max: 20, message: this.$t("account.username.nameError"), trigger: "blur" },
                ],
                password: [
                    { required: true, message: this.$t("account.common.passwordPlaceholder"), trigger: "blur" },
                    { min: 6, max: 30, message: this.$t("account.common.passwordError"), trigger: "blur" },
                ],
            },

            agreement: false,
        };
    },
    computed: {
        canSubmit() {
            return this.form.username && this.form.password && this.agreement;
        },
        loginLink() {
            const path = this.$router.resolve({ name: "username-login", query: { app: this.app } });
            return path.href;
        },
    },
    async mounted() {
        // 生成特征码
        User.generateFingerprint();
    },
    methods: {
        async check(rule, value, callback) {
            if (!value) {
                callback(new Error(this.$t("account.username.namePlaceholder")));
            } else {
                // 长度最小3，最大20，禁止任何符号，不能是纯数字，必须以字母开头
                const regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
                if (!regex.test(value)) {
                    callback(new Error(this.$t("account.username.nameValidate")));
                } else {
                    const res = await checkUsername(value);
                    if (res) {
                        callback(new Error(this.$t("account.username.nameExist")));
                    } else {
                        callback();
                    }
                }
            }
        },
        onRegister() {
            this.$refs.registerForm.validate(async (valid) => {
                if (valid) {
                    registerByUsername(this.form, { app: this.app }).then(() => {
                        this.$message.success(this.$t("account.username.registerSuccess"));
                        this.$router.push({ name: "username-login", query: { app: this.app } });
                    });
                }
            });
        },
    },
};
</script>
