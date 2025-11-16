# 支付组件 (Payment Dialog)

一个功能完整的支付弹窗组件，支持支付宝和微信支付，包含完整的订单创建、状态轮询、二维码展示和支付确认流程。

## ✨ 特性

- 🎯 **弹窗展示** - 基于 Element Plus Dialog，支持自定义标题和宽度
- 💰 **双支付方式** - 支持支付宝和微信支付，可自由切换
- 🔄 **自动轮询** - 自动轮询订单状态和支付状态
- 📱 **二维码支付** - 动态生成支付二维码，支持电脑版支付宝跳转
- ⚡ **依赖注入** - 通过传入 API 请求函数，适配不同项目的认证机制
- � **内置国际化** - 内置中英文支持，不依赖外部 i18n 实例
- �🎨 **完整 UI** - 加载状态、成功提示、错误警告一应俱全
- 📲 **响应式设计** - 支持移动端适配

## 📦 安装依赖

```bash
npm install qrcode.vue element-plus
```

## 🚀 快速开始

### 基础使用

```vue
<template>
  <div>
    <el-button @click="payVisible = true">立即支付</el-button>

    <Payment
      v-model="payVisible"
      title="支付中心"
      :product-id="productId"
      :product-desc="'VIP会员 - 年度套餐'"
      :count="1"
      :api-request="handleApiRequest"
      @done="onPaymentSuccess"
      @cancel="onPaymentCancel"
    />
  </div>
</template>

<script>
import Payment from '@/components/common/pay.vue';
import axios from 'axios';

export default {
  components: { Payment },
  data() {
    return {
      payVisible: false,
      productId: 123,
    };
  },
  methods: {
    // API 请求适配函数
    async handleApiRequest(url, method, data) {
      const response = await axios({
        url,
        method,
        data: method === 'POST' ? data : undefined,
        params: method === 'GET' ? data : undefined,
      });
      return response.data;
    },

    onPaymentSuccess(data) {
      this.$message.success('支付成功！');
      // 支付成功后会自动刷新页面
    },

    onPaymentCancel() {
      console.log('用户取消支付');
    },
  },
};
</script>
```

## 📖 API 文档

### Props

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `modelValue` / `v-model` | Boolean | 否 | `false` | 弹窗可见性，支持双向绑定 |
| `title` | String | 否 | `'支付中心'` | 弹窗标题 |
| `width` | String | 否 | `'50%'` | 弹窗宽度 |
| `locale` | String | 否 | `auto` | 语言设置：`'zh-CN'` / `'en-US'`，默认自动检测 |
| `payMode` | String | 否 | `'wepay'` | 默认支付方式：`'wepay'` / `'alipay'` |
| `productId` | String/Number | **是** | - | 商品ID |
| `productDesc` | String | 否 | `'商品支付'` | 商品描述，显示在支付页面 |
| `count` | Number | 否 | `1` | 购买数量 |
| `returnUrl` | String | 否 | `''` | 支付后返回URL |
| `orderData` | Object | 否 | `null` | 自定义订单数据（用于批量购买） |
| `apiRequest` | Function | **是** | - | API请求函数，见下方说明 |
| `pollingConfig` | Object | 否 | 见下方 | 轮询配置 |

#### apiRequest 函数签名

```typescript
async function apiRequest(
  url: string,      // 接口 URL
  method: string,   // 请求方法：'GET' / 'POST'
  data?: object     // 请求数据
): Promise<any>
```

#### pollingConfig 默认配置

```javascript
{
  orderInterval: 2000,    // 订单状态轮询间隔(ms)
  paymentInterval: 3000,  // 支付状态轮询间隔(ms)
  maxRetries: 60          // 最大轮询次数
}
```

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `(visible: boolean)` | 弹窗可见性变化时触发 |
| `done` | `(response: object)` | 支付成功时触发（会自动关闭弹窗并刷新） |
| `cancel` | - | 用户点击取消时触发 |
| `order-created` | `(response: object)` | 订单创建成功时触发 |
| `order-ready` | `(response: object)` | 订单准备完成（减库存成功）时触发 |
| `qrcode-generated` | `(response: object)` | 二维码生成成功时触发 |
| `error` | `({ step: string, error: Error })` | 发生错误时触发 |

