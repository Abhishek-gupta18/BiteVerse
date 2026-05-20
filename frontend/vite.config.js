import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'node:os'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: path.join(os.tmpdir(), 'biteverse-vite-cache'),
  resolve: {
    alias: {
      cookie: path.resolve(__dirname, 'src/shims/cookie.js'),
      'set-cookie-parser': path.resolve(__dirname, 'src/shims/set-cookie-parser.js'),
    },
  },
  plugins: [react()],
})
