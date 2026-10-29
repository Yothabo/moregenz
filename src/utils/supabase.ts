import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

// Custom storage adapter that respects the "Remember me" preference
const customStorage = {
  getItem: (key: string) => {
    // If "remember me" was NOT checked, don't persist — return from sessionStorage or null
    const remembered = localStorage.getItem('yotaabo-remember-me') === 'true';
    return remembered ? localStorage.getItem(key) : sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    const remembered = localStorage.getItem('yotaabo-remember-me') === 'true';
    if (remembered) {
      localStorage.setItem(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: customStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