## 🔄 支付流程

组件实现了完整的支付流程，无需手动干预：

```
1. 打开弹窗
   ↓
2. 创建订单
   └─ POST /api/client/order/make/batch
   ↓
3. 轮询订单状态
   └─ GET /api/client/order/pending/item/{id}
   └─ 等待 status === 2（减库存成功）
   ↓
4. 获取支付二维码
   └─ GET /api/client/payment/item/{id}/pay/{payType}/qrcode
   ↓
5. 展示二维码 & 自动轮询支付状态
   └─ GET /api/client/payment/item/{id}/simple
   └─ 检查 status === 'paid' 或 paid === true
   ↓
6. 支付成功 → 触发 @done 事件 → 自动刷新页面
```

## 📡 后端接口约定

### 1. 创建订单

```http
POST /api/client/order/make/batch
Content-Type: application/json

{
  "productId": 123,
  "count": 1
}
```

**响应示例：**
```json
{
  "id": 456,
  "status": 1,
  "message": "订单已创建"
}
```

### 2. 查询订单预处理状态

```http
GET /api/client/order/pending/item/456
```

**响应示例：**
```json
{
  "id": 456,
  "status": 2,          // 2 表示减库存成功，可以支付
  "payment_id": 789,
  "amount": 19900       // 价格（分）
}
```

### 3. 获取支付二维码

```http
GET /api/client/payment/item/789/pay/wepay/qrcode
```

**响应示例：**
```json
{
  "qrcode": "weixin://wxpay/bizpayurl?pr=xxxxx",
  "skip_url": "https://qr.alipay.com/xxx",  // 支付宝跳转链接（可选）
  "amount": 19900
}
```

### 4. 查询支付状态

```http
GET /api/client/payment/item/789/simple
```

**响应示例：**
```json
{
  "status": "paid",     // 或 "pending", "failed"
  "paid": true,         // 或使用 pay_status: 1
  "order_id": "xxxxx"
}
```

## 💡 高级用法

### 国际化设置

组件内置中英文支持，默认根据浏览器语言或 localStorage 自动检测。

```vue
<!-- 指定使用英文 -->
<Payment
  v-model="payVisible"
  locale="en-US"
  :product-id="123"
  :api-request="handleApiRequest"
/>

<!-- 指定使用中文 -->
<Payment
  v-model="payVisible"
  locale="zh-CN"
  :product-id="123"
  :api-request="handleApiRequest"
/>

<!-- 自动检测（默认） -->
<Payment
  v-model="payVisible"
  :product-id="123"
  :api-request="handleApiRequest"
/>
```

**支持的语言：**
- `zh-CN` - 简体中文
- `en-US` - English

**语言检测优先级：**
1. 组件 `locale` prop
2. localStorage 中的 `lang` 键
3. 浏览器语言设置

### 自定义轮询配置

```vue
<Payment
  v-model="payVisible"
  :product-id="123"
  :api-request="handleApiRequest"
  :polling-config="{
    orderInterval: 1000,    // 1秒轮询一次订单
    paymentInterval: 2000,  // 2秒轮询一次支付
    maxRetries: 120         // 最多轮询120次
  }"
/>
```

### 批量购买多个商品

```vue
<Payment
  v-model="payVisible"
  :product-id="0"
  :order-data="{
    items: [
      { productId: 101, count: 2 },
      { productId: 102, count: 1 },
    ],
    couponCode: 'DISCOUNT10'
  }"
  :api-request="handleApiRequest"
/>
```

### 监听所有事件

```vue
<Payment
  v-model="payVisible"
  :product-id="123"
  :api-request="handleApiRequest"
  @order-created="onOrderCreated"
  @order-ready="onOrderReady"
  @qrcode-generated="onQrcodeGenerated"
  @done="onPaymentDone"
  @cancel="onCancel"
  @error="onError"
/>
```

```javascript
methods: {
  onOrderCreated(data) {
    console.log('订单ID:', data.id);
  },
  onOrderReady(data) {
    console.log('支付ID:', data.payment_id);
    console.log('金额:', data.amount);
  },
  onQrcodeGenerated(data) {
    console.log('二维码:', data.qrcode);
  },
  onPaymentDone(data) {
    console.log('支付成功！', data);
  },
  onCancel() {
    console.log('用户取消支付');
  },
  onError({ step, error }) {
    console.error(`${step} 步骤出错:`, error);
  },
}
```

