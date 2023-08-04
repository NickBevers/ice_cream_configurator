import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.glb', '**/*.gltf'],
    plugins: [vue()],
})
