<!-- 支付弹窗组件使用示例 -->
<template>
    <div class="demo">
        <h1>支付弹窗组件演示</h1>

        <el-button type="primary" @click="openPayDialog">打开支付弹窗</el-button>

        <!-- 支付弹窗 -->
        <Payment
            v-model="payVisible"
            title="支付中心"
            width="50%"
            :product-id="productId"
            :count="count"
            :product-desc="productDesc"
            :pay-mode="'wepay'"
            :return-url="'/order/success'"
            :api-request="handleApiRequest"
            @done="onPaymentDone"
            @cancel="onPaymentCancel"
            @error="onError"
        />
    </div>
</template>

<script>
import Payment from './pay.vue';
import axios from 'axios'; // 或者你的请求库

function $http(options = {}, axiosConfig = {}) {
    // 解构options并设置默认值
    const { interceptor = true, domain, region, progress } = options;

    // 获取请求域名
    let requestDomain = "";
    if (domain) {
        requestDomain = domain;
    } else {
        requestDomain = import.meta.env.VUE_APP_COMMON_API;
    }

    // 设置请求头
    let config = {
        // 同时发送cookie和basic auth
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("RX_Token"),
        },
        baseURL: requestDomain,
    };

    // 设置进度条
    if (progress) {
        config.onUploadProgress = progress;
    }

    // 创建实例
    const ins = axios.create(Object.assign(axiosConfig, config));

    return ins;
}

export default {
    components: {
        Payment,
    },
    data() {
        return {
            payVisible: false, // 支付弹窗显示状态
            productId: 1,
            count: 1,
            productDesc: 'VIP会员 - 年度套餐',
        };
    },
    methods: {
        // 打开支付弹窗
        openPayDialog() {
            this.payVisible = true;
        },

        // API请求函数 - 适配你的项目
        async handleApiRequest(url, method, data) {
            try {
                console.log(`API请求: ${method} ${url}`, data);
                const response = await $http()[method.toLowerCase()](url, method === 'GET' ? { params: data } : data);
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        // 支付完成
        onPaymentDone(data) {
            console.log('支付成功:', data);
            this.$message?.success('支付成功！');
            // 弹窗会自动关闭并刷新页面
        },

        // 取消支付
        onPaymentCancel() {
            console.log('用户取消支付');
        },

        // 错误处理
        onError({ step, error }) {
            console.error(`${step} 失败:`, error);
            this.$message?.error(error.message || '操作失败');
        },
    },
};
</script>

<style scoped>
.demo {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    text-align: center;
}

h1 {
    margin-bottom: 40px;
}
</style>
