const fallbackSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Hoa Linh",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || fallbackSiteUrl,
  contactEmail: "hello@hoalinh.vn",
} as const;
