import images from '../data/images.json';

/**
 * Item 47: every screenshot ships as AVIF, WebP and JPEG at several widths. The
 * browser picks one file at the size it actually renders, and the intrinsic
 * width/height from the manifest reserves the right space before it arrives.
 *
 * `name` is a key in src/data/images.json, written by `npm run images`.
 *
 * `full` opts out of responsive selection and loads the widest variant outright.
 * Responsive sizing is exactly wrong for a zoomed lightbox: with `sizes="100vw"` a
 * 390px phone is served the 400px file, so "zoom" had no pixels to magnify — the
 * image was already at its natural width and the pan surface had nothing to scroll.
 */
export default function Picture({
  name,
  alt,
  sizes,
  loading = 'lazy',
  fetchPriority,
  className,
  ariaHidden,
  full = false,
}) {
  const meta = images[name];
  if (!meta) return null;

  const srcSet = (ext) => meta.widths.map((width) => `/assets/${name}-${width}.${ext} ${width}w`).join(', ');
  const fallback = meta.widths.includes(1200) ? 1200 : meta.widths.at(-1);
  const widest = meta.widths.at(-1);

  // No srcSet and no sizes: the browser has one candidate and must take it.
  if (full) {
    return (
      <picture>
        <source type="image/avif" srcSet={`/assets/${name}-${widest}.avif`} />
        <source type="image/webp" srcSet={`/assets/${name}-${widest}.webp`} />
        <img
          src={`/assets/${name}-${widest}.jpg`}
          width={meta.width}
          height={meta.height}
          alt={alt}
          loading="eager"
          decoding="async"
          className={className}
          aria-hidden={ariaHidden}
        />
      </picture>
    );
  }

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
        className={className}
        aria-hidden={ariaHidden}
      />
    </picture>
  );
}
