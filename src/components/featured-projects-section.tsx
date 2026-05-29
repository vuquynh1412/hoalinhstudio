"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
  wrapperClassName: string;
};

type FeaturedProjectRow = {
  cards: FeaturedProjectCard[];
  className?: string;
  id: string;
};

const mouseAmplitude: Record<FeaturedProjectSize, number> = {
  large: 60,
  medium: 30,
  small: 20,
};

const revealStartOffsets = [18, 42, 28, 50, 12] as const;
const revealEndOffsets = [3, 1, 5, 2, 4] as const;
const featuredProjectCount = 15;

function getFeaturedProjectImage(index: number) {
  return featuredProjectImages[index % featuredProjectImages.length];
}

const featuredProjectRows: FeaturedProjectRow[] = [
  {
    id: "opening",
    cards: [
      {
        cardClassName: "-ml-[16vw] lg:-ml-[8.2vw]",
        id: "loller-scale",
        image: featuredProjectImages[0],
        size: "large",
        wrapperClassName: "col-span-3",
      },
      {
        cardClassName: "-ml-[16vw] translate-y-1/2 lg:ml-0",
        id: "studio-corner",
        image: featuredProjectImages[3],
        size: "small",
        wrapperClassName: "col-span-1 flex items-end",
      },
      {
        cardClassName: "opacity-40",
        id: "white-volume",
        image: featuredProjectImages[4],
        size: "medium",
        wrapperClassName:
          "col-start-5 col-end-7 flex items-center lg:col-start-6 lg:col-end-8",
      },
      {
        cardClassName: "-ml-[16vw] lg:ml-0 lg:-translate-y-1/2",
        id: "soft-interior",
        image: featuredProjectImages[1],
        size: "medium",
        wrapperClassName:
          "col-span-2 mt-[18vh] lg:col-start-9 lg:col-end-11 lg:mt-0",
      },
      {
        cardClassName: "-translate-y-1/2 opacity-20",
        id: "pale-block",
        image: featuredProjectImages[5],
        size: "small",
        wrapperClassName:
          "col-start-6 col-end-7 mt-[8vh] flex items-center lg:col-start-12 lg:col-end-13 lg:mt-0",
      },
    ],
  },
  {
    id: "middle",
    cards: [
      {
        cardClassName: "translate-y-1/2 lg:-ml-[8.2vw] lg:-translate-y-1/4",
        id: "production-floor",
        image: featuredProjectImages[2],
        size: "medium",
        wrapperClassName: "col-span-2 flex items-end lg:items-center",
      },
      {
        cardClassName: "-translate-y-1/2 opacity-20 lg:translate-y-1/2",
        id: "portrait-rig",
        image: featuredProjectImages[0],
        size: "small",
        wrapperClassName:
          "col-span-1 flex lg:col-start-3 lg:col-end-4 lg:items-end",
      },
      {
        id: "edit-suite",
        image: featuredProjectImages[4],
        size: "medium",
        wrapperClassName:
          "col-span-3 flex translate-x-[16vw] items-center lg:col-start-5 lg:col-end-7 lg:translate-x-0",
      },
      {
        cardClassName: "opacity-20 lg:-translate-y-1/2",
        id: "quiet-square",
        image: featuredProjectImages[3],
        size: "small",
        wrapperClassName: "hidden lg:col-start-8 lg:col-end-9 lg:block",
      },
      {
        id: "large-archive",
        image: featuredProjectImages[5],
        size: "large",
        wrapperClassName:
          "hidden lg:col-start-10 lg:col-end-13 lg:flex lg:items-center lg:pb-64",
      },
    ],
  },
  {
    className: "pt-[60vh] pb-[50vh] md:pt-[80vh] lg:py-0",
    id: "deep",
    cards: [
      {
        cardClassName: "lg:-ml-[8.2vw]",
        id: "sunlit-set",
        image: featuredProjectImages[1],
        size: "large",
        wrapperClassName:
          "col-span-3 order-last translate-x-[28vw] md:translate-x-[18vw] lg:order-none lg:translate-x-0",
      },
      {
        cardClassName: "-translate-y-1/2 opacity-20 lg:translate-y-1/2",
        id: "small-sky",
        image: featuredProjectImages[2],
        size: "small",
        wrapperClassName: "col-span-1 flex lg:items-end",
      },
      {
        cardClassName: "translate-y-1/2 lg:translate-y-0",
        id: "medium-water",
        image: featuredProjectImages[3],
        size: "medium",
        wrapperClassName:
          "col-start-2 col-end-4 flex items-end lg:col-start-9 lg:col-end-11 lg:items-center",
      },
      {
        cardClassName: "opacity-20",
        id: "barely-there",
        image: featuredProjectImages[5],
        size: "small",
        wrapperClassName: "hidden lg:col-start-12 lg:col-end-13 lg:block",
      },
    ],
  },
  {
    className: "max-lg:hidden",
    id: "tail",
    cards: [
      {
        cardClassName: "-ml-[8.2vw]",
        id: "closing-frame",
        image: getFeaturedProjectImage(14),
        size: "medium",
        wrapperClassName: "col-span-2 flex items-end",
      },
      {
        cardClassName: "translate-y-1/2 opacity-20",
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

const featuredProjectCards = featuredProjectRows.flatMap((row) => row.cards);

function getTitleScale() {
  if (window.innerWidth < 768) {
    return 0.5;
  }

  if (window.innerWidth <= 1024) {
    return 0.66;
  }

  return 0.6;
}

export function FeaturedProjectsSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const titleLayerRef = useRef<HTMLDivElement | null>(null);

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
          start: () => `top-=${window.innerHeight * 0.35}px top`,
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

  return (
    <section
      id="works"
      ref={rootRef}
      className="relative isolate z-0 flex flex-col bg-white pb-[28vh] text-[#FFFFFF]"
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
            <h2 className="text-center text-[42px] font-[700] leading-none tracking-normal sm:text-[62px] lg:text-[92px]">
              <span className="featured-work-title-link__text inline-block">
                Dự án nổi bật
              </span>
            </h2>
            <span className="pt-1 text-[18px] font-[600] leading-none tracking-normal sm:text-[24px] lg:text-[34px]">
              ({featuredProjectCount})
            </span>
          </span>
        </Link>
      </div>

      <div
        ref={sceneRef}
        className="works-depth-scene relative z-10 mt-[10vh] flex w-full flex-col overflow-hidden pt-[4vh] sm:mt-[14vh] sm:pt-[6vh] lg:mt-[30vh] lg:gap-y-[8.75rem] lg:pt-[15vh]"
      >
        {featuredProjectRows.map((row, rowIndex) => (
          <div
            className={cn(
              "grid grid-cols-6 gap-x-2.5 px-5 lg:grid-cols-12",
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
                  <div
                    className={cn(
                      "featured-work-card relative h-0 w-full pt-[130%]",
                      card.cardClassName,
                    )}
                    data-featured-work-card
                    data-featured-work-reveal={
                      absoluteIndex < 5 ? "true" : undefined
                    }
                    data-featured-work-size={card.size}
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
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
