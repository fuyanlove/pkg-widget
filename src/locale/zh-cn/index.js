export default {
    payment: {
        title: '支付中心',
        loading: '正在处理订单...',
        loadingCreate: '正在创建订单...',
        loadingQrcode: '正在生成二维码...',
        loadingOrder: '正在处理订单...',
        success: '支付成功！',
        successDesc: '订单已完成,感谢您的购买',

        // 支付方式
        alipay: '支付宝支付',
        alipayTip: '支持花呗分期',
        wepay: '微信支付',
        wepayTip: '支持信用卡',

        // 价格
        currency: '元',

        // 提示
        pcAlipay: '手机不在身边？使用',
        pcAlipayLink: '电脑版支付宝',
        pcAlipaySuffix: '支付。',
        expireTip: '（20分钟过期，请在支付完成后点击【已完成支付】）',
        warningTitle: '订单尚未支付或已过期',

        // 按钮
        cancel: '取消',
        completed: '已完成支付',

        // 错误提示
        invalidOrder: '无效订单号',
        createOrderFailed: '创建订单失败',
        orderTimeout: '订单处理超时',
        orderFailed: '订单处理失败',
        getQrcodeFailed: '获取支付二维码失败',
        paymentTimeout: '支付超时',
    }
};
