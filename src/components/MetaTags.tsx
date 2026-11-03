import useStorefront from '../hooks/useStorefront';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function MetaTags({
  title,
  description,
  image,
  url = typeof window !== 'undefined' ? window.location.href : '/',
}: MetaTagsProps) {
  const { name: storeName } = useStorefront();
  const isYotaabo = storeName === 'Yotaabo';

  const pageTitle =
    title ?? (isYotaabo
      ? `${storeName} | Fragrance, With Intention`
      : `${storeName} | Comfort, Confidence, Your Way`);

  const pageDescription =
    description ?? (isYotaabo
      ? 'Discover fragrances that match your mood, define your style, and leave a lasting impression.'
      : 'Discover intimate wear, everyday underwear and comfortable sleepwear at Poshies.');

  const pageImage = image ?? (isYotaabo ? '/images/hisimage.webp' : undefined);

  const keywords = isYotaabo
    ? 'fragrances, perfume, signature scent, fragrance collection, South Africa'
    : 'intimate wear, underwear, lingerie, sleepwear, pyjamas, lounge wear, South Africa';

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      {pageImage && <meta property="og:image" content={pageImage} />}
      <meta property="og:site_name" content={storeName} />
      <meta name="twitter:card" content={pageImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {pageImage && <meta name="twitter:image" content={pageImage} />}
      <link rel="canonical" href={url} />
    </>
  );
}
