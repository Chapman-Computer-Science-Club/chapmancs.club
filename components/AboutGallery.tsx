"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/gallery/photo1.jpg",
  "/gallery/photo2.jpg",
  "/gallery/photo3.jpg",
  "/gallery/photo5.jpg",
  "/gallery/photo6.jpg",
  "/gallery/photo7.jpg",
  "/gallery/photo8.jpg",
  "/gallery/photo9.jpg",
  "/gallery/photo10.jpg",
  "/gallery/photo11.jpg",
];

const INTERVAL_MS = 2500;

export default function AboutGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-maroon/15 bg-[repeating-linear-gradient(45deg,rgba(123,28,44,0.05)_0px,rgba(123,28,44,0.05)_2px,transparent_2px,transparent_10px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
