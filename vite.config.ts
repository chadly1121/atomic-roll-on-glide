import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { prerenderBlogPlugin } from "./src/build/prerender-blog";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    prerenderBlogPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improve build process
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    target: 'es2015',
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Put React runtime in a separate chunk
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router-dom/')) {
            return 'vendor';
          }
          // Keep shadcn components together
          if (id.includes('@radix-ui/') || id.includes('src/components/ui/')) {
            return 'ui';
          }
          // Defer framer-motion to its own chunk (heavy, not needed for FCP)
          if (id.includes('framer-motion')) {
            return 'motion';
          }
        },
        // Ensure proper path for dynamically loaded chunks
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      // Optimize dependencies
      treeshake: {
        moduleSideEffects: true,
      },
    },
  },
}));
