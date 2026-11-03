import { useLocation } from 'react-router-dom';

export type StorefrontCategory = 'His' | 'Hers' | 'Spaces';

const STOREFRONTS = {
  yotaabo: {
    name: 'Yotaabo',
    basePath: '/yotaabo',
    primaryAccent: '#8aa89b',
    categoryOrder: ['His', 'Hers', 'Spaces'] as StorefrontCategory[],
  },
  porschs: {
    name: 'Poshies',
    basePath: '/porschs',
    primaryAccent: '#ff1493',
    categoryOrder: ['Hers', 'His', 'Spaces'] as StorefrontCategory[],
  },
} as const;

export default function useStorefront() {
  const { pathname } = useLocation();

  const store = pathname === '/porschs' || pathname.startsWith('/porschs/')
    ? STOREFRONTS.porschs
    : STOREFRONTS.yotaabo;

  const pathFor = (path = '') => {
    const cleanPath = path.replace(/^\/+/, '');
    return cleanPath
      ? `${store.basePath}/${cleanPath}`
      : store.basePath;
  };

  return { ...store, pathFor };
}
