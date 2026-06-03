"use client";

import Image from "next/image";
import { CirclePlay, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { featuredProjectImages } from "@/content/landing-content";
import { Link } from "@/i18n/navigation";
import {
  createQuickSetter,
  ensureMotionRuntime,
  gsap,
  lerp,
  prefersReducedMotion,
  scheduleScrollRefresh,
  ScrollTrigger,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type FeaturedProjectSize = "large" | "medium" | "small";

type FeaturedProjectCard = {
  cardClassName?: string;
  id: string;
  image: (typeof featuredProjectImages)[number];
  size: FeaturedProjectSize;
  youtubeEmbedUrl: string;
  wrapperClassName: string;
};

type FeaturedProjectRow = {
  cards: FeaturedProjectCard[];
  className?: string;
  id: string;
};

type FeaturedProjectCardDefinition = Omit<
  FeaturedProjectCard,
  "youtubeEmbedUrl"
>;

type FeaturedProjectRowDefinition = Omit<FeaturedProjectRow, "cards"> & {
  cards: FeaturedProjectCardDefinition[];
};

const mouseAmplitude: Record<FeaturedProjectSize, number> = {
  large: 60,
  medium: 30,
  small: 20,
};

const revealStartOffsets = [18, 42, 28, 50, 12] as const;
const revealEndOffsets = [3, 1, 5, 2, 4] as const;

const sampleYoutubeEmbedUrls = [
  "https://www.youtube.com/embed/M7lc1UVf-VE?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/ScMzIvxBSi4?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/jNQXAC9IVRw?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/kJQP7kiw5Fk?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/3JZ_D3ELwOQ?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/09R8_2nJtjg?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/OPf0YbXqDm0?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/fLexgOxsZu0?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/hT_nvWreIhg?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/RgKAFK5djSk?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/60ItHLz5WEA?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/CevxZvSJLk8?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/YQHsXMglC9A?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/uelHwf8o7_U?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/PT2_F-1esPk?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/pRpeEdMmmQ0?rel=0&modestbranding=1",
  "https://www.youtube.com/embed/e-ORhEE9VVg?rel=0&modestbranding=1",
] as const;

function getFeaturedProjectImage(index: number) {
  return featuredProjectImages[index % featuredProjectImages.length];
}

function getFeaturedProjectVideo(index: number) {
  return sampleYoutubeEmbedUrls[index % sampleYoutubeEmbedUrls.length];
}

const featuredProjectRowDefinitions: FeaturedProjectRowDefinition[] = [
  {
    id: "opening",
    cards: [
      {
        id: "loller-scale",
        image: featuredProjectImages[0],
        size: "large",
        wrapperClassName:
          "w-[88%] self-start xl:w-auto xl:self-auto xl:col-span-3",
      },
      {
        cardClassName: "xl:translate-y-1/2",
        id: "studio-corner",
        image: featuredProjectImages[3],
        size: "small",
        wrapperClassName:
          "flex w-[46%] self-end xl:w-auto xl:self-auto xl:col-span-1 xl:items-end",
      },
      {
        cardClassName: "opacity-40",
        id: "white-volume",
        image: featuredProjectImages[4],
        size: "medium",
        wrapperClassName:
          "flex w-[64%] self-center xl:w-auto xl:self-auto xl:col-start-6 xl:col-end-8 xl:items-center",
      },
      {
        cardClassName: "xl:-translate-y-1/2",
        id: "soft-interior",
        image: featuredProjectImages[1],
        size: "medium",
        wrapperClassName:
          "mt-2 w-[72%] self-end xl:w-auto xl:self-auto xl:col-start-9 xl:col-end-11 xl:mt-0",
      },
      {
        cardClassName: "opacity-20 xl:-translate-y-1/2",
        id: "pale-block",
        image: featuredProjectImages[5],
        size: "small",
        wrapperClassName:
          "mt-2 flex w-[38%] self-start xl:w-auto xl:self-auto xl:col-start-12 xl:col-end-13 xl:mt-0 xl:items-center",
      },
    ],
  },
  {
    id: "middle",
    cards: [
      {
        cardClassName: "xl:-translate-y-1/4",
        id: "production-floor",
        image: featuredProjectImages[2],
        size: "medium",
        wrapperClassName:
          "flex w-[92%] self-start xl:w-auto xl:self-auto xl:col-span-2 xl:items-center",
      },
      {
        cardClassName: "opacity-20 xl:translate-y-1/2",
        id: "portrait-rig",
        image: featuredProjectImages[0],
        size: "small",
        wrapperClassName:
          "flex w-[42%] self-end xl:w-auto xl:self-auto xl:col-start-3 xl:col-end-4 xl:items-end",
      },
      {
        id: "edit-suite",
        image: featuredProjectImages[4],
        size: "medium",
        wrapperClassName:
          "flex w-[66%] self-center xl:w-auto xl:self-auto xl:col-start-5 xl:col-end-7 xl:items-center",
      },
      {
        cardClassName: "opacity-20 xl:-translate-y-1/2",
        id: "quiet-square",
        image: featuredProjectImages[3],
        size: "small",
        wrapperClassName: "hidden xl:col-start-8 xl:col-end-9 xl:block",
      },
      {
        id: "large-archive",
        image: featuredProjectImages[5],
        size: "large",
        wrapperClassName:
          "hidden xl:col-start-10 xl:col-end-13 xl:flex xl:items-center xl:pb-64",
      },
    ],
  },
  {
    className: "pt-24 pb-28 md:pt-32 md:pb-36 xl:py-0",
    id: "deep",
    cards: [
      {
        id: "sunlit-set",
        image: featuredProjectImages[1],
        size: "large",
        wrapperClassName:
          "order-last w-[86%] self-start xl:w-auto xl:self-auto xl:col-span-3 xl:order-none",
      },
      {
        cardClassName: "opacity-20 xl:translate-y-1/2",
        id: "small-sky",
        image: featuredProjectImages[2],
        size: "small",
        wrapperClassName:
          "flex w-[40%] self-end xl:w-auto xl:self-auto xl:items-end",
      },
      {
        cardClassName: "xl:translate-y-0",
        id: "medium-water",
        image: featuredProjectImages[3],
        size: "medium",
        wrapperClassName:
          "flex w-[70%] self-center xl:w-auto xl:self-auto xl:col-start-9 xl:col-end-11 xl:items-center",
      },
      {
        cardClassName: "opacity-20",
        id: "barely-there",
        image: featuredProjectImages[5],
        size: "small",
        wrapperClassName: "hidden xl:col-start-12 xl:col-end-13 xl:block",
      },
    ],
  },
  {
    className: "max-xl:hidden",
    id: "tail",
    cards: [
      {
        id: "closing-frame",
        image: getFeaturedProjectImage(14),
        size: "medium",
        wrapperClassName: "col-span-2 flex items-end",
      },
      {
        cardClassName: "opacity-20 xl:translate-y-1/2",
        id: "tail-small",
        image: getFeaturedProjectImage(15),
        size: "small",
        wrapperClassName: "col-start-3 col-end-4 flex items-end",
      },
      {
        id: "tail-medium",
        image: getFeaturedProjectImage(16),
        size: "medium",
        wrapperClassName: "col-start-5 col-end-7 flex items-center",
      },
      {
        id: "tail-dot",
        image: getFeaturedProjectImage(17),
        size: "small",
        wrapperClassName: "col-start-8 col-end-9",
      },
      {
        id: "tail-large",
        image: getFeaturedProjectImage(18),
        size: "large",
        wrapperClassName: "col-start-10 col-end-13 flex items-center pb-64",
      },
    ],
  },
];

const featuredProjectRows: FeaturedProjectRow[] = featuredProjectRowDefinitions.map(
  (row, rowIndex) => {
    const cardOffset = featuredProjectRowDefinitions
      .slice(0, rowIndex)
      .reduce((total, currentRow) => total + currentRow.cards.length, 0);

    return {
      ...row,
      cards: row.cards.map((card, index) => ({
        ...card,
        youtubeEmbedUrl: getFeaturedProjectVideo(cardOffset + index),
      })),
    };
  },
);

const featuredProjectCards = featuredProjectRows.flatMap((row) => row.cards);

function getTitleScale() {
  if (window.innerWidth < 768) {
    return 0.72;
  }

  if (window.innerWidth < 1280) {
    return 0.78;
  }

  return 0.6;
}

export function FeaturedProjectsSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const titleLayerRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] =
    useState<FeaturedProjectCard | null>(null);

  const activeProjectIndex = activeProject
    ? featuredProjectCards.findIndex((card) => card.id === activeProject.id)
    : -1;
  const activeProjectLabel =
    activeProjectIndex >= 0
      ? `Dự án nổi bật ${activeProjectIndex + 1}`
      : "Dự án nổi bật";

  const openProjectDialog = useCallback((card: FeaturedProjectCard) => {
    setActiveProject(card);
  }, []);

  const closeProjectDialog = useCallback(() => {
    setActiveProject(null);
  }, []);

  const handleDialogBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeProjectDialog();
      }
    },
    [closeProjectDialog],
  );

  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    const titleLayer = titleLayerRef.current;

    if (!root || !scene || !titleLayer) {
      return;
    }

    ensureMotionRuntime();

    const parallaxLayers = gsap.utils.toArray<HTMLElement>(
      ".featured-work-card__parallax",
      root,
    );
    const mouseLayers = gsap.utils.toArray<HTMLElement>(
      ".featured-work-card__mouse",
      root,
    );

    if (prefersReducedMotion()) {
      gsap.set(titleLayer, {
        autoAlpha: 1,
        clearProps: "transform",
      });
      gsap.set(scene, {
        autoAlpha: 1,
        clearProps: "transform",
      });
      gsap.set([...parallaxLayers, ...mouseLayers], {
        autoAlpha: 1,
        clearProps: "transform",
      });
      return;
    }

    let removeMouseEvents = () => {};

    const ctx = gsap.context(() => {
      gsap.to(titleLayer, {
        ease: "none",
        scale: getTitleScale,
        scrollTrigger: {
          end: () => `top+=${window.innerHeight * 0.1}px top`,
          invalidateOnRefresh: true,
          scrub: 0.4,
          start: () => `top-=${window.innerHeight * 0.5}px top`,
          trigger: root,
        },
      });

      gsap.fromTo(
        [titleLayer, scene],
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            end: "bottom 65%",
            invalidateOnRefresh: true,
            scrub: 0.4,
            start: "bottom 95%",
            trigger: root,
          },
        },
      );

      parallaxLayers.slice(0, 5).forEach((layer, index) => {
        gsap.fromTo(
          layer,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              end: () => `top+=${revealEndOffsets[index]}% top`,
              invalidateOnRefresh: true,
              scrub: 0.4,
              start: () => `top-=${revealStartOffsets[index]}% bottom`,
              trigger: layer.parentElement ?? layer,
            },
          },
        );
      });

      parallaxLayers.forEach((layer) => {
        const card = layer.closest<HTMLElement>("[data-featured-work-card]");
        const size = card?.dataset.featuredWorkSize as
          | FeaturedProjectSize
          | undefined;

        if (!card || size === "large") {
          return;
        }

        const travelRatio = size === "small" ? 0.25 : 0.15;

        gsap.fromTo(
          layer,
          { y: () => -window.innerHeight * travelRatio },
          {
            ease: "none",
            scrollTrigger: {
              end: () => `bottom+=${window.innerHeight * travelRatio}px top`,
              invalidateOnRefresh: true,
              scrub: true,
              start: () => `top-=${window.innerHeight * travelRatio}px bottom`,
              trigger: card,
            },
            y: () => window.innerHeight * travelRatio,
          },
        );
      });

      const canUseMouseDrift =
        window.matchMedia("(pointer: fine)").matches &&
        ScrollTrigger.isTouch === 0;

      if (!canUseMouseDrift) {
        gsap.set(mouseLayers, { clearProps: "x,y" });
        return;
      }

      const mouse = {
        current: { x: 0, y: 0 },
        target: { x: 0, y: 0 },
      };
      const setters = mouseLayers.map((layer) => {
        const card = layer.closest<HTMLElement>("[data-featured-work-card]");
        const size =
          (card?.dataset.featuredWorkSize as FeaturedProjectSize | undefined) ??
          "medium";

        return {
          amplitude: mouseAmplitude[size],
          x: createQuickSetter(layer, "x", "px") as (value: number) => void,
          y: createQuickSetter(layer, "y", "px") as (value: number) => void,
        };
      });
      let isInView = false;

      const applyMouse = () => {
        setters.forEach((setter) => {
          setter.x(mouse.current.x * setter.amplitude);
          setter.y(mouse.current.y * setter.amplitude);
        });
      };
      const resetMouse = () => {
        mouse.target.x = 0;
        mouse.target.y = 0;
      };
      const resetMouseImmediately = () => {
        resetMouse();
        mouse.current.x = 0;
        mouse.current.y = 0;
        applyMouse();
      };
      const tickMouse = () => {
        if (!isInView) {
          return;
        }

        mouse.current.x = lerp(mouse.current.x, mouse.target.x, 0.09);
        mouse.current.y = lerp(mouse.current.y, mouse.target.y, 0.09);
        applyMouse();
      };
      const onPointerMove = (event: PointerEvent) => {
        mouse.target.x = gsap.utils.mapRange(
          0,
          window.innerWidth,
          1,
          -1,
          event.clientX,
        );
        mouse.target.y = gsap.utils.mapRange(
          0,
          window.innerHeight,
          1,
          -1,
          event.clientY,
        );
      };

      root.addEventListener("pointermove", onPointerMove, { passive: true });
      root.addEventListener("pointerleave", resetMouse);
      gsap.ticker.add(tickMouse);

      ScrollTrigger.create({
        end: "bottom top",
        onEnter: () => {
          isInView = true;
        },
        onEnterBack: () => {
          isInView = true;
        },
        onLeave: () => {
          isInView = false;
          resetMouseImmediately();
        },
        onLeaveBack: () => {
          isInView = false;
          resetMouseImmediately();
        },
        start: "top bottom",
        trigger: root,
      });

      removeMouseEvents = () => {
        root.removeEventListener("pointermove", onPointerMove);
        root.removeEventListener("pointerleave", resetMouse);
        gsap.ticker.remove(tickMouse);
      };
    }, root);

    scheduleScrollRefresh();

    return () => {
      removeMouseEvents();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProjectDialog();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, closeProjectDialog]);

  return (
    <section
      id="works"
      ref={rootRef}
      className="relative isolate z-0 flex flex-col bg-white pt-24 pb-[28vh] text-[#FFFFFF] sm:pt-32 xl:pt-0"
    >
      <div
        ref={titleLayerRef}
        className="featured-work-title-layer pointer-events-none sticky top-0 z-30 -mb-[100vh] flex h-screen items-center justify-center px-4 text-[#E4E4E7] mix-blend-exclusion"
      >
        <Link
          aria-label="Xem danh sách dự án"
          className="featured-work-title-link pointer-events-auto group focus-ring"
          href="/projects"
        >
          <span className="relative inline-flex items-start gap-2">
            <h2 className="text-center text-[52px] font-[700] leading-none tracking-normal sm:text-[68px] xl:text-[92px]">
              <span className="featured-work-title-link__text inline-block whitespace-nowrap">
                Dự án nổi bật
              </span>
            </h2>
          </span>
        </Link>
      </div>

      <div
        ref={sceneRef}
        className="works-depth-scene relative z-10 flex w-full flex-col gap-y-20 overflow-hidden px-4 md:gap-y-28 xl:gap-y-[4rem]"
      >
        {featuredProjectRows.map((row, rowIndex) => (
          <div
            className={cn(
              "flex w-full flex-col gap-y-14 md:gap-y-16 xl:grid xl:grid-cols-12 xl:gap-x-2.5 xl:gap-y-0",
              row.className,
            )}
            key={row.id}
          >
            {row.cards.map((card, index) => {
              const absoluteIndex = featuredProjectCards.findIndex(
                (item) => item.id === card.id,
              );

              return (
                <div className={card.wrapperClassName} key={card.id}>
                  <button
                    aria-label={`Mở video dự án nổi bật ${absoluteIndex + 1}`}
                    className={cn(
                      "featured-work-card group relative block h-0 w-full border-0 bg-transparent px-0 pb-0 pt-[56.25%] text-white outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-4",
                      card.cardClassName,
                    )}
                    data-featured-work-card
                    data-featured-work-reveal={
                      absoluteIndex < 5 ? "true" : undefined
                    }
                    data-featured-work-size={card.size}
                    data-featured-work-trigger
                    onClick={() => {
                      openProjectDialog(card);
                    }}
                    type="button"
                  >
                    <div className="featured-work-card__parallax absolute inset-0">
                      <div className="featured-work-card__mouse relative h-full w-full">
                        <Image
                          alt={`Dự án nổi bật ${absoluteIndex + 1}`}
                          className="h-full w-full object-cover"
                          fill
                          priority={rowIndex === 0 && index < 2}
                          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 30vw, 44vw"
                          src={card.image}
                        />
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 ease-out group-hover:bg-black/20 group-hover:opacity-100 group-focus-visible:bg-black/20 group-focus-visible:opacity-100">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#111111] shadow-[0_16px_36px_rgba(0,0,0,0.26)]">
                            <CirclePlay size={23} strokeWidth={1.9} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {activeProject ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-sm sm:px-6"
          onClick={handleDialogBackdropClick}
        >
          <div
            aria-label={activeProjectLabel}
            aria-modal="true"
            className="relative w-full max-w-5xl"
            role="dialog"
          >
            <button
              aria-label="Đóng video"
              className="focus-ring absolute right-0 -top-14 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111111] shadow-[0_16px_36px_rgba(0,0,0,0.24)] transition duration-200 ease-out hover:scale-105"
              onClick={closeProjectDialog}
              type="button"
            >
              <X size={20} strokeWidth={2.2} />
            </button>

            <div className="aspect-video w-full overflow-hidden rounded-[6px] bg-black shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
              <iframe
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
                referrerPolicy="strict-origin-when-cross-origin"
                src={activeProject.youtubeEmbedUrl}
                title={`Video ${activeProjectLabel}`}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
