"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  ensureMotionRuntime,
  gsap,
  scheduleScrollRefresh,
  ScrollTrigger,
} from "./runtime";
import { prefersReducedMotion } from "./utils";

const REVEAL_SELECTOR = "[data-scroll-reveal='enter']";

function isAlreadyVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return rect.top <= window.innerHeight * 0.88;
}

export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    ensureMotionRuntime();

    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );

    if (candidates.length === 0) {
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(candidates, {
        autoAlpha: 1,
        clearProps: "filter,opacity,transform,visibility",
      });
      return;
    }

    const immediateElements: HTMLElement[] = [];
    const revealElements: HTMLElement[] = [];

    candidates.forEach((element) => {
      if (isAlreadyVisible(element)) {
        immediateElements.push(element);
        return;
      }

      revealElements.push(element);
    });

    gsap.set(immediateElements, {
      autoAlpha: 1,
      clearProps: "filter,opacity,transform,visibility",
    });

    gsap.set(revealElements, {
      autoAlpha: 0,
      filter: "blur(10px)",
      y: 24,
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(revealElements, {
        batchMax: 4,
        interval: 0.1,
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            duration: 0.82,
            ease: "power3.out",
            filter: "blur(0px)",
            overwrite: "auto",
            stagger: 0.12,
            y: 0,
          });
        },
        start: "top 90%",
      });
    }, document.body);

    scheduleScrollRefresh();

    return () => {
      ctx.revert();
    };
  }, [pathname]);
}
