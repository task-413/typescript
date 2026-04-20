import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: [...(configDefaults.coverage?.exclude ?? []), 'src/test/**'],
    },
  },
})