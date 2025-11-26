import React from 'react';
import MetaTags from './MetaTags';

interface PageMetaProps {
  page: 'home' | 'about' | 'services' | 'gallery';
}

const PageMeta: React.FC<PageMetaProps> = ({ page }) => {
  const metaConfig = {
    home: {
      title: 'moreGenz Security Systems | CCTV, Electric Fencing & Access Control Experts',
      description: 'Professional security systems installation in South Africa. Certified Hikvision, Centurion & Gemini installer. CCTV cameras, electric fencing, access control, alarm systems.',
    },
    about: {
      title: 'About Us | moreGenz Security Systems',
      description: 'Learn about moreGenz Security Systems - your trusted security partner in South Africa with certified installations and professional support.',
    },
    services: {
      title: 'Our Services | CCTV, Electric Fencing, Access Control',
      description: 'Comprehensive security solutions including CCTV installation, electric fencing, access control systems, and alarm systems in South Africa.',
    },
    gallery: {
      title: 'Project Gallery | moreGenz Security Systems',
      description: 'View our completed security system installations including CCTV, electric fencing, and access control projects across South Africa.',
    }
  };

  const config = metaConfig[page];

  return (
    <MetaTags
      title={config.title}
      description={config.description}
    />
  );
};

export default PageMeta;
