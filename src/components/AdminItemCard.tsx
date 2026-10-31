import type * as React from 'react';

type AdminItemCardProps = {
  title: string;
  status: string;
  price: string;
  meta: string;
  onClick: () => void;
  ariaLabel: string;
  layout?: 'default' | 'product';
  leftContent?: React.ReactNode;
  leftClassName?: string;
  statusClassName?: string;
  className?: string;
};

export default function AdminItemCard({
  title,
  status,
  price,
  meta,
  onClick,
  layout = 'default',
  ariaLabel,
  leftContent,
  leftClassName = 'bg-[#f5f5f5]',
  statusClassName = 'text-[#4d4d4d]/40',
  className = '',
}: AdminItemCardProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`admin-item-card flex cursor-pointer items-stretch overflow-hidden admin-font-body ${className}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className={`admin-item-card-media relative shrink-0 overflow-hidden ${leftClassName}`}>
        {leftContent}
      </div>

      <div className="admin-item-card-content flex min-w-0 flex-1 flex-col justify-center">
        {layout === 'product' ? (
          <div className="admin-item-card-copy">
            <div className="admin-item-card-row">
              <p className="admin-type-card-title admin-color-primary admin-item-card-title">
                {title}
              </p>
              <p className="admin-type-card-title admin-color-primary admin-type-price admin-item-card-price">
                {price}
              </p>
            </div>

            <div className="admin-item-card-row admin-item-card-secondary-row">
              <span className={`admin-type-micro admin-item-card-status ${statusClassName}`}>
                {status}
              </span>
              <p className="admin-type-micro admin-color-muted admin-item-card-meta">
                {meta}
              </p>
            </div>
          </div>
        ) : (
          <div className="admin-item-card-copy">
            <div className="admin-item-card-row">
              <p className="admin-type-card-title admin-color-primary admin-item-card-title">
                {title}
              </p>
              <span className={`admin-type-micro admin-item-card-status ${statusClassName}`}>
                {status}
              </span>
            </div>

            <div className="admin-item-card-row admin-item-card-secondary-row">
              <p className="admin-type-price admin-color-disabled admin-item-card-price">
                {price}
              </p>
              <p className="admin-type-micro admin-color-muted admin-item-card-meta">
                {meta}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
