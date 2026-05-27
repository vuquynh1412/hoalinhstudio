"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let runtimeConfigured = false;
let scheduledRefreshFrame = 0;

export function ensureMotionRuntime() {
  gsap.registerPlugin(ScrollTrigger);

  if (runtimeConfigured || typeof window === "undefined") {
    return;
  }

  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });

  runtimeConfigured = true;
}

export function scheduleScrollRefresh() {
  if (typeof window === "undefined") {
    return;
  }

  window.cancelAnimationFrame(scheduledRefreshFrame);
  scheduledRefreshFrame = window.requestAnimationFrame(() => {
    scheduledRefreshFrame = 0;
    ScrollTrigger.refresh();
  });
}

export { gsap, ScrollTrigger };
