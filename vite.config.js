import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginRequire from "vite-plugin-require";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vitePluginRequire.default()],
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `
                    @import "./node_modules/csslab/base.less";
                    @import "./node_modules/csslab/reset.less";
                    @import "./src/assets/css/var.less";
                `,
            },
        },
    },
});
