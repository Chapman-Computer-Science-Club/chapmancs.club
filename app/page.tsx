"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";

import Boot from "@/components/Boot";
import Terminal from "@/components/Terminal";
import { useInitialMedia } from "@/lib/useInitialMedia";

export default function Home() {
  const [finished, setFinished] = useState(false);

  // boot plays on every load, turn off for reduced motion.
  // Read once, so toggling the OS setting later can't replay the boot.
  const skipBoot = useInitialMedia("(prefers-reduced-motion: reduce)");
  const booted = finished || skipBoot;

  const finish = useCallback(() => setFinished(true), []);

  return (
    <>
      <AnimatePresence>{!booted && <Boot key="boot" onDone={finish} />}</AnimatePresence>
      {booted && <Terminal />}
    </>
  );
}
