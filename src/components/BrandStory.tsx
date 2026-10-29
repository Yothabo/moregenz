import { Link } from 'react-router-dom';

export default function BrandStory() {
  return (
    <section
      id="about"
      className="border-b border-black/10 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1120px] gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
        <div>
          <h2 className="max-w-md font-heading text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-black sm:text-5xl lg:text-6xl">
            A scent should feel like you.
          </h2>
        </div>

        <div className="flex flex-col justify-center">
          <p className="max-w-2xl text-sm leading-[1.95] text-[#555550] sm:text-base">
            Fragrance is more than something you wear. It can express a mood,
            complete a personal style, and become part of the way people
            remember you.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-[1.95] text-[#555550] sm:text-base">
            Yotaabo is built around that personal connection: finding scents
            that feel considered, distinctive, and right for the moment.
          </p>
          <Link
            to="/about"
            className="group mt-8 inline-flex w-fit items-center gap-5 border-b border-black pb-2 text-xs font-semibold text-black transition-colors hover:border-[var(--color-grey)] hover:text-[var(--color-grey)]"
          >
            Discover our story
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
