import type { ReactNode } from 'react';

type OrderItemCardProps = {
  name: string;
  status: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
  onClick?: () => void;
};

export default function OrderItemCard({
  name,
  status,
  leftContent,
  rightContent,
  onClick,
}: OrderItemCardProps) {
  const content = (
    <>
      {/* Subtotal box on the left */}
      <div className="flex h-24 w-24 shrink-0 items-center justify-center border-r border-[#4d4d4d]/10 bg-gray-300 p-2 sm:h-28 sm:w-28 sm:p-3">
        <p className="m-0 text-center admin-type-card-title text-[#4d4d4d] sm:text-lg">
          {rightContent}
        </p>
      </div>

      {/* Order details on the right */}
      <div className="flex min-w-0 flex-1 flex-col justify-center bg-[#f5f5f5] p-3 text-left sm:p-4">
        <div className="flex w-full min-w-0 items-center justify-between gap-3">
          <p className="m-0 min-w-0 truncate p-0 admin-type-card-title text-[#4d4d4d] sm:text-base">
            {name}
          </p>
          <span className="shrink-0 admin-type-micro lowercase text-[#4d4d4d]/60 sm:text-sm">
            {status}
          </span>
        </div>

        <div className="mt-1 flex w-full min-w-0 items-center justify-between gap-2 sm:gap-3">
          <div className="w-full min-w-0 admin-type-micro font-semibold text-[#4d4d4d]/45">
            {leftContent}
          </div>
        </div>
      </div>
    </>
  );

  const className =
    'm-0 flex w-full items-stretch overflow-hidden border border-[#4d4d4d]/10 bg-white text-left leading-normal transition-colors hover:bg-[#fafafa]';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`View order from ${name}`}
        className={className}
      >
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
