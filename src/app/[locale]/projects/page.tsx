import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

import { featuredProjectImages } from "@/content/landing-content";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

const projectTitles = [
  "Studio portrait production",
  "Commercial lighting setup",
  "Livestream control room",
  "Editorial camera direction",
  "Creative desk workflow",
  "Minimal set architecture",
] as const;

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col px-4 py-16 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-[13px] font-[600] uppercase tracking-[0.22em] text-black/40">
              Hoa Linh Studio
            </p>
            <h1 className="mt-3 text-[36px] font-[700] tracking-[-0.05em] sm:text-[54px]">
              Danh sách dự án
            </h1>
          </div>
          <Link
            className="radiant-outline-pill px-5 py-3 text-[15px]"
            href="/"
            locale={locale as Locale}
          >
            <span>Quay lại trang chủ</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjectImages.map((image, index) => (
            <article className="flex flex-col gap-3" key={`${image}-${index}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#f3f3ef]">
                <Image
                  alt={projectTitles[index] ?? `Project ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                  src={image}
                />
              </div>
              <h2 className="text-[22px] font-[700] tracking-[-0.04em]">
                {projectTitles[index] ?? `Project ${index + 1}`}
              </h2>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
