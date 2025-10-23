import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },  
  plugins: [
    vue(),
    vueDevTools()
  ],
})
