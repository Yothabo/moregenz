interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function MetaTags({
  title = 'Yotaabo | Fragrance, With Intention',
  description = 'Discover fragrances that match your mood, define your style, and leave a lasting impression.',
  image = '/images/hisimage.webp',
  url = typeof window !== 'undefined' ? window.location.href : '/',
}: MetaTagsProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="fragrances, perfume, signature scent, fragrance collection, South Africa" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Yotaabo" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </>
  );
}
