import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.apipemacenter.com.br',
  output: 'static',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
