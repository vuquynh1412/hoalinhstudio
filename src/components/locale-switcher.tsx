import { localeLabels, locales, type Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  currentLocale: Locale;
};

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  return (
    <nav aria-label="Language" className="flex items-center gap-1">
      {locales.map((locale) => (
        <Link
          aria-current={locale === currentLocale ? "page" : undefined}
          className={cn(
            "focus-ring rounded-md px-3 py-2 text-sm font-semibold transition",
            locale === currentLocale
              ? "bg-primary text-primary-foreground"
              : "text-foreground/70 hover:bg-muted hover:text-foreground",
          )}
          href="/"
          key={locale}
          locale={locale}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </nav>
  );
}
