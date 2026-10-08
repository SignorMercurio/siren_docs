import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import type { StaticImageData } from 'next/image';

// Shows the variant that matches the site theme; both are rendered so the
// switch needs no client-side JavaScript.
export function ThemeImage({
  light,
  dark,
  alt,
}: {
  light: StaticImageData;
  dark: StaticImageData;
  alt: string;
}) {
  return (
    <>
      <ImageZoom src={light} alt={alt} className="dark:hidden" />
      <ImageZoom src={dark} alt={alt} className="hidden dark:block" />
    </>
  );
}
