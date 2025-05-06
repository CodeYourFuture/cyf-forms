import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build' // CRA's default build output
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules/*', 'e2e/*'],
    setupFiles: './src/setupTests.js'
  }
})
