export type OptimizedImageResult = {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  width: number;
  height: number;
};

/**
 * Optimizes an uploaded image file into lightweight, high-performance WebP format.
 * Reduces storage footprint and accelerates page load times.
 *
 * @param file The original image file from <input type="file">
 * @param maxDimension Maximum width or height in pixels (default 1400px for products, 1920px for hero)
 * @param quality WebP compression quality between 0.1 and 1.0 (default 0.82)
 */
export async function optimizeImageToWebp(
  file: File,
  maxDimension = 1400,
  quality = 0.82
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Gagal membaca file gambar"));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error("File gambar tidak valid atau rusak"));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Proportional scale down if dimensions exceed maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("Browser tidak mendukung kanvas grafis"));
        }

        // Draw image onto canvas
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP
        let webpUrl = canvas.toDataURL("image/webp", quality);

        // If browser doesn't support WebP export, fallback to JPEG
        if (!webpUrl.startsWith("data:image/webp")) {
          webpUrl = canvas.toDataURL("image/jpeg", quality);
        }

        // Calculate approximate size in bytes from base64
        const head = webpUrl.indexOf(",") + 1;
        const compressedSize = Math.round(((webpUrl.length - head) * 3) / 4);
        const originalSize = file.size;
        const reductionPercentage = Math.max(
          0,
          Math.round(((originalSize - compressedSize) / originalSize) * 100)
        );

        resolve({
          dataUrl: webpUrl,
          originalSize,
          compressedSize,
          reductionPercentage,
          width,
          height,
        });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes into human readable format (e.g. 120 KB, 1.4 MB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
