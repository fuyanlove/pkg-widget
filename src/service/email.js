import { $uc } from "@iruxu/pkg-common/utils/api";

// ============ 邮箱相关 ============
/**
 * 查询邮箱是否可用
 * @param {String} email 邮箱
 * @returns {Promise}
 */
export async function checkEmail(email) {
    return $uc()
        .get("/api/uc/user/account/email/valid", {
            params: {
                email,
            },
        })
        .then((res) => res.data.data?.isExist);
}

/**
 * 注册账号 - 邮箱注册 发送验证码
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function registerByEmail(data, params) {
    return $uc().post("/api/uc/user/account/email/register", data, {
        params,
    });
}

/**
 * 邮箱注册 - 激活
 * @param {Object} data
 * @param {String} data.token
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function activeByEmail(data, params) {
    return $uc({ mute: true }).post("/api/uc/user/account/email/active", data, {
        params,
    });
}

/**
 * 邮箱登录
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function loginByEmail(data, params) {
    return $uc({ mute: true }).post("/api/uc/user/account/email/login", data, {
        params,
    });
}

/**
 * 绑定邮箱
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function bindEmail(data, params) {
    return $uc().post("/api/uc/user/account/email/bind", data, {
        params,
    });
}

/**
 * 验证邮箱
 * @param {Object} data
 * @param {String} data.code 验证码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function verifyEmail(data, params) {
    return $uc().put("/api/uc/user/account/email/verify", data, {
        params,
    });
}

/**
 * 找回密码
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function findPassword(data, params) {
    return $uc().post("/api/uc/user/account/email/forgot-password", data, {
        params,
    });
}

/**
 * 重设密码
 * @param {Object} data
 * @param {String} data.email 邮箱
 * @param {String} data.code 验证码
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function resetPassword(data, params) {
    return $uc().put("/api/uc/user/account/email/reset-password", data, {
        params,
    });
}
