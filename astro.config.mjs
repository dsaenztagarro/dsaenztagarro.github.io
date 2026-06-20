// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

// User pages repo: served at the domain root, so no `base` is set.
export default defineConfig({
  site: 'https://dsaenztagarro.github.io',
  // Preserve old Jekyll RSS subscribers pointed at /feed.xml.
  redirects: {
    '/feed.xml': '/rss.xml',
  },
  integrations: [
    // Expressive Code must run before MDX so fenced code blocks are themed.
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: { borderRadius: '0.5rem' },
    }),
    mdx(),
    sitemap(),
  ],
});
