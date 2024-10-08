export default {
    common: {
        // UI Labels
        login: "登录",
        password: "密码",
        passwordConfirm: "确认密码",
        register: "注册",
        noAccount: "还没有账号?",
        hadAccount: "已有账号?",
        registerNow: "立即注册",
        back: "返回",

        // Account Messages
        loginSuccess: "登录成功",
        loginSuccessDesc: "欢迎回来，宝！",
        passwordPlaceholder: "请输入密码",
        password2Placeholder: "请再次输入密码",
        passwordError: "长度在 6 到 30 个字符",
        passwordError2: "两次输入密码不一致",
        read: "我已阅读并同意",
        terms: "服务条款",
        jump: "即将跳转",
        backToHome: "返回首页",

        // Route Name
        dashboard: "个人中心",
        usernameLogin: "登录 - 用户名登录",
        usernameRegister: "注册 - 用户名注册",
        emailLogin: "登录 - 邮箱登录",
        emailRegister: "注册 - 邮箱注册",
        emailResetPassword: "重置密码 - 邮箱重置",
    },
    email: {
        // UI Labels
        address: "邮箱",
        nickname: "昵称",
        lang: "语言",
        code: "验证码",
        invite_code: "邀请码",
        next: "下一步",
        newPassword: "新密码",
        confirmPassword: "确认密码",

        // UI Placeholders
        forgetPassword: "忘记密码",
        emailRegistered: "邮箱已被注册",

        // UI Errors
        addressPlaceholder: "请输入邮箱地址",
        addressError: "请输入正确的邮箱地址",
        nicknamePlaceholder: "请输入昵称",
        nicknameError: "请输入正确的昵称",

        // UI Messages
        // Register
        send: "发送验证码",
        sendSuccess: "发送成功",
        registerSuccess: "注册成功",
        registerSuccessDesc: "恭喜，您现在已经是「RX星球」的一员啦！",

        waitVerify: "等待验证",
        successDesc:
            "已向您的邮箱{email}发送了一封验证邮件，点击激活链接即可注册成功！邮件有效期为24小时。",

        registerFailed: "注册失败",
        registerFailedDesc: "请检查提交信息是否正确，或稍后再试",

        // Login
        loginFailed: "登录失败, 请检查邮箱和密码",

        // Reset
        resetEmailPlaceholder: "yourname@example.com",
        illegalRequest: "非法请求",
        resend: "重新发送",
        resetSuccess: "重置成功",
        resetSuccessDesc: "您的密码已重置成功",
        findPassword: "我们将会发送一封包含重置验证码的邮件到您的邮箱",
        resetPassword: "重置密码",
    },
    username: {
        name: "用户名",
        namePlaceholder: "请输入用户名",
        nameError: "用户名长度在 3 到 30 个字符",
        registerSuccess: "注册成功",
        loginFailed: "登录失败, 请检查用户名和密码",
        nameExist: "用户名已存在",
        nameValidate: "用户名需以字母开头，长度在 3 到 20 个字符",
    },
    phone: {
        number: "手机号",
        code: "验证码",

        phoneRegistered: "手机号已被注册",

        // UI Errors
        numberPlaceholder: "请输入手机号",
        numberError: "请输入正确的手机号",
        codePlaceholder: "请输入验证码",
        codeError: "请输入正确的验证码",

        // UI Messages
        send: "发送验证码",
        sendSuccess: "发送成功",
        registerSuccess: "注册成功",
        registerSuccessDesc: "恭喜，您现在已经是「RX星球」的一员啦！",

        registerFailed: "注册失败",
        registerFailedDesc: "请检查提交信息是否正确，或稍后再试",

        // Login
        loginFailedWithPwd: "登录失败, 请检查手机号和密码",

        // Reset
        resetPassword: "重置密码",
        resetSuccess: "重置成功",
        resetSuccessDesc: "您的密码已重置成功",
    },
};
