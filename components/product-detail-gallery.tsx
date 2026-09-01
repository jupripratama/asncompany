"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductDetailGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;
  const usesFullBleedImage = Boolean(activeImage?.placeholder || activeImage?.representative);

  const previous = () => setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const next = () => setActiveIndex((current) => (current + 1) % images.length);

  return (
    <div>
      <div className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-700",
        usesFullBleedImage ? "bg-slate-100 dark:bg-slate-900" : "bg-white dark:bg-white",
      )}>
        {activeImage && (
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={usesFullBleedImage ? "object-cover" : "object-contain"}
          />
        )}

        {activeImage?.representative && (
          <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-slate-950/75 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white uppercase backdrop-blur">Visual representatif</span>
        )}

        {hasMultipleImages && (
          <>
            <button type="button" onClick={previous} aria-label={`Foto sebelumnya untuk ${productName}`} className="absolute top-1/2 left-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={next} aria-label={`Foto berikutnya untuk ${productName}`} className="absolute top-1/2 right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-cyan-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
            <span className="absolute top-5 left-5 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">{activeIndex + 1}/{images.length}</span>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6" aria-label={`Galeri ${productName}`}>
          {images.map((image, index) => {
            const fullBleed = Boolean(image.placeholder || image.representative);
            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Tampilkan foto ${index + 1} untuk ${productName}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500",
                  activeIndex === index ? "border-cyan-500 shadow-md" : "border-slate-200 hover:border-cyan-300 dark:border-slate-700",
                  fullBleed ? "bg-slate-100 dark:bg-slate-900" : "bg-white dark:bg-white",
                )}
              >
                <Image src={image.src} alt="" fill sizes="120px" className={fullBleed ? "object-cover" : "object-contain"} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
