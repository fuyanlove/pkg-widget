<template>
    <el-select
        v-model="select"
        filterable
        :filter-method="filterMethod"
        class="w-phonecode-select"
        popper-class="w-phonecode-select__pop"
        style="width: 200px"
        placeholder=""
    >
        <el-option
            v-for="country in filterData"
            :key="country.iso2"
            :label="country.name"
            :value="country.dialCode"
        >
            <span class="fi" :class="`fi-${country.iso2}`"></span>
            <span class="u-country">{{ country.name }} <span class="u-dial">(+{{ country.dialCode }})</span></span>
        </el-option>

        <template #label>
            <div class="m-label">
                <span class="fi" :class="`fi-${country?.iso2}`"></span>
                <span class="u-dial">(+{{ country?.dialCode }})</span>
            </div>
        </template>
    </el-select>
</template>

<script>
import "flag-icons/css/flag-icons.min.css";
import intlTelInput from "intl-tel-input";

export default {
    name: "CountryPhonecode",
    props: {
        modelValue: {
            type: [Number,  String],
            default: "",
        },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            countryData: [],
            filterData: [],
            select: ""
        };
    },
    computed: {
        country() {
            return this.countryData?.find(
                (item) => item.dialCode == this.select
            ) || {}
        },
    },
    watch: {
        select(val) {
            this.$emit("update:modelValue", val);
        },
        modelValue: {
            handler(val) {
                this.select = val;
            },
            immediate: true,
        }
    },
    mounted() {
        this.countryData = intlTelInput.getCountryData();
        this.filterData = this.countryData;
    },
    methods: {
        filterMethod(query) {
            if (query !== "") {
                this.filterData = this.countryData.filter((item) => {
                    return (item.name
                        .toLowerCase()
                        .includes(query.toLowerCase()) || item.dialCode.includes(query));
                });
            } else {
                this.filterData = this.countryData;
            }
        },
    },
};
</script>

<style lang="less">
.w-phonecode-select {
    .m-label {
        .flex;
        align-content: center;
        gap: 5px;
    }
}
.w-phonecode-select__pop {
    .u-country {
        margin-left: 10px;
    }
    .u-dial {
        color: #999;
    }
}
</style>
