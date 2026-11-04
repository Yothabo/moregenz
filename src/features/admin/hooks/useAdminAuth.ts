import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabase';
import { ADMIN_STORAGE_KEYS } from '../constants/admin.constants';

type AdminContext = {
  id: string;
  email: string | null;
  role: 'super_admin' | 'store_admin';
  storeId: string | null;
  storeSlug: string | null;
};

type UseAdminAuthResult = {
  session: Session | null;
  admin: AdminContext | null;
  isAdmin: boolean | null;
  isChecking: boolean;
  isLoggingIn: boolean;
  loginError: string | null;
  clearLoginError: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

function clearAdminStorage() {
  try {
    const storageKeys = Object.values(ADMIN_STORAGE_KEYS);

    for (let index = sessionStorage.length - 1; index >= 0; index--) {
      const storedKey = sessionStorage.key(index);

      if (
        storedKey &&
        storageKeys.some(
          (key) =>
            storedKey === key ||
            storedKey.startsWith(`${key}:`)
        )
      ) {
        sessionStorage.removeItem(storedKey);
      }
    }
  } catch {
    // Storage may be unavailable in some browser environments.
  }
}

export function useAdminAuth(): UseAdminAuthResult {
  const [session, setSession] = useState<Session | null>(null);
  const [admin, setAdmin] = useState<AdminContext | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    async function checkAdmin(currentSession: Session | null) {
      if (!active) return;

      setIsChecking(true);

      if (!currentSession) {
        clearAdminStorage();
        setAdmin(null);
        setIsAdmin(false);
        setIsChecking(false);
        return;
      }

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await fetch('/api/admin-context', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${currentSession.access_token}`,
            },
            cache: 'no-store',
          });

          if (!active) return;

          if (response.status === 401) {
            clearAdminStorage();
            setAdmin(null);
            setIsAdmin(false);
            setIsChecking(false);
            return;
          }

          if (!response.ok) {
            throw new Error('Unable to verify admin access.');
          }

          const payload = await response.json();
          const verifiedAdmin = payload?.admin;

          if (
            !verifiedAdmin?.id ||
            !['super_admin', 'store_admin'].includes(verifiedAdmin.role) ||
            (verifiedAdmin.role === 'store_admin' &&
              (!verifiedAdmin.storeId || !verifiedAdmin.storeSlug)) ||
            (verifiedAdmin.role === 'super_admin' &&
              verifiedAdmin.storeId !== null)
          ) {
            clearAdminStorage();
            setAdmin(null);
            setIsAdmin(false);
            setIsChecking(false);
            return;
          }

          setAdmin(verifiedAdmin);
          setIsAdmin(true);
          setIsChecking(false);
          return;
        } catch {
          if (attempt < 2) {
            await new Promise((resolve) =>
              window.setTimeout(resolve, 300 * (attempt + 1))
            );
          }
        }
      }

      if (active) {
        clearAdminStorage();
        setAdmin(null);
        setIsAdmin(false);
        setIsChecking(false);
      }
    }

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, nextSession) => {
        if (!active) return;

        const nextUserId = nextSession?.user.id ?? null;

        if (
          event === 'SIGNED_OUT' ||
          (event === 'SIGNED_IN' &&
            lastUserIdRef.current !== null &&
            lastUserIdRef.current !== nextUserId)
        ) {
          clearAdminStorage();
        }

        lastUserIdRef.current = nextUserId;
        setSession(nextSession);

        const shouldCheckAdmin = [
          'INITIAL_SESSION',
          'SIGNED_IN',
          'SIGNED_OUT',
          'USER_UPDATED',
          'PASSWORD_RECOVERY',
        ].includes(event);

        if (!shouldCheckAdmin) return;

        setIsChecking(true);
        setIsAdmin(nextSession ? null : false);

        window.setTimeout(() => {
          if (active) void checkAdmin(nextSession);
        }, 0);
      }
    );

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoginError(
          error.message.toLowerCase().includes('invalid login')
            ? 'The email or password you entered is incorrect.'
            : error.message
        );
        return false;
      }

      return Boolean(data.session);
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : 'Unable to sign in. Please try again.'
      );
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    clearAdminStorage();
    setSession(null);
    setAdmin(null);
    setIsAdmin(false);
  }

  return {
    session,
    admin,
    isAdmin,
    isChecking,
    isLoggingIn,
    loginError,
    clearLoginError: () => setLoginError(null),
    login,
    logout,
  };
}
