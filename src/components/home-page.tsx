"use client";

import { Instrument_Serif, Montserrat } from "next/font/google";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  CirclePlay,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import {
  featuredProjectImages,
  focusServices,
  insightCards,
} from "@/content/landing-content";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type HomePageProps = {
  locale: Locale;
};

const aboutRevealText =
  "Hoa Linh Studio làm việc với khách hàng dựa trên sự rõ ràng và tôn trọng cam kết. Mỗi dự án đều được trao đổi minh bạch ngay từ đầu, phản hồi kịp thời trong quá trình thực hiện và luôn đảm bảo chất lượng ở từng giai đoạn.";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["italic"],
  weight: "400",
});

const featuredInsight = {
  description:
    "Sau giai đoạn tăng trưởng nóng, thị trường sáng tạo đang bước vào quãng tái định nghĩa giá trị. Với thương hiệu, video không còn là lớp trang trí bề mặt mà trở thành công cụ kể chuyện, thuyết phục và định vị ở một độ sâu khó thay thế.",
  image:
    "https://www.figma.com/api/mcp/asset/6176c7a0-6a85-44a7-9899-51cfd29867df",
  title: "Tại sao video là vũ khí chiến lược của thương hiệu trong thời đại số",
} as const;

export function HomePage({ locale }: HomePageProps) {
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const aboutParagraphRef = useRef<HTMLParagraphElement | null>(null);
  const aboutWordRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = aboutSectionRef.current;
    const paragraph = aboutParagraphRef.current;

    if (!section || !paragraph) {
      return;
    }

    const wordNodes = aboutWordRefs.current.filter(
      (word): word is HTMLSpanElement => word !== null,
    );

    if (wordNodes.length === 0) {
      return;
    }

    let frameId = 0;

    const updateWords = () => {
      const rect = paragraph.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.82;
      const end = viewportHeight * 0.42;
      const totalTravel = rect.height + (start - end);
      const rawProgress = Math.min(
        Math.max((start - rect.top) / Math.max(totalTravel, 1), 0),
        1,
      );
      const progress = Math.min(rawProgress * 1.08, 1);

      wordNodes.forEach((word, index) => {
        const startAt = index / wordNodes.length;
        const endAt = Math.min(startAt + 0.16, 1);
        const opacity = Math.min(
          Math.max(
            (progress - startAt) / Math.max(endAt - startAt, 0.001),
            0.16,
          ),
          1,
        );

        word.style.setProperty("--word-opacity", opacity.toFixed(3));
      });
    };

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateWords();
        frameId = 0;
      });
    };

    updateWords();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main
      className={cn(
        "overflow-x-hidden bg-white font-montserrat",
        montserrat.variable,
        instrumentSerif.variable,
      )}
    >
      <section className="hero-screen relative isolate flex overflow-hidden bg-black text-white">
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none"
          loop
          muted
          playsInline
          src="/videos/logoisum-hero.mp4"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[32vh] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#FFF_100%)]"
        />

        <div className="hero-screen relative z-20 flex w-full flex-col px-4 py-4">
          <header className="relative z-30 mx-auto w-full max-w-[1440px]">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <nav
                aria-label="Primary"
                className="hidden items-center justify-start gap-1 text-[16px] font-[500] text-black lg:flex"
              >
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-white/88 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/46 hover:bg-white/[0.06] hover:text-white"
                  href="#about"
                >
                  Giới thiệu
                </a>
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-white/88 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/46 hover:bg-white/[0.06] hover:text-white"
                  href="#works"
                >
                  Dự án
                </a>
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-white/88 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/46 hover:bg-white/[0.06] hover:text-white"
                  href="#services"
                >
                  Dịch vụ
                </a>
                <a
                  className="hero-ghost-pill focus-ring inline-flex min-w-20 items-center justify-center rounded-full border border-transparent bg-transparent px-4 py-3 text-[16px] font-[500] text-white/88 transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-white/46 hover:bg-white/[0.06] hover:text-white"
                  href="#insights"
                >
                  Thư viện
                </a>
              </nav>

              <Link
                aria-label="Hoa Linh Studio home"
                className="mx-auto rounded-md"
                href="/"
                locale={locale}
              >
                <Image
                  alt="Hoa Linh Studio logo"
                  className="h-11 w-auto object-contain"
                  height={44}
                  priority
                  src="/logo-hoa-linh-full.svg"
                  width={149}
                />
              </Link>

              <div className="flex items-center justify-end">
                <a
                  className="radiant-outline-pill radiant-outline-pill--light focus-ring px-5 py-3 text-[16px]"
                  href="#contact"
                >
                  <span className="whitespace-nowrap">
                    Đặt lịch tư vấn miễn phí
                  </span>
                  <ArrowUpRight size={20} strokeWidth={2} />
                </a>
              </div>
            </div>
          </header>

          <div className="flex flex-1 items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center text-center">
              <h1 className="max-w-[1200px] text-balance">
                <span className="block text-[38px] font-[700] text-white drop-shadow-[0_14px_36px_rgba(0,0,0,0.28)] sm:text-[32px] lg:text-[38px]">
                  Nơi câu chuyện được kể bằng
                </span>
                <span className="font-instrument-serif block text-[130px] italic text-white drop-shadow-[0_16px_42px_rgba(0,0,0,0.32)] sm:text-[40px] lg:text-[130px]">
                  videos &amp; reels
                </span>
              </h1>

              <p className="mt-1 max-w-[800px] text-balance text-[14px] font-[500] text-white/80 drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:text-[16px]">
                Dịch vụ video viral dành cho Influencer, Creator và Doanh nghiệp
              </p>

              <a
                className="radiant-outline-pill radiant-outline-pill--light focus-ring mt-4 px-6 py-3 text-[15px]"
                href="#works"
              >
                <span className="whitespace-nowrap">Xem Dự án</span>
                <ArrowRight size={20} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative flex min-h-screen items-center justify-center bg-white text-[#27272a]"
        id="about"
        ref={aboutSectionRef}
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 py-25 sm:px-6 lg:px-10">
          <p
            className="mx-auto max-w-[1200px] text-center text-[14px] font-[700] leading-[1.32] tracking-[-0.04em] text-[#27272a] sm:text-[18px] md:text-[24px] lg:text-[31px] xl:text-[36px]"
            ref={aboutParagraphRef}
          >
            {aboutRevealText.split(" ").map((word, index) => (
              <span
                className="scroll-reveal-word"
                key={`${word}-${index}`}
                ref={(node) => {
                  aboutWordRefs.current[index] = node;
                }}
                style={
                  {
                    "--word-opacity": 0,
                  } as CSSProperties
                }
              >
                <span className="scroll-reveal-word__shadow">{word}</span>
                <span className="scroll-reveal-word__fill">{word}</span>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section id="services" className="bg-white text-[#171717]">
        <div className="mx-auto max-w-[1320px] px-4 pb-24 sm:px-6 lg:px-10">
          <SectionTitle title="Dịch vụ trọng tâm" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {focusServices.map((service) => (
              <article
                className="group overflow-hidden rounded-[24px] bg-white shadow-[0_16px_60px_rgba(0,0,0,0.06)]"
                key={service.title}
              >
                <div className="relative aspect-[1.35] overflow-hidden">
                  <Image
                    alt={service.title}
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    src={service.image}
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-5">
                  <h3 className="text-[18px] font-[600] text-[#171717]">
                    {service.title}
                  </h3>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-[#171717]">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="bg-white text-[#171717]">
        <div className="mx-auto max-w-[1440px] px-0 pb-24">
          <SectionTitle title="Dự án nổi bật" />
          <div className="mt-10 grid grid-cols-2 gap-px bg-black/10 md:grid-cols-4 lg:grid-cols-6">
            {featuredProjectImages.map((image, index) => (
              <div
                className={cn(
                  "relative overflow-hidden bg-white",
                  index === 0 && "md:col-span-2 md:row-span-2",
                )}
                key={image}
              >
                <div
                  className={cn(
                    "relative aspect-square",
                    index === 0 && "md:aspect-[2/2]",
                  )}
                >
                  <Image
                    alt={`Featured project ${index + 1}`}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    src={image}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <OutlinePillButton href="#contact" label="Xem thêm" />
          </div>
        </div>
      </section>

      <section id="insights" className="bg-white text-[#171717]">
        <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10">
          <SectionTitle title="Thư viện" />
          <div className="mt-10 flex flex-col gap-6">
            <article className="relative overflow-hidden rounded-[24px]">
              <div className="relative aspect-[16/9] w-full md:aspect-[16/7]">
                <Image
                  alt={featuredInsight.title}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  src={featuredInsight.image}
                />
              </div>
              <div className="left-6 top-6 max-w-[420px] rounded-[20px] bg-white/85 p-6 backdrop-blur md:absolute">
                <h3 className="text-[26px] font-[700] text-black">
                  {featuredInsight.title}
                </h3>
                <p className="mt-4 text-[15px] text-black/55">
                  {featuredInsight.description}
                </p>
                <a
                  className="radiant-outline-pill mt-6 px-5 py-3 text-[15px]"
                  href="#contact"
                >
                  <span>Xem thêm</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </article>

            <div className="grid gap-4 lg:grid-cols-4">
              {insightCards.map((card) => (
                <article className="flex flex-col gap-3" key={card.title}>
                  <div className="relative aspect-[1.58] overflow-hidden rounded-[16px]">
                    <Image
                      alt={card.title}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      src={card.image}
                    />
                  </div>
                  <h3 className="text-[18px] font-[700] text-black">
                    {card.title}
                  </h3>
                </article>
              ))}
            </div>

            <div className="flex justify-center pt-2">
              <OutlinePillButton href="#contact" label="Xem thêm" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white text-[#171717]">
        <div className="mx-auto max-w-[1320px] px-4 py-24 sm:px-6 lg:px-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="max-w-[980px] text-[32px] font-[700] uppercase text-[#27272a] sm:text-[54px] lg:text-[54px]">
              Biến tầm nhìn
              <br />
              thành thước phim đắt giá
            </h2>
            <p className="mt-4 max-w-[680px] text-[16px] text-black/55">
              Một quy trình sản xuất trọn gói, nơi mỗi chi tiết đều phục vụ cho
              giá trị thương hiệu.
            </p>
            <a
              className="radiant-outline-pill mt-8 px-6 py-4 text-[16px] font-[600]"
              href="mailto:hello@hoalinh.vn"
            >
              <span>Liên hệ ngay</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          <footer className="mt-20 border-t border-black/10 pt-12">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.8fr_1.45fr] lg:items-start">
              <div className="flex flex-col items-start gap-5">
                <Image
                  alt="Hoa Linh Studio"
                  className="h-[70px] w-auto object-contain"
                  height={70}
                  src="/logo-hoa-linh-full.svg"
                  width={320}
                />
                <div className="flex items-center gap-2 text-black/60">
                  <SocialPill icon={<MessageCircle size={18} />} />
                  <SocialPill icon={<Camera size={18} />} />
                  <SocialPill icon={<CirclePlay size={18} />} />
                  <SocialPill icon={<Mail size={18} />} />
                  <SocialPill icon={<Phone size={18} />} />
                </div>
              </div>

              <FooterColumn
                items={[
                  "Giới thiệu",
                  "Dự án",
                  "Blog",
                  "Liên hệ",
                  "Báo giá",
                  "Chính sách bảo mật",
                ]}
                title="Thông tin chung"
              />
              <FooterColumn
                items={[
                  "Sản xuất phim",
                  "Viết kịch bản",
                  "Hậu kỳ & kỹ thuật số",
                  "Khoá học",
                  "Coaching",
                ]}
                title="Dịch vụ"
              />

              <div className="space-y-5">
                <FooterHeading>Liên hệ</FooterHeading>
                <div className="space-y-3">
                  <FooterContact icon={<Phone size={18} />} text="0123456789" />
                  <FooterContact icon={<Mail size={18} />} text="abc@gmail.com" />
                  <FooterContact
                    icon={<MapPin size={18} />}
                    text="123 abc, bcd, Hồ Chí Minh"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 py-3 text-[14px] text-black placeholder:text-black/40 transition-colors duration-200 ease-in-out focus:border-[#111111] focus:outline-none"
                    placeholder="Nhập email để nhận tư vấn"
                    type="email"
                  />
                  <button
                    className="footer-fill-button inline-flex min-h-14 items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-[14px] font-[600] text-white transition-colors duration-200 ease-in-out hover:bg-black focus:outline-none"
                    type="button"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-center text-[34px] font-[700] text-[#171717] sm:text-[40px]">
      {title}
    </h2>
  );
}

function OutlinePillButton({ href, label }: { href: string; label: string }) {
  return (
    <a className="radiant-outline-pill px-5 py-3 text-[15px]" href={href}>
      <span>{label}</span>
      <ArrowUpRight size={18} />
    </a>
  );
}

function FooterColumn({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-4 space-y-2 text-[14px] text-black/55">
        {items.map((item) => (
          <li key={item}>
            <a className="footer-text-link" href="#contact">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-[16px] font-[700] text-[#171717]">{children}</p>;
}

function FooterContact({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <a
      className="footer-text-link footer-contact-row items-center gap-3 text-[14px]"
      href="#contact"
    >
      <span className="text-black/70">{icon}</span>
      <span>{text}</span>
    </a>
  );
}

function SocialPill({ icon }: { icon: React.ReactNode }) {
  return (
    <span className="footer-social-pill flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/70 shadow-[0_12px_24px_rgba(0,0,0,0.04)]">
      {icon}
    </span>
  );
}
