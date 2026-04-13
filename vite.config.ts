/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/components/ui/',
        '*.config.*',
        'src/main.tsx',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      }
    }
  },
  server: {
    proxy: {
      '/api/news': {
        target: 'https://api.thenewsapi.com/v1',
        changeOrigin: true,
        rewrite: (path) => {
          const [, search] = path.split('?')
          const params = new URLSearchParams(search)
          const type = params.get('type') || 'top'
          const endpoint = type === 'search' ? '/news/all' : '/news/top'
          params.delete('type')
          params.set('api_token', env.NEWS_API_TOKEN)
          return endpoint + '?' + params.toString()
        },
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  }
})
