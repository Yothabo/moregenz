import { useEffect, useState } from 'react';

export type AdminTheme = 'light' | 'dark';

export function useAdminTheme() {
  const [adminTheme, setAdminTheme] = useState<AdminTheme>(() => {
    try {
      return localStorage.getItem('simatu-admin-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('simatu-admin-theme', adminTheme);
    } catch {
      // Theme remains usable when browser storage is unavailable.
    }
  }, [adminTheme]);

  const toggleTheme = () =>
    setAdminTheme((current) => (current === 'light' ? 'dark' : 'light'));

  return { adminTheme, setAdminTheme, toggleTheme };
}
