import images from '../data/images.json';

/**
 * Every screenshot ships as AVIF, WebP and JPEG at several widths. The browser
 * picks one file at the size it actually renders, and the intrinsic width/height
 * from the manifest reserves the right space before it arrives.
 */
export default function Picture({ name, alt, sizes, loading = 'lazy', fetchPriority }) {
  const meta = images[name];
  if (!meta) return null;

  const srcSet = (ext) => meta.widths.map((width) => `/assets/${name}-${width}.${ext} ${width}w`).join(', ');
  const fallback = meta.widths.includes(1200) ? 1200 : meta.widths.at(-1);

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={`/assets/${name}-${fallback}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        width={meta.width}
        height={meta.height}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}
