import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Footer from '../components/Footer';

import Header from '../components/Header';

export default function NotFound() {
  return (
    <>
      <Header sticky={false} />
      <main className="flex flex-1 items-center justify-center bg-[#f5f5f2] px-6 py-20 sm:px-10">
      <div className="w-full max-w-[760px] border border-black/10 bg-white px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-grey)]">
          Yotaabo / 404
        </p>
        <h1 className="mt-5 font-heading text-8xl font-medium leading-none tracking-[-0.05em] text-black sm:text-9xl">
          404
        </h1>
        <h2 className="mt-5 font-heading text-3xl font-medium text-black sm:text-4xl">
          This page isn't here.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-[1.9] text-[#555550]">
          The page may have moved, or the address may be incorrect. Let's get
          you back to the fragrance collection.
        </p>
        <Link
          to="/"
          className="mx-auto mt-8 inline-flex min-h-12 items-center justify-center gap-3 border border-black bg-black px-6 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black"
        >
          <FiArrowLeft size={15} aria-hidden="true" />
          Return home
        </Link>
      </div>
    <Footer />
    </main>
    </>
  );
}
