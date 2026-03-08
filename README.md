# ElixIRCd Documentation Site

Static documentation site for [ElixIRCd](https://github.com/faelgabriel/elixircd), built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Stack

- **Framework:** [Astro 5](https://astro.build) — static site generator
- **Theme:** [@astrojs/starlight 0.34](https://starlight.astro.build) — documentation theme
- **Search:** [Pagefind](https://pagefind.app) — built-in full-text search (no backend)
- **Output:** Static HTML — no server required, deploy anywhere

## Features

- Dark mode (automatic + toggle)
- Full-text search via Pagefind
- Sidebar navigation with 11 sections
- Breadcrumbs, prev/next page links
- Table of contents per page
- Responsive mobile layout
- IRCv3 + Elixir code highlighting
- Edit on GitHub links

## Development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:4321
npm run dev

# Type-check
npm run check
```

## Building

```bash
# Build static output to ./dist/
npm run build

# Preview the built site locally
npm run preview
```

The built output in `dist/` is pure static HTML/CSS/JS — serve it with any static host or CDN.

## Project Structure

```
docs-site/
├── src/
│   ├── assets/           # Logo SVGs
│   ├── content/
│   │   └── docs/         # All .mdx documentation pages
│   │       ├── admin/
│   │       ├── commands/
│   │       ├── configuration/
│   │       ├── core-concepts/
│   │       ├── getting-started/
│   │       ├── modes/
│   │       ├── protocol/
│   │       ├── reference/
│   │       ├── security/
│   │       └── services/
│   ├── content.config.ts # Content collection schema
│   └── styles/
│       └── custom.css    # Custom styles and variables
├── astro.config.mjs      # Astro + Starlight configuration
├── package.json
└── tsconfig.json
```

## Documentation Sections

| Section | Pages | Description |
|---------|-------|-------------|
| Getting Started | 5 | Quick start, installation, config, TLS, clients |
| Core Concepts | 6 | Architecture, users, channels, operators, accounts, permissions |
| Commands | 8 | All IRC commands by category |
| Modes | 5 | User modes, channel modes, list modes |
| IRC Services | 3 | NickServ and ChanServ reference |
| Configuration | 10 | All config options with examples |
| Security | 4 | Bans, rate limiting, cloaking, operators |
| Protocol | 4 | IRCv3 capabilities, SASL, WebSocket, clients |
| Administration | 3 | Oper guide, server management, monitoring |
| Reference | 4 | FAQ, troubleshooting, glossary, feature inventory |

## Deployment

### Static hosting (Netlify, Vercel, GitHub Pages, S3, etc.)

Build command: `npm run build`
Publish directory: `dist`

### nginx

```nginx
server {
    listen 80;
    server_name docs.example.com;
    root /var/www/elixircd-docs/dist;
    index index.html;
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
}
```

### Docker

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
```

## Contributing

Documentation pages are in `src/content/docs/`. Each page is an MDX file with a YAML frontmatter block:

```mdx
---
title: Page Title
description: Short description for SEO and sidebar tooltips.
sidebar:
  order: 1
---

# Content here
```

All documentation is derived from the ElixIRCd source code. When adding or updating pages, verify against the actual implementation in `/lib/elixircd/`.
