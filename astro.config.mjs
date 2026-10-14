// Astro configuration.
// If you publish from a repository called <username>.github.io, keep base: '/'.
// If you publish from any other repository name (e.g. "portfolio"), set
// base: '/portfolio/' and site: 'https://<username>.github.io'.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkGaps from './src/lib/remark-gaps.mjs';

// Content markers are highlighted in `npm run dev` and removed from builds.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: 'https://dtriveni.github.io',
  base: '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [[remarkGaps, { strip: !isDev }]],
  },
});
