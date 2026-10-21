"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { AnimatePresence } from "motion/react";

import Boot from "@/components/Boot";
import Terminal from "@/components/Terminal";

const noSubscribe = () => () => {};
const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const [finished, setFinished] = useState(false);

  // boot plays on every load, turn off for reduced motion.
  // Read once after hydration (server renders the boot); not subscribed, so
  // toggling the OS setting later can't replay the boot.
  const skipBoot = useSyncExternalStore(noSubscribe, prefersReducedMotion, () => false);
  const booted = finished || skipBoot;

  const finish = useCallback(() => setFinished(true), []);

  return (
    <>
      <AnimatePresence>{!booted && <Boot key="boot" onDone={finish} />}</AnimatePresence>
      {booted && <Terminal />}
    </>
  );
}
