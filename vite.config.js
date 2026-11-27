import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works from any folder on the server
  // (e.g. https://tdcatalog.com/design/construction-uk/).
  base: './',
  build: {
    // One HTML file per page – plain .html files work on the FTP host without server rewrites
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
      },
    },
  },
})
