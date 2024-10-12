import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      strict: false
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/to-do-list' : ''  // Asegúrate de que este sea el nombre correcto de tu repositorio
    },
    alias: {
      $views: path.resolve('src/infra/view')
    }
  }
};

export default config;
