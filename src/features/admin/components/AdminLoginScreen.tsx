import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ForgotPasswordModal from '../../../components/ForgotPasswordModal';

const dotAnimation = `
@keyframes yotaabo-dot-size {
  0%, 100% { transform: scale(0.55); opacity: 0.55; }
  50% { transform: scale(1.5); opacity: 1; }
}
`;

type AdminLoginScreenProps = {
  email: string;
  password: string;
  loginError: string | null;
  isLoggingIn: boolean;
  isResolving: boolean;
  showAuthIndicator: boolean;
  isTransitioning: boolean;
  onTransitionComplete: () => void;
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
  isResolving,
  showAuthIndicator,
  isTransitioning,
  onTransitionComplete,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onClearLoginError,
}: AdminLoginScreenProps) {
  const isFullscreen = isResolving || isTransitioning;
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [wordmarkCentered, setWordmarkCentered] = useState(false);
  const [wordmarkPosition, setWordmarkPosition] = useState({
    top: 0,
    width: 0,
  });

  const wordmarkContainerRef = useRef<HTMLDivElement>(null);
  const wordmarkTextRef = useRef<SVGTextElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const transitionCompleteRef = useRef(onTransitionComplete);

  useLayoutEffect(() => {
    if (isFullscreen) return;

    const bounds = wordmarkContainerRef.current?.getBoundingClientRect();

    if (bounds) {
      setWordmarkPosition({
        top: bounds.top,
        width: bounds.width,
      });
    }
  }, [isFullscreen]);

  useEffect(() => {
    transitionCompleteRef.current = onTransitionComplete;
  }, [onTransitionComplete]);

  useEffect(() => {
    if (!isTransitioning) {
      setWordmarkCentered(isResolving);
      return;
    }

    const text = wordmarkTextRef.current;
    const displacement = displacementRef.current;

    if (!text || !displacement) return;

    const wordmarkText = text;
    const displacementMap = displacement;

    let disposed = false;
    let frame = 0;
    let centerFrame = 0;
    let startedAt = 0;

    const HOLD_DURATION = 900;
    const DESTRUCTION_DURATION = 1500;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const easeInOut = (value: number) =>
      value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;

    centerFrame = requestAnimationFrame(() => {
      setWordmarkCentered(true);
    });

    async function startAnimation() {
      try {
        await document.fonts.load('400 100px Anton');
        await document.fonts.ready;
      } catch {
        // Continue with the available font.
      }

      if (disposed) return;

      wordmarkText.style.opacity = '1';
      displacementMap.setAttribute('scale', '0');

      function animate(time: number) {
        if (disposed) return;

        if (!startedAt) startedAt = time;

        const elapsed = time - startedAt;

        if (elapsed < HOLD_DURATION) {
          wordmarkText.style.opacity = '1';
          displacementMap.setAttribute('scale', '0');
        } else {
          const progress = clamp(
            (elapsed - HOLD_DURATION) / DESTRUCTION_DURATION,
            0,
            1,
          );

          const eased = easeInOut(progress);

          displacementMap.setAttribute(
            'scale',
            String(180 * eased),
          );

          wordmarkText.style.opacity = String(1 - eased);

          if (progress >= 1) {
            wordmarkText.style.opacity = '0';
            transitionCompleteRef.current();
            return;
          }
        }

        frame = requestAnimationFrame(animate);
      }

      frame = requestAnimationFrame(animate);
    }

    void startAnimation();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(centerFrame);
    };
  }, [isTransitioning, isResolving]);

  return (
    <main
      className={
        isFullscreen
          ? 'fixed inset-0 m-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-white p-0'
          : 'flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12'
      }
    >
      <div
        ref={wordmarkContainerRef}
        className={
          isFullscreen
            ? 'absolute left-1/2 z-10'
            : 'relative w-full max-w-[1120px]'
        }
        style={
          isFullscreen
            ? {
                top: isTransitioning && !wordmarkCentered
                  ? `${wordmarkPosition.top}px`
                  : '37.5vh',
                width: isTransitioning && wordmarkPosition.width
                  ? `${wordmarkPosition.width}px`
                  : 'min(calc(100vw - 48px), 1120px)',
                maxWidth: '1120px',
                transform: 'translateX(-50%)',
                transition: isTransitioning
                  ? 'top 700ms cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
              }
            : undefined
        }
      >
        <div className="relative flex w-full items-center justify-center">
          {showAuthIndicator && (
            <>
              <style>{dotAnimation}</style>
              <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[calc(50%-10rem)] z-20 flex -translate-x-1/2 items-center gap-2"
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-[#8aa89b]"
                  style={{
                    animation: 'yotaabo-dot-size 900ms ease-in-out infinite',
                    animationDelay: `${dot * 180}ms`,
                  }}
                />
              ))}
              </div>
            </>
          )}
          <div className="w-full">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                display: 'block',
                width: '100%',
                height: '25vh',
              }}
            >
              <defs>
                <filter
                  id="wordmark-destruction"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                  colorInterpolationFilters="sRGB"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.08"
                    numOctaves="2"
                    seed="8"
                    result="noise"
                  />
                  <feDisplacementMap
                    ref={displacementRef}
                    in="SourceGraphic"
                    in2="noise"
                    scale="0"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>

              <text
                ref={wordmarkTextRef}
                x="50"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                textLength="100"
                lengthAdjust="spacingAndGlyphs"
                style={{
                  fontFamily: '"Anton", sans-serif',
                  fontWeight: 400,
                  filter: 'url(#wordmark-destruction)',
                  opacity: 1,
                }}
                fill="#8aa89b"
                fontSize="100"
              >
                yotaabo
              </text>
            </svg>
          </div>

          {!isFullscreen && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <p className="font-accent text-[clamp(50px,10vw,130px)] tracking-[0.02em] text-[#4d4d4d]">
                Be Remembered
              </p>
            </div>
          )}
        </div>
      </div>

      {!isFullscreen && (
        <>
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
        </>
      )}

      {isTransitioning && (
        <span className="sr-only">Opening Yotaabo admin</span>
      )}
    </main>
  );
}
