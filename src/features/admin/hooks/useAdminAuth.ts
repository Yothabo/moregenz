import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../../../utils/supabase';
import { ADMIN_STORAGE_KEYS } from '../constants/admin.constants';

type UseAdminAuthResult = {
  session: Session | null;
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
        setIsAdmin(false);
        setIsChecking(false);
        return;
      }

      for (let attempt = 0; attempt < 3; attempt++) {
        const { data, error } = await supabase
          .from('admins')
          .select('id')
          .eq('id', currentSession.user.id)
          .maybeSingle();

        if (!active) return;

        if (data) {
          setIsAdmin(true);
          setIsChecking(false);
          return;
        }

        if (error) {
          if (attempt < 2) {
            await new Promise((resolve) =>
              window.setTimeout(resolve, 300 * (attempt + 1))
            );
            continue;
          }
        } else {
          clearAdminStorage();
          setIsAdmin(false);
          setIsChecking(false);
          return;
        }
      }

      if (active) {
        clearAdminStorage();
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
    setIsAdmin(false);
  }

  return {
    session,
    isAdmin,
    isChecking,
    isLoggingIn,
    loginError,
    clearLoginError: () => setLoginError(null),
    login,
    logout,
  };
}
