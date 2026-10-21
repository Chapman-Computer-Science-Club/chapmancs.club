"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Boot from "@/components/Boot";
import Terminal from "@/components/Terminal";

export default function Home() {
  const [booted, setBooted] = useState(false);

  // boot plays on every load, turn off for reduced motion
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setBooted(true);
  }, []);

  const finish = useCallback(() => setBooted(true), []);

  return (
    <>
      <AnimatePresence>{!booted && <Boot key="boot" onDone={finish} />}</AnimatePresence>
      {booted && <Terminal />}
    </>
  );
}
