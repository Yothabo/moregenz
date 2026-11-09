import { useLocation } from 'react-router-dom';

export type StorefrontCategory = 'His' | 'Hers' | 'Spaces' | 'Lounge';

const STOREFRONTS = {
  yotaabo: {
    name: 'Yotaabo',
    basePath: '/yotaabo',
    primaryAccent: '#8aa89b',
    categoryOrder: ['His', 'Hers', 'Spaces'] as StorefrontCategory[],
  },
  poshies: {
    name: 'Poshies',
    basePath: '/poshies',
    primaryAccent: '#ff1493',
    categoryOrder: ['Hers', 'His', 'Lounge'] as StorefrontCategory[],
  },
} as const;

export default function useStorefront() {
  const { pathname } = useLocation();

  const store = pathname === '/poshies' || pathname.startsWith('/poshies/')
    ? STOREFRONTS.poshies
    : STOREFRONTS.yotaabo;

  const pathFor = (path = '') => {
    const cleanPath = path.replace(/^\/+/, '');
    return cleanPath
      ? `${store.basePath}/${cleanPath}`
      : store.basePath;
  };

  return { ...store, pathFor };
}
