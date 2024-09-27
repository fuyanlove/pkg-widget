import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `
                    @import "./node_modules/csslab/base.less";
                    @import "./src/assets/css/var.less";
                `,
            },
        },
    },
})
