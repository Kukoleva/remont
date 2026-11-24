// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // ОБЯЗАТЕЛЬНО для генерации sitemap и абсолютных URL
  site: 'https://vdomeremont.by',

  // Только SSG (статическая генерация), без SSR
  output: 'static',

  // ЧПУ: каждая страница — собственная директория (/remont-kvartir/index.html)
  build: {
    format: 'directory',
  },

  // Единый стиль URL: всегда с завершающим слешем
  trailingSlash: 'always',

  // Сжатие итогового HTML
  compressHTML: true,

  integrations: [
    react(),
    sitemap({
      // Кастомный фильтр можно добавить при необходимости
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});