## 🔧 不同项目接入示例

### 项目 A - Token 在 Header

```javascript
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://api.example.com',
});

// 请求拦截器添加 token
apiInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function handleApiRequest(url, method, data) {
  const response = await apiInstance({ url, method, data });
  return response.data;
}
```

### 项目 B - Token 在 Cookie

```javascript
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true, // 自动携带 cookie
});

async function handleApiRequest(url, method, data) {
  const response = await apiInstance({ url, method, data });
  return response.data;
}
```

### 项目 C - 使用 Fetch API

```javascript
async function handleApiRequest(url, method, data) {
  const token = localStorage.getItem('token');

  const response = await fetch(`https://api.example.com${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: method === 'POST' ? JSON.stringify(data) : undefined,
  });

  return await response.json();
}
```

## � 扩展其他语言

如需支持更多语言，可以编辑 `pay-i18n.js` 文件：

```javascript
// pay-i18n.js
export const payLocales = {
    'zh-CN': { /* 中文翻译 */ },
    'en-US': { /* 英文翻译 */ },
    'ja-JP': {  // 添加日语
        payment: {
            title: '決済センター',
            loading: '注文処理中...',
            success: '支払い成功！',
            // ... 其他翻译
        }
    },
    'ko-KR': {  // 添加韩语
        payment: {
            title: '결제 센터',
            loading: '주문 처리 중...',
            success: '결제 성공!',
            // ... 其他翻译
        }
    }
};
```

然后在组件中使用：

```vue
<Payment locale="ja-JP" ... />
<Payment locale="ko-KR" ... />
```

## �🎨 自定义样式

组件使用 LESS 编写，可以通过覆盖 CSS 变量或类名来自定义样式：

```less
// 自定义支付弹窗样式
.c-pay-pop {
  :deep(.el-dialog) {
    max-width: 800px !important;
  }

  .u-price b {
    color: #ff6600 !important; // 自定义价格颜色
  }

  .u-qrcode {
    border-width: 2px !important; // 自定义二维码边框
  }
}
```

## 📱 移动端适配

组件已内置移动端适配，在小屏设备上会自动调整布局：

```less
@media screen and (max-width: 720px) {
  // 弹窗全屏显示
  // 二维码响应式调整
  // 按钮布局优化
}
```

## ⚠️ 注意事项

1. **必须传入 `apiRequest` 函数**：用于适配不同项目的请求库和认证方式
2. **后端接口格式**：确保后端接口返回的数据格式与文档约定一致
3. **轮询超时**：默认最多轮询 60 次，可通过 `pollingConfig` 调整
4. **支付成功后刷新**：组件默认在支付成功 2 秒后刷新页面，如不需要可监听 `@done` 事件自行处理
5. **图片资源**：需要准备支付宝和微信的图标，路径为 `../../assets/img/pay/alipay.png` 和 `wepay.png`

## 🐛 常见问题

**Q: 二维码一直在加载中？**
A: 检查后端接口是否正常返回二维码数据，查看控制台是否有请求错误。

**Q: 支付成功但没有触发 @done 事件？**
A: 检查后端支付状态接口返回的字段，组件支持 `status === 'paid'`、`paid === true` 或 `pay_status === 1`。

**Q: 如何禁止用户关闭弹窗？**
A: 组件已设置 `:close-on-click-modal="false"` 和 `:close-on-press-escape="false"`，用户只能通过底部按钮关闭。

**Q: 如何自定义支付成功后的行为？**
A: 监听 `@done` 事件并设置 `event.preventDefault()`，然后自行处理跳转逻辑。

**Q: 切换支付方式后二维码未更新？**
A: 组件会自动重新获取二维码，如果没有更新，检查 `onPayTypeChange` 方法是否被正确触发。

**Q: 如何切换语言？**
A: 通过 `locale` prop 指定语言，或在 localStorage 中设置 `lang` 键。组件会自动检测并应用相应语言。

**Q: 组件文本没有显示为指定语言？**
A: 确保 `locale` 值正确（`zh-CN` 或 `en-US`），并检查 `pay-i18n.js` 文件中是否有对应的翻译。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
