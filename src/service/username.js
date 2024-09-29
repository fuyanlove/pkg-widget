import { $uc } from "@iruxu/pkg-common/utils/api";

// ============ 用户名相关 ============
/**
 * 查询用户名称是否可用
 * @param {String} username 用户名
 * @returns {Promise}
 */
export async function checkUsername(username) {
    return $uc()
        .get("/api/uc/user/account/username/valid", {
            params: {
                username,
            },
        })
        .then((res) => res.data.data?.isExist);
}

/**
 * 注册账号 - 用户名注册
 * @param {Object} data
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function registerByUsername(data, params) {
    return $uc().post("/api/uc/user/account/username/register", data, {
        params,
    });
}

/**
 * 用户登录
 * @param {Object} data
 * @param {String} data.username 用户名
 * @param {String} data.password 密码
 * @param {Object} params
 * @param {String} params.app 应用标识
 * @returns
 */
export function loginByUsername(data, params) {
    return $uc({ mute: true }).post("/api/uc/user/account/username/login", data, {
        params,
    });
}
