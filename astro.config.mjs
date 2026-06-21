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
    // A dark slate code surface (Engineer's neutral-950) reads as an
    // intentional accent against the light page; JetBrains Mono + Inter UI.
    expressiveCode({
      themes: ['github-dark-default'],
      styleOverrides: {
        borderRadius: '8px',
        borderWidth: '1px',
        borderColor: '#1e293b',
        codeBackground: '#0f172a',
        codeFontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
        uiFontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        codeFontSize: '0.84rem',
        frames: {
          editorTabBarBackground: '#0b1220',
          terminalTitlebarBackground: '#0b1220',
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
});
