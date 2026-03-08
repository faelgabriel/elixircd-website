import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'ElixIRCd',
      description: 'Documentation for ElixIRCd — a modern IRC server written in Elixir',
      logo: {
        light: './src/assets/elixircd-light.svg',
        dark: './src/assets/elixircd-dark.svg',
        replacesTitle: false,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/faelgabriel/elixircd' },
      ],
      editLink: {
        baseUrl: 'https://github.com/faelgabriel/elixircd/edit/main/docs-site/',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Introduction', link: '/' },
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Core Concepts',
          autogenerate: { directory: 'core-concepts' },
        },
        {
          label: 'Commands',
          autogenerate: { directory: 'commands' },
        },
        {
          label: 'Modes',
          autogenerate: { directory: 'modes' },
        },
        {
          label: 'IRC Services',
          autogenerate: { directory: 'services' },
        },
        {
          label: 'Configuration Reference',
          autogenerate: { directory: 'configuration' },
        },
        {
          label: 'Security & Moderation',
          autogenerate: { directory: 'security' },
        },
        {
          label: 'Protocol & Compatibility',
          autogenerate: { directory: 'protocol' },
        },
        {
          label: 'Administration',
          autogenerate: { directory: 'admin' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
