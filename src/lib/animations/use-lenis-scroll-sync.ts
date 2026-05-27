"use client";

import Lenis, { type LenisOptions, type ScrollToOptions } from "lenis";
import { useEffect, useRef } from "react";

import { useLatestValue } from "@/lib/hooks";

import {
  ensureMotionRuntime,
  gsap,
  scheduleScrollRefresh,
  ScrollTrigger,
} from "./runtime";
import { prefersReducedMotion } from "./utils";

export type SmoothScrollMode = "off" | "desktop" | "all";

type SharedLenisOptions = Omit<LenisOptions, "anchors" | "autoRaf">;

export interface UseLenisScrollSyncOptions {
  anchors?: boolean | ScrollToOptions;
  enabled?: boolean;
  mode?: SmoothScrollMode;
  onScroll?: (lenis: Lenis) => void;
  options?: SharedLenisOptions;
  refreshOnDestroy?: boolean;
  refreshOnMount?: boolean;
}

const GSAP_LAG_SMOOTHING_RESTORE = [500, 33] as const;

let activeTickerSyncs = 0;

function isTouchLikeDevice() {
  return (
    ScrollTrigger.isTouch !== 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

function shouldEnableLenis(mode: SmoothScrollMode) {
  if (mode === "off") {
    return false;
  }

  if (mode === "all") {
    return true;
  }

  return !isTouchLikeDevice();
}

function disableGsapLagSmoothing() {
  if (activeTickerSyncs === 0) {
    gsap.ticker.lagSmoothing(0);
  }

  activeTickerSyncs += 1;
}

function restoreGsapLagSmoothing() {
  activeTickerSyncs = Math.max(0, activeTickerSyncs - 1);

  if (activeTickerSyncs === 0) {
    gsap.ticker.lagSmoothing(...GSAP_LAG_SMOOTHING_RESTORE);
  }
}

export function useLenisScrollSync({
  anchors = true,
  enabled = true,
  mode = "desktop",
  onScroll,
  options,
  refreshOnDestroy = true,
  refreshOnMount = true,
}: UseLenisScrollSyncOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const onScrollRef = useLatestValue(onScroll);

  useEffect(() => {
    ensureMotionRuntime();

    if (!enabled || prefersReducedMotion() || !shouldEnableLenis(mode)) {
      return;
    }

    const lenis = new Lenis({
      anchors,
      autoRaf: false,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      ...options,
    });
    const handleScroll = (instance: Lenis) => {
      ScrollTrigger.update();
      onScrollRef.current?.(instance);
    };
    const advanceLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    const unsubscribe = lenis.on("scroll", handleScroll);

    lenisRef.current = lenis;
    disableGsapLagSmoothing();
    gsap.ticker.add(advanceLenis);

    if (refreshOnMount) {
      scheduleScrollRefresh();
    }

    return () => {
      unsubscribe();
      gsap.ticker.remove(advanceLenis);
      restoreGsapLagSmoothing();
      lenis.destroy();
      lenisRef.current = null;

      if (refreshOnDestroy) {
        scheduleScrollRefresh();
      }
    };
  }, [
    anchors,
    enabled,
    mode,
    options,
    refreshOnDestroy,
    refreshOnMount,
    onScrollRef,
  ]);

  return lenisRef;
}
