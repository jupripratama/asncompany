import Image from "next/image";
import { cn } from "@/lib/utils";

const brandLogos: Record<string, string> = {
  Hikvision: "/images/brands/hikvision.svg",
  Dahua: "/images/brands/dahua.svg",
  Uniview: "/images/brands/uniview.png",
  Axis: "/images/brands/axis.svg",
  Honeywell: "/images/brands/honeywell.svg",
};

export function BrandMark({ brand, compact = false }: { brand: string; compact?: boolean }) {
  const logoSrc = brandLogos[brand];

  return (
    <span className={cn(
      "grid min-w-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white px-3 text-center font-black tracking-tight text-slate-700 shadow-sm dark:border-slate-600 dark:bg-white dark:shadow-black/25",
      compact ? "min-h-10 text-[11px]" : "min-h-16 text-sm",
    )}>
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={`Logo ${brand}`}
          width={180}
          height={64}
          className={cn("max-w-full object-contain", compact ? "max-h-4 w-full" : "max-h-7 w-full")}
        />
      ) : brand}
    </span>
  );
}
