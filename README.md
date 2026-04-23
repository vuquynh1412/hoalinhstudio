# Hoa Linh Landing Page

Next.js landing page scaffold for Hoa Linh with multilingual routing and SEO-ready metadata.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- next-intl for `vi` and `en`
- Static metadata, sitemap, robots, canonical URLs, and language alternates

## Structure

```txt
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
    globals.css
    robots.ts
    sitemap.ts
  components/
    home-page.tsx
    locale-switcher.tsx
  i18n/
    config.ts
    messages.ts
    navigation.ts
    request.ts
    routing.ts
  lib/
    seo.ts
    site.ts
    utils.ts
messages/
  en.json
  vi.json
```

## Development

```bash
npm install
npm run dev
```

Set the production domain before deploy:

```bash
NEXT_PUBLIC_SITE_URL=https://hoalinh.vn
```
