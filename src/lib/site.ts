const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return null;
  }

  const trimmedValue = value.replace(/\/+$/, "");

  if (trimmedValue.startsWith("http://") || trimmedValue.startsWith("https://")) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

export const siteConfig = {
  name: "Hoa Linh Studio",
  url:
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
    normalizeSiteUrl(process.env.VERCEL_URL) ||
    fallbackSiteUrl,
  contactEmail: "hello@hoalinh.vn",
} as const;
