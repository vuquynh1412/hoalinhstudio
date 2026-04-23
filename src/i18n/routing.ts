import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale: "vi",
  localePrefix: "always",
  locales: ["vi", "en"],
});
