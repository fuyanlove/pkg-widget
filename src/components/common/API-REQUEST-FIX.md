# API 请求 404 问题修复说明

## 🔍 问题原因

### 1. API 调用方式不匹配

**组件期望的调用方式:**
```javascript
// pay.vue 组件 Props 定义
apiRequest: {
    type: Function,
    required: true,
    // 约定: (url, method, data) => Promise
}
```

**之前的错误调用:**
```javascript
// ❌ 错误: 组件内部这样调用
await this.apiRequest.post('/api/xxx', data)
await this.apiRequest.get('/api/xxx')

// 这要求 apiRequest 是一个 axios 实例,而不是函数!
```

**现在的正确调用:**
```javascript
// ✅ 正确: 统一使用函数调用
await this.apiRequest('/api/xxx', 'POST', data)
await this.apiRequest('/api/xxx', 'GET')
```

### 2. Demo 文件引用错误组件

```javascript
// ❌ 错误
import Payment from './paypop.vue';

// ✅ 正确
import Payment from './pay.vue';
```

## ✅ 修复内容

### 修改 1: pay.vue 组件 - 统一 API 调用方式

已将所有 API 调用从:
- `this.apiRequest.post(url, data)`
- `this.apiRequest.get(url)`

改为:
- `this.apiRequest(url, 'POST', data)`
- `this.apiRequest(url, 'GET')`

涉及的接口:
1. **创建订单**: `POST /api/client/order/make/batch`
2. **查询订单状态**: `GET /api/client/order/pending/item/:id`
3. **获取支付二维码**: `GET /api/client/payment/item/:id/pay/:type/qrcode`
4. **查询支付状态**: `GET /api/client/payment/item/:id/simple`

### 修改 2: pay-dialog-demo.vue - 修正组件引用

```javascript
import Payment from './pay.vue';  // 正确引用
```

## 📝 正确的使用方式

### handleApiRequest 函数示例

```javascript
async handleApiRequest(url, method, data) {
    try {
        const response = await $http()[method.toLowerCase()](
            url,
            method === 'GET' ? { params: data } : data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}
```

### 完整使用示例

```vue
<template>
    <Payment
        v-model="payVisible"
        :product-id="productId"
        :count="count"
        :product-desc="productDesc"
        :pay-mode="'wepay'"
        :api-request="handleApiRequest"
        @done="onPaymentDone"
        @error="onError"
    />
</template>

<script>
import Payment from './pay.vue';
import axios from 'axios';

function $http(options = {}) {
    const requestDomain = import.meta.env.VUE_APP_COMMON_API;

    return axios.create({
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("RX_Token"),
        },
        baseURL: requestDomain,
    });
}

export default {
    components: { Payment },
    data() {
        return {
            payVisible: false,
            productId: 2,
            count: 1,
            productDesc: 'VIP会员 - 年度套餐',
        };
    },
    methods: {
        async handleApiRequest(url, method, data) {
            try {
                const http = $http();
                const response = await http[method.toLowerCase()](
                    url,
                    method === 'GET' ? { params: data } : data
                );
                return response.data;
            } catch (error) {
                console.error('API请求失败:', error);
                throw error;
            }
        },

        onPaymentDone(data) {
            this.$message?.success('支付成功！');
        },

        onError({ step, error }) {
            this.$message?.error(error.message || '操作失败');
        },
    },
};
</script>
```

## 🔧 调试建议

### 1. 检查 API 请求是否正确发送

在 handleApiRequest 中添加日志:

```javascript
async handleApiRequest(url, method, data) {
    console.log('API请求:', { url, method, data });
    try {
        const response = await $http()[method.toLowerCase()](url, ...);
        console.log('API响应:', response.data);
        return response.data;
    } catch (error) {
        console.error('API错误:', error.response || error);
        throw error;
    }
}
```

### 2. 检查请求头和 Token

确保:
- `VUE_APP_COMMON_API` 环境变量正确设置
- `RX_Token` 存在于 localStorage
- baseURL 不要以 `/` 结尾
- API 路径以 `/` 开头

### 3. 检查网络请求

打开浏览器开发者工具 Network 标签,查看:
- 请求的完整 URL 是否正确
- 请求方法是否正确 (GET/POST)
- 请求头 Authorization 是否携带
- 响应状态码和错误信息

## ⚠️ 常见错误

### 错误 1: 404 Not Found
**原因**:
- baseURL 和 url 拼接错误
- API 路径不正确
- 后端接口未实现

**检查**:
```javascript
// 假设 baseURL = 'https://api.example.com'
// url = '/api/client/order/make/batch'
// 最终请求: https://api.example.com/api/client/order/make/batch
```

### 错误 2: 401 Unauthorized
**原因**: Token 未携带或已过期

**检查**:
```javascript
console.log('Token:', localStorage.getItem("RX_Token"));
```

### 错误 3: CORS 错误
**原因**: 跨域配置问题

**解决**:
- 开发环境配置代理 (vite.config.js)
- 后端配置 CORS 头

## 📚 相关文件

- `/src/components/common/pay.vue` - 支付组件
- `/src/components/common/pay-dialog-demo.vue` - 使用示例
- `/src/components/common/PAY-README.md` - 完整文档
