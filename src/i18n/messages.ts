import type { Locale } from "@/i18n/config";

import en from "../../messages/en.json";
import vi from "../../messages/vi.json";

export type AppMessages = typeof vi;

export const messages: Record<Locale, AppMessages> = {
  vi,
  en,
};
