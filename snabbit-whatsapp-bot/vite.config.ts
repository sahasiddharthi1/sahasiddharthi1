import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [(await import('@tailwindcss/postcss')).default],
  build: { target: 'es2022' },
})
