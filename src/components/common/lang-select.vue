<template>
    <div class="w-select c-lang-select">
        <div class="u-select-label"><span class="fi" :class="flag"></span></div>
        <el-select class="u-select" v-model="current" popper-class="c-lang-select__pop" @change="onLangChange">
            <el-option v-for="item in languages" :key="item.langCode" :label="item.name" :value="item.langCode">
                <span class="fi" :class="`fi-${item.countryCode}`"></span>
                <span>{{ item.name }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
import Lang from "../../assets/data/language.json";
import "flag-icons/css/flag-icons.min.css";
import User from "@iruxu/pkg-common/utils/user";
export default {
    name: "LangSelect",
    props: {
        lang: {
            type: String,
            default: "zh-CN",
        },
    },
    data() {
        return {
            current: "",
        };
    },
    computed: {
        languages() {
            return Lang.languages;
        },
        flag() {
            const langObj = Lang.languages.find((item) => item.langCode == this.current);
            const countryCode = langObj?.countryCode;

            return `fi-${countryCode?.toLowerCase()}`;
        },
    },
    watch: {
        lang: {
            handler: function (val) {
                this.current = val;
            },
            immediate: true,
        },
    },
    methods: {
        onLangChange(lang) {
            this.$emit("change", lang);

            this.$i18n.locale = lang;
            User.setLocale(lang);
        },
    },
};
</script>

<style lang="less">
.c-lang-select {
    .u-select-label {
        height: 24px;
        line-height: 20px;
        padding: 16px 12px;
    }
    .el-select {
        width: 120px;
        .el-input__wrapper,
        .el-select__wrapper {
            height: 24px;
            line-height: 20px;
            min-width: auto;
        }
    }
}
.c-lang-select__pop {
    .el-select-dropdown__item {
        .flex;
        align-items: center;
        gap: 10px;
    }
}
</style>
