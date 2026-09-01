"use client";

import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductImageSliderProps = {
  images: ProductImage[];
  productName: string;
  categoryLabel: string;
};

export function ProductImageSlider({ images, productName, categoryLabel }: ProductImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;
  const usesFullBleedImage = Boolean(activeImage?.placeholder || activeImage?.representative);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className={cn(
      "group relative aspect-[16/10] overflow-hidden border-b border-slate-200 dark:border-slate-700",
      usesFullBleedImage ? "bg-slate-100 dark:bg-slate-900" : "bg-white dark:bg-white",
    )}>
      {activeImage ? (
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={cn(
            "transition duration-500 ease-out group-hover:scale-[1.025]",
            usesFullBleedImage ? "object-cover" : "object-contain",
          )}
        />
      ) : (
        <div className="grid size-full place-items-center text-slate-400">
          <ImageIcon className="size-10" aria-hidden="true" />
        </div>
      )}

      <span className="absolute top-4 right-4 rounded-full bg-slate-950/85 px-3 py-1.5 text-[10px] font-black tracking-wide text-white uppercase shadow-sm backdrop-blur">
        {categoryLabel}
      </span>

      {(activeImage?.placeholder || activeImage?.representative) && (
        <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-slate-950/75 px-2.5 py-1 text-[9px] font-bold tracking-wide text-white uppercase backdrop-blur">
          {activeImage.representative ? "Visual representatif" : "Visual kategori"}
        </span>
      )}

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={`Lihat foto sebelumnya untuk ${productName}`}
            className="absolute top-1/2 left-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-slate-950/70 text-white shadow-lg backdrop-blur transition hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label={`Lihat foto berikutnya untuk ${productName}`}
            className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-slate-950/70 text-white shadow-lg backdrop-blur transition hover:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
          <div className="absolute right-0 bottom-4 left-0 flex items-center justify-center gap-1.5" aria-label={`Foto ${activeIndex + 1} dari ${images.length}`}>
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Buka foto ${index + 1} untuk ${productName}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500",
                  activeIndex === index
                    ? "w-6 bg-cyan-400"
                    : cn("w-1.5", usesFullBleedImage ? "bg-white/80 hover:bg-white" : "bg-slate-400 hover:bg-slate-600"),
                )}
              />
            ))}
          </div>
          <span className="absolute top-4 left-4 rounded-full bg-slate-950/75 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
            {activeIndex + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}
