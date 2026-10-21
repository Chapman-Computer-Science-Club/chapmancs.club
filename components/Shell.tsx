"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";

import Boot from "@/components/Boot";
import Terminal from "@/components/Terminal";
import { useInitial, useInitialMedia } from "@/lib/useInitialMedia";

// Lives in the root layout, so it stays mounted across client-side navigation: the boot plays once per page load.
export default function Shell({ children }: { children: React.ReactNode }) {
  const [finished, setFinished] = useState(false);

  const reducedMotion = useInitialMedia("(prefers-reduced-motion: reduce)");
  const automated = useInitial(() => navigator.webdriver);
  const booted = finished || reducedMotion || automated;

  const finish = useCallback(() => setFinished(true), []);

  return (
    <>
      <Terminal active={booted} reveal={finished}>
        {children}
      </Terminal>
      <AnimatePresence>{!booted && <Boot key="boot" onDone={finish} />}</AnimatePresence>
    </>
  );
}
