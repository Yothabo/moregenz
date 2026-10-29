import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 -mb-px bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1120px] p-7 sm:p-10 lg:p-14">

        {/* 1. Heading stands alone */}
        <h2 className="max-w-2xl font-heading text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-black sm:text-5xl lg:text-6xl">
          Find the scent that feels like you.
        </h2>

        {/* 2. Paragraph and Button are in a flex row together */}
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
          <p className="max-w-xl text-sm leading-[1.9] text-[#555550]">
            Explore the collection and discover a fragrance direction that
            fits your mood, your style, and your everyday.
          </p>

          <Link
            to="/services"
            className="inline-flex shrink-0 min-h-12 items-center justify-between gap-8 border border-black bg-black px-5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black md:mt-1 md:min-w-[200px]"
          >
            Explore fragrances
            <FiArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}
