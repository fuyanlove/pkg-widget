<template>
    <div class="m-card__header">
        <h4 class="u-title">{{ title }}</h4>

        <div class="m-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardHeader",
    props: {
        title: {
            type: String,
            default: "iruxu",
        },
    },
    data: function () {
        return {};
    },
};
</script>

<style scoped lang="less">
.m-card__header {
    border-bottom: 1px solid #f9f9f9;
    line-height: 30px;
    -ms-grid-row-align: center;
    align-self: center;
    width: 100%;
    min-height: 70px;
    padding: 15px 25px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .pr;
    justify-content: space-between;
    .u-title {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        line-height: 28px;
        color: @primary;
    }
}
</style>
