# ElixIRCd Website

Official website for [ElixIRCd](https://github.com/faelgabriel/elixircd), including documentation, guides, and project information.

https://www.elixircd.org

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
bun install        # Install dependencies
bun run dev        # Start dev server at http://localhost:4321
bun run check      # Type-check .astro and .mdx files
bun run build      # Build static output to ./dist/
bun run preview    # Preview the built site locally
```

## Project Structure

```
.
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

The included `Dockerfile` uses a multi-stage build: Bun builds the static site, then nginx serves it.

```bash
docker build -t elixircd-website .
docker run -d -p 80:80 --name elixircd-website elixircd-website
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

All documentation is derived from the ElixIRCd source code. When adding or updating pages, verify against the actual implementation in the [ElixIRCd repository](https://github.com/faelgabriel/elixircd).
