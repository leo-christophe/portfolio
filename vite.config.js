import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  plugins: [
    vue(),
    viteCompression({
      algorithm: "gzip", // Options: gzip, brotliCompress, deflate, or custom
      ext: ".gz", // File extension for compressed files
      threshold: 10240, // Minimum file size to compress (10 KB)
      deleteOriginFile: false, // Whether to keep the original uncompressed files
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom", // Simule un environnement de navigateur
    coverage: {
      reporter: ["text", "json", "html"],
    },
  }
});
