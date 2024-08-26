import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import path from 'path';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['defaults', 'not IE 11', 'last 2 versions'], // Điều chỉnh mục tiêu để bao gồm các trình duyệt hỗ trợ mới hơn
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-async-to-generator'] // Chuyển đổi async generators
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: {
          vendor: ['vue', 'vuex', 'vue-router'], // Tách các thư viện chính ra
          lodash: ['lodash'], // Thêm lodash vào chunk riêng nếu cần thiết
          // Bạn có thể thêm các chunks khác nếu cần thiết
        }
      }
    },
    chunkSizeWarningLimit: 2000 // Tăng giới hạn cảnh báo kích thước chunk lên 2000 KiB
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});
