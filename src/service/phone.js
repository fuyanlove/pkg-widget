import { $uc } from "@iruxu/pkg-common/utils/api";

const options = {
    domain: import.meta.env.MODE === "development" ? "http://localhost:14150" : "",
}

// ============ 手机相关 ============

// 注册
/**
 * 查询手机号是否可用
 * @param {String} phone 手机号
 * @returns {Promise}
 */
export async function checkPhone(phone) {
    return $uc(options)
        .get("/api/uc/user/account/phone/valid", {
            params: {
                phone,
            },
        })
        .then((res) => res.data.data?.isExist);
}

/**
 * 注册账号 - 手机注册
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function registerByPhone(data, params) {
    return $uc(options).post("/api/uc/user/account/phone/register", data, {
        params,
    });
}

/**
 * 校验手机与验证码
 * @param {Object} params
 * @param {String} params.phone 手机号
 * @param {String} params.code 验证码
 * @returns
 */
export async function checkPhoneCode(params) {
    return $uc(options).get("/api/uc/user/account/phone/check-code", {
        params,
    });
}

/**
 * 手机注册 - 激活
 * @param {String} data.phone 手机号
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function activeByPhone(data, params) {
    return $uc(options).post("/api/uc/user/account/phone/active", data, {
        params,
    });
}


// 绑定

/**
 * 绑定手机号
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function bindPhone(data, params) {
    return $uc(options).post("/api/uc/user/account/phone/bind", data, {
        params,
    });
}

// 登录

/**
 * 手机登录 - 账号密码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function loginByPhone(data, params) {
    return $uc(options).post("/api/uc/user/account/phone/login", data, {
        params,
    });
}

/**
 * 手机登录 - 发送验证码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function sendLoginCode(data, params) {
    return $uc(options).post("/api/uc/user/account/phone/login/code-send", data, {
        params,
    });
}

/**
 * 手机登录 - 验证码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {String} data.code 验证码
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function loginByPhoneCode(data, params) {
    return $uc(options).post("/api/uc/user/account/phone/login/code-verify", data, {
        params,
    });
}

// 忘记密码

/**
 * 忘记密码 - 发送验证码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function sendCode(data, params) {
    return $uc(options).post("/api/uc/user/account/phone/forgot-password", data, {
        params,
    });
}

/**
 * 重置密码
 * @param {Object} data
 * @param {String} data.phone 手机号
 * @param {String} data.code 验证码
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 */
export function resetPassword(data, params) {
    return $uc(options).put("/api/uc/user/account/phone/reset-password", data, {
        params,
    });
}
