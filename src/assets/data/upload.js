import { $cms } from "@iruxu/rx-common/utils/api";
// 这是vite
const domain = import.meta.env.VITE_APP_CMS_API;

export const upload = async (file) => {
    return $cms({ domain: domain }).post("/user/upload/avatar", file, {
        headers: {
            "Content-Type": file.type || "application/octet-stream",

        },
    })
}
