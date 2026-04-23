import { Instrument_Serif, Montserrat } from "next/font/google";
import Image from "next/image";
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

const montserrat = Montserrat({
  subsets: ["latin"],
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

export async function HomePage({ locale }: HomePageProps) {
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
                  className="focus-ring inline-flex min-w-20 items-center justify-center rounded-full px-4 py-3 transition hover:bg-white/20"
                  href="#about"
                >
                  Giới thiệu
                </a>
                <a
                  className="focus-ring inline-flex min-w-20 items-center justify-center rounded-full px-4 py-3 transition hover:bg-white/20"
                  href="#works"
                >
                  Dự án
                </a>
                <a
                  className="focus-ring inline-flex min-w-20 items-center justify-center rounded-full px-4 py-3 transition hover:bg-white/20"
                  href="#services"
                >
                  Dịch vụ
                </a>
                <a
                  className="focus-ring inline-flex min-w-20 items-center justify-center rounded-full px-4 py-3 transition hover:bg-white/20"
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
                  className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-full bg-[#18181B] px-5 py-3 text-[16px] font-[500] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition hover:bg-black"
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

              <p className="mt-1 max-w-[800px] text-balance text-[14px] font-[400] text-white/60 drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)] sm:text-[18px]">
                Dịch vụ video viral dành cho Influencer, Creator và Doanh nghiệp
              </p>

              <a
                className="focus-ring mt-4 inline-flex min-h-15 items-center gap-3 rounded-full bg-white px-4 py-3 text-[#141414] shadow-[0_12px_30px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5"
                href="#works"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#141414] text-white">
                  <ArrowRight size={18} strokeWidth={2.2} />
                </span>
                <span className="whitespace-nowrap pr-3 text-[15px] font-[500] text-[#141414]">
                  Xem workreel
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white text-[#171717]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-10">
          <p className="text-[13px] font-[700] text-black/50">CHÀO MỪNG ĐẾN</p>
          <Image
            alt="Hoa Linh Studio"
            className="mt-4 h-20 w-auto object-contain"
            height={80}
            src="/logo-hoa-linh-full.svg"
            width={320}
          />
          <p className="mt-10 max-w-[760px] text-[15px] font-[500] uppercase text-black/45">
            HOA LINH STUDIO không chỉ là nơi sản xuất video, mà là không gian
            nơi ý tưởng được nuôi dưỡng và chuyển hóa thành hình ảnh sống động.
          </p>
          <div className="mt-12 h-px w-16 bg-primary/70" />
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
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 text-[15px] font-[500] text-black transition hover:bg-primary/10"
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
            <h2 className="max-w-[980px] text-[40px] font-[700] uppercase text-[#27272a] sm:text-[54px] lg:text-[70px]">
              Biến tầm nhìn
              <br />
              thành thước phim đắt giá
            </h2>
            <p className="mt-4 max-w-[680px] text-[16px] text-black/55">
              Một quy trình sản xuất trọn gói, nơi mỗi chi tiết đều phục vụ cho
              giá trị thương hiệu.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-[16px] font-[600] text-primary-foreground transition hover:brightness-95"
              href="mailto:hello@hoalinh.vn"
            >
              <span>Liên hệ ngay</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

          <footer className="mt-20 border-t border-black/10 pt-12">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
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
                <FooterContact icon={<Phone size={18} />} text="0123456789" />
                <FooterContact icon={<Mail size={18} />} text="abc@gmail.com" />
                <FooterContact
                  icon={<MapPin size={18} />}
                  text="123 abc, bcd, Hồ Chí Minh"
                />
                <div className="flex gap-2">
                  <input
                    className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 py-3 text-[14px] text-black placeholder:text-black/40"
                    placeholder="Nhập email để nhận tư vấn"
                    type="email"
                  />
                  <button
                    className="rounded-full bg-primary px-5 py-3 text-[14px] font-[600] text-primary-foreground"
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
    <a
      className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-[15px] font-[500] text-black transition hover:border-black/40"
      href={href}
    >
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
          <li key={item}>{item}</li>
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
    <div className="flex items-center gap-2 text-[14px] text-black/55">
      <span className="text-black/70">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function SocialPill({ icon }: { icon: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/70 shadow-[0_12px_24px_rgba(0,0,0,0.04)]">
      {icon}
    </span>
  );
}
