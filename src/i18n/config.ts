import { routing } from "@/i18n/routing";

export const locales = routing.locales;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = routing.defaultLocale;

export const localeLabels: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const localeToOpenGraphLocale: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
