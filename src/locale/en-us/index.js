export default {
    payment: {
        title: 'Payment Center',
        loading: 'Processing order...',
        loadingCreate: 'Creating order...',
        loadingQrcode: 'Generating QR code...',
        loadingOrder: 'Processing order...',
        success: 'Payment Successful!',
        successDesc: 'Order completed, thank you for your purchase',

        // Payment methods
        alipay: 'Alipay',
        alipayTip: 'Huabei installment supported',
        wepay: 'WeChat Pay',
        wepayTip: 'Credit card supported',

        // Price
        currency: 'CNY',

        // Tips
        pcAlipay: 'Mobile device not available? Use ',
        pcAlipayLink: 'PC version Alipay',
        pcAlipaySuffix: ' to pay.',
        expireTip: '(Expires in 20 minutes, please click [Payment Completed] after payment)',
        warningTitle: 'Order not paid or expired',

        // Buttons
        cancel: 'Cancel',
        completed: 'Payment Completed',

        // Error messages
        invalidOrder: 'Invalid order number',
        createOrderFailed: 'Failed to create order',
        orderTimeout: 'Order processing timeout',
        orderFailed: 'Order processing failed',
        getQrcodeFailed: 'Failed to get payment QR code',
        paymentTimeout: 'Payment timeout',
    }
};
