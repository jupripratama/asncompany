import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`group flex shrink-0 items-center transition hover:opacity-90 ${className ?? ""}`}
      aria-label="CV Agape Sinar Nirwana — Beranda"
    >
      <Image
        src="/images/ASN-removebg-preview.png"
        alt="CV Agape Sinar Nirwana"
        width={180}
        height={88}
        className="h-10 w-auto object-contain dark:hidden sm:h-12"
        priority
      />
      <Image
        src="/images/ASN-removebg-preview-dark.png"
        alt="CV Agape Sinar Nirwana"
        width={180}
        height={88}
        className="hidden h-10 w-auto object-contain dark:block sm:h-12"
        priority
      />
    </Link>
  );
}
