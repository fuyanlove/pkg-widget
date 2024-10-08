<template>
    <div class="c-lang-select">
        <div class="u-select-label"><span class="fi" :class="flag"></span></div>
        <el-select class="u-select" v-model="current" popper-class="c-lang-select__pop" filterable :filter-method="filterMethod" @change="onLangChange">
            <el-option v-for="item in filterLanguages" :key="item.langCode" :label="item.name" :value="item.langCode">
                <span class="fi" :class="`fi-${item.countryCode}`"></span>
                <span>{{ item.name }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
import Lang from "@iruxu/pkg-common/data/language.json";
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

            filterLanguages: [],
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
    mounted() {
        this.filterLanguages = this.languages;
    },
    methods: {
        onLangChange(lang) {
            this.$emit("change", lang);

            this.$i18n.locale = lang;
            User.setLocale(lang);
        },
        filterMethod(query) {
            if (query !== "") {
                this.filterLanguages = this.languages.filter((item) => {
                    return item.name
                        .toLowerCase()
                        .includes(query.toLowerCase());
                });
            } else {
                this.filterLanguages = this.languages;
            }
        },
    },
};
</script>

<style lang="less">
.c-lang-select {
    position: relative;
    .flex;
    align-items: center;
    .u-select-label {
        background-color: #f5f7fa;
        color: #909399;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        line-height: 20px;
        padding: 16px 12px;
        border-radius: 4px;
        white-space: nowrap;
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: 1px 0 0 0 #dcdfe6 inset, 0 1px 0 0 #dcdfe6 inset, 0 -1px 0 0 #dcdfe6 inset;
        font-size: 14px;
        box-sizing: border-box;
    }
    .el-select {
        .el-input__wrapper,
        .el-select__wrapper {
            width: 120px;
            height: 24px;
            line-height: 20px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            box-sizing: border-box;
            box-shadow: 0 1px 0 0 #dcdfe6 inset, 0 -1px 0 0 #dcdfe6 inset, 0 0 0 1px #dcdfe6 inset;
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
