import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase puts the session in the URL after password reset.
    // We need to detect that the user is authenticated via the recovery link.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsReady(true);
      } else {
        toast.error('Invalid or expired reset link');
        navigate('/admin');
      }
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setIsSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated. Please sign in again.');
      await supabase.auth.signOut();
      navigate('/admin');
    }
  }

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-[#4d4d4d]/60">Verifying reset link...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="relative mt-8 flex w-full items-center justify-center">
          <div className="w-full">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: '12vh' }}
            >
              <text
                x="50"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                textLength="100"
                lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: '"Anton", sans-serif', fontWeight: 400 }}
                className="fill-[#8aa89b]"
                fontSize="100"
              >
                yotaabo
              </text>
            </svg>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-14 flex flex-col gap-4">
          <p className="text-center text-sm text-[#4d4d4d]/70">
            Choose a new password for your account.
          </p>

          <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f5] px-4 py-3.5">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full border-0 bg-transparent text-sm text-black outline-none ring-0 focus:outline-none focus:ring-0 placeholder:text-[#4d4d4d]/50"
            />
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f5] px-4 py-3.5">
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border-0 bg-transparent text-sm text-black outline-none ring-0 focus:outline-none focus:ring-0 placeholder:text-[#4d4d4d]/50"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-4 flex h-14 w-full items-center justify-center rounded-lg border-0 bg-[#8aa89b] text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 outline-none"
          >
            {isSaving ? 'Saving...' : 'Update Password'}
          </button>
        </form>
      </div>
    </main>
  );
}
