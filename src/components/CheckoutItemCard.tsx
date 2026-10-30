import type { ReactNode } from 'react';

type CheckoutItemCardProps = {
  name: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
  onClick?: () => void;
};

export default function CheckoutItemCard({
  name,
  leftContent,
  rightContent,
  onClick,
}: CheckoutItemCardProps) {
  const content = (
    <>
      <p className="m-0 p-0 font-heading text-base leading-normal text-[#4d4d4d]">
        {name}
      </p>

      <div className="m-0 flex items-center justify-between gap-4 p-0 leading-normal">
        <p className="m-0 p-0 text-base leading-normal text-[#4d4d4d]/60">
          {leftContent}
        </p>

        <p className="m-0 shrink-0 whitespace-nowrap p-0 text-right font-heading text-base leading-normal tabular-nums text-[#4d4d4d]/60">
          {rightContent}
        </p>
      </div>
    </>
  );

  const className =
    "m-0 flex w-full flex-col gap-1 border-b border-[#4d4d4d]/20 bg-[#fafaf9] px-4 py-3 text-left leading-normal transition-colors hover:bg-[#f5f5f5]";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`View ${name} details`}
        className={className}
      >
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
