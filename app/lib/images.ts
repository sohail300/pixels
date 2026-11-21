import { BUCKET_URL } from "@/lib/config";

/** Full-size image URL for a wallpaper's `image` key ("<bucket>/<object name>"). */
export function imageUrl(image: string): string {
  return `${BUCKET_URL}${image}`;
}

/**
 * Small WebP thumbnail for the grid, stored by the backend at
 * "<bucket>/thumbs/<object name>.webp". Callers fall back to `imageUrl` when it
 * is missing (e.g. a wallpaper uploaded before thumbnails existed).
 */
export function thumbnailUrl(image: string): string {
  const slash = image.indexOf("/");
  if (slash === -1) return imageUrl(image);
  const bucket = image.slice(0, slash);
  const objectName = image.slice(slash + 1);
  return `${BUCKET_URL}${bucket}/thumbs/${objectName}.webp`;
}
