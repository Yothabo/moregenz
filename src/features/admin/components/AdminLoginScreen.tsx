import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ForgotPasswordModal from '../../../components/ForgotPasswordModal';

type AdminLoginScreenProps = {
  email: string;
  password: string;
  loginError: string | null;
  isLoggingIn: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: (event: FormEvent<HTMLFormElement>) => void;
  onClearLoginError: () => void;
};

export default function AdminLoginScreen({
  email,
  password,
  loginError,
  isLoggingIn,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onClearLoginError,
}: AdminLoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[1120px]">
        <div className="relative flex w-full items-center justify-center">
          <div className="w-full">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ display: 'block', width: '100%', height: '25vh' }}
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

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <p className="font-accent text-[clamp(50px,10vw,130px)] tracking-[0.02em] text-[#4d4d4d]">
              Be Remembered
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 w-full max-w-sm">
        <form onSubmit={onLogin} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f5] px-4 py-3.5">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="Email address"
              className="w-full border-0 bg-transparent text-sm font-medium text-black outline-none ring-0 placeholder:text-[#4d4d4d]/50 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-black/10 bg-[#f5f5f5] px-4 py-3.5">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              placeholder="Password"
              className="w-full border-0 bg-transparent text-sm font-medium text-black outline-none ring-0 placeholder:text-[#4d4d4d]/50 focus:outline-none focus:ring-0"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 text-[#4d4d4d]/50 outline-none transition-colors hover:text-[#4d4d4d]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setIsForgotMode(true)}
              className="border-0 bg-transparent p-0 text-sm text-[#4d4d4d]/60 hover:text-[#4d4d4d]"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="mt-4 flex h-12 w-full items-center justify-between border border-solid border-[#4d4d4d] bg-[#4d4d4d] px-5 text-xs font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-transparent hover:text-[#4d4d4d] disabled:opacity-50"
          >
            <span>{isLoggingIn ? 'Signing in...' : 'Sign In'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[#4d4d4d]/40">
          <Link to="/" className="hover:text-[#4d4d4d]">
            ← Back to site
          </Link>
        </p>
      </div>

      <ForgotPasswordModal
        isOpen={isForgotMode}
        onClose={() => setIsForgotMode(false)}
        initialEmail={email}
      />

      {loginError && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/40 p-4 backdrop-blur-sm"
          onClick={onClearLoginError}
        >
          <div
            className="relative w-full max-w-sm bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="font-heading text-2xl italic text-[#4d4d4d]">
              Login Failed
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4d4d4d]/70">
              {loginError}
            </p>
            <button
              type="button"
              onClick={onClearLoginError}
              className="mt-6 flex h-11 w-full items-center justify-center border border-solid border-[#4d4d4d] bg-[#4d4d4d] text-xs font-semibold text-white hover:bg-transparent hover:text-[#4d4d4d]"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
