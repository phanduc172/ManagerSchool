import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import path from 'path';
import babel from '@rollup/plugin-babel';
import ip from "ip"

export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ['defaults', 'not IE 11', 'last 2 versions'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    // babel({
    //   babelHelpers: 'bundled',
    //   presets: ['@babel/preset-env'],
    //   plugins: ['@babel/plugin-transform-async-to-generator']
    // })
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
        additionalData: `@import "@/assets/scss/variables.scss";`,
        silenceDeprecations: ["legacy-js-api"],
      }
    }
  },
  // build: {
  //   outDir: 'dist',
  //   sourcemap: false, // Tự động mở trình duyệt
  //   // sourcemap: process.env.NODE_ENV === 'production', 
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: 'assets/[name].js',
  //       chunkFileNames: 'assets/[name].js',
  //       assetFileNames: 'assets/[name].[ext]',
  //       manualChunks: {
  //         vendor: ['vue', 'vuex', 'vue-router'],
  //         lodash: ['lodash'],
  //       }
  //     }
  //   },
  //   chunkSizeWarningLimit: 2000
  // },
  server: {
    // host: ip.address(),
    port: 8080,
    // open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:5000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
});
