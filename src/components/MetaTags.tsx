import React from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ 
  title = 'moreGenz Security Systems | CCTV, Electric Fencing & Access Control Experts',
  description = 'Professional security systems installation in South Africa. Certified Hikvision, Centurion & Gemini installer. CCTV cameras, electric fencing, access control, alarm systems.',
  image = 'https://moregenz-security-systems.netlify.app/logo.png',
  url = 'https://moregenz-security-systems.netlify.app/'
}) => {
  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="CCTV installation, electric fencing, access control, security systems, South Africa, Hikvision, Centurion, Gemini, alarm systems" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="moreGenz Security Systems" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </>
  );
};

export default MetaTags;
