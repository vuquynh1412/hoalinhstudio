"use client";

import type { ReactNode } from "react";

import { useLenisScrollSync } from "@/lib/animations";

type MotionScrollProviderProps = {
  children: ReactNode;
};

export function MotionScrollProvider({ children }: MotionScrollProviderProps) {
  useLenisScrollSync({
    anchors: true,
    mode: "desktop",
  });

  return children;
}
