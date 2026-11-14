# Universal Links

Modern link management infrastructure: short links, QR codes, analytics, and branded domains for teams and individuals.

## Features

- Short links with custom domains, QR codes, and deep links
- Click analytics (geolocation, device, browser, referrer)
- Workspaces with granular roles and permissions
- REST API, webhooks, OAuth apps, and MCP support
- Stripe and HubSpot integrations

## Install

- Web app: `pnpm install && pnpm build` in the monorepo (Next.js app in `apps/web`), needs a Postgres database and Redis
- CLI: `pnpm build` in `packages/cli`
- Configuration is environment-based (see `.env.example` in `apps/web`)

## Contact

Telegram: [@johnconstantine570](https://t.me/johnconstantine570)
