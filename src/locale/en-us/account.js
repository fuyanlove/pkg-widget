export default {
    common: {
        // UI Labels
        login: "Login",
        password: "Password",
        passwordConfirm: "Confirm Password",
        register: "Register",
        noAccount: "Don't have an account?",
        hadAccount: "Already have an account?",
        registerNow: "Register Now",
        back: "Back",

        // Account Messages
        loginSuccess: "Login Success",
        loginSuccessDesc: "Dear, Welcome back!",
        passwordPlaceholder: "Please enter your password",
        password2Placeholder: "Please enter your password again",
        passwordError: "Length between 6 and 30 characters",
        passwordError2: "The two passwords do not match",
        read: "I have read and agree to",
        terms: "Terms of Service",
        jump: "Jumping to",
        backToHome: "Back to Home",

        // Route Name
        dashboard: "Dashboard",
        usernameLogin: "Login - Username",
        usernameRegister: "Register - Username",
        emailLogin: "Login - Email",
        emailRegister: "Register - Email",
        emailResetPassword: "Reset Password - Email",
    },
    email: {
        // UI Labels
        address: "Email",
        nickname: "Nickname",
        lang: "Language",
        code: "Code",
        invite_code: "Invite Code",
        next: "Next",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",

        // UI Placeholders
        forgetPassword: "Forgot Password",
        emailRegistered: "Email has been registered",

        // UI Errors
        addressPlaceholder: "Please enter your email address",
        addressError: "Please enter a valid email address",
        nicknamePlaceholder: "Please enter your nickname",
        nicknameError: "Please enter a valid nickname",

        // UI Messages
        // Register
        send: "Send Code",
        sendSuccess: "Send Success",
        registerSuccess: "Register Success",
        registerSuccessDesc:
            "Congratulations, you are now a member of RX Planet!",

        waitVerify: "Wait for verification",
        successDesc:
            "A verification email has been sent to your email address {email}. Click the activation link to complete your registration successfully! The email is valid for 24 hours.",

        registerFailed: "Registration failed",
        registerFailedDesc: "Registration failed, please try again later",

        // Login
        loginFailed: "Login failed, please check the email and password",

        // Reset
        resetEmailPlaceholder: "yourname@example.com",
        illegalRequest: "Illegal request",
        resend: "Resend",
        resetSuccess: "Reset Success",
        resetSuccessDesc: "Your password has been reset successfully",
        findPassword:
            "We will send an email containing the reset verification code to your mailbox.",
        resetPassword: "Reset Password",
    },
    username: {
        name: "Username",
        namePlaceholder: "Please enter your username",
        nameError: "Length between 3 and 30 characters",
        registerSuccess: "Register Success",
        loginFailed: "Login failed, please check the username and password",
        nameExist: "Username already exists",
        nameValidate:
            "The username must start with a letter and be between 3 and 20 characters long",
    },
    phone: {
        number: "Phone number",
        code: "Code",

        phoneRegistered: "PhoneNumber has been registered",

        // UI Errors
        numberPlaceholder: "Please enter your phone number",
        numberError: "Please enter a valid phone number",
        codePlaceholder: "Please enter the verification code",
        codeError: "Please enter the correct verification code",

        // UI Messages
        send: "Send Code",
        sendSuccess: "Send Success",
        registerSuccess: "Register Success",
        registerSuccessDesc:
            "Congratulations, you are now a member of RX Planet!",
        registerFailed: "Registration failed",
        registerFailedDesc: "Registration failed, please try again later",

        // Login
        loginFailedWithPwd:
            "Login failed, please check the phone number and password",

        // Reset
        resetPassword: "Reset Password",
        resetSuccess: "Reset Success",
        resetSuccessDesc: "Your password has been reset successfully",
    },
};
