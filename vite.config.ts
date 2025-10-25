import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// Fix for `process.cwd()` type error by explicitly importing `cwd` from `node:process`.
import { cwd } from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), '');
  return {
    plugins: [react()],
    base: "/kids-learning-hub/", // Set this to your repository name
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    }
  }
})
