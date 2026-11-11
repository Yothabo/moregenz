import { FiAlertCircle, FiCheck, FiClock, FiPlus } from 'react-icons/fi';
import AccentButton from './AccentButton';
import type { StoreRequest, StoreRequestStatus } from '../settings/categories/types';

type RequestPanelProps = {
  requests: StoreRequest[];
  onNewRequest: () => void;
  storeLabel: string;
};

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'recently';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });
}

const STATUS_META: Record<StoreRequestStatus, { label: string; color: string; bg: string }> = {
  open: {
    label: 'Open',
    color: 'var(--admin-status-amber)',
    bg: 'color-mix(in srgb, var(--admin-status-amber) 15%, transparent)',
  },
  in_progress: {
    label: 'In progress',
    color: 'var(--admin-accent)',
    bg: 'color-mix(in srgb, var(--admin-accent) 15%, transparent)',
  },
  resolved: {
    label: 'Resolved',
    color: 'var(--admin-status-green)',
    bg: 'color-mix(in srgb, var(--admin-status-green) 15%, transparent)',
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  bug: 'Bug report',
  feature: 'Feature request',
  content: 'Content change',
  other: 'Other',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export default function RequestPanel({
  requests,
  onNewRequest,
  storeLabel,
}: RequestPanelProps) {
  const isEmpty = requests.length === 0;
  const openCount = requests.filter((r) => r.status !== 'resolved').length;

  return (
    <section
      className="flex w-full flex-col admin-card-bg overflow-hidden"
      style={{
        borderRadius: 'var(--ds-radius-lg)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--admin-border-strong)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: 'var(--admin-space-md)',
          borderBottom: '1px solid var(--admin-border-subtle)',
          gap: 'var(--admin-space-md)',
        }}
      >
        <div className="flex flex-col" style={{ gap: 'var(--admin-space-xxs)' }}>
          <div className="flex items-center" style={{ gap: 'var(--admin-space-xs)' }}>
            <h3
              style={{
                fontSize: 'var(--admin-size-heading-3)',
                fontWeight: 'var(--admin-weight-semibold)',
                color: 'var(--admin-text-primary)',
                margin: 0,
              }}
            >
              Store requests
            </h3>
            {openCount > 0 && (
              <span
                style={{
                  fontSize: 'var(--admin-size-micro)',
                  fontWeight: 'var(--admin-weight-semibold)',
                  color: 'var(--admin-on-accent)',
                  backgroundColor: 'var(--admin-accent)',
                  paddingInline: 'var(--admin-space-xs)',
                  paddingBlock: '1px',
                  borderRadius: 'var(--ds-radius-full)',
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: '18px',
                  textAlign: 'center',
                }}
              >
                {openCount}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: 'var(--admin-size-micro)',
              color: 'var(--admin-text-tertiary)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Anything you need from the technical team for {storeLabel}.
          </p>
        </div>

        <AccentButton
          variant="dark"
          shape="pill"
          onClick={onNewRequest}
          ariaLabel="New request"
        >
          <FiPlus size={14} aria-hidden="true" />
          <span style={{ marginLeft: 'var(--admin-space-xs)' }}>New request</span>
        </AccentButton>
      </div>

      {/* List */}
      {isEmpty ? (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            padding: 'var(--admin-space-xl)',
            gap: 'var(--admin-space-xs)',
            textAlign: 'center',
          }}
        >
          <FiCheck
            size={20}
            style={{ color: 'var(--admin-status-green)' }}
            aria-hidden="true"
          />
          <p
            style={{
              fontSize: 'var(--admin-size-supporting)',
              fontWeight: 'var(--admin-weight-medium)',
              color: 'var(--admin-text-primary)',
              margin: 0,
            }}
          >
            No requests yet
          </p>
          <p
            style={{
              fontSize: 'var(--admin-size-micro)',
              color: 'var(--admin-text-tertiary)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Need something built or fixed? Click "New request".
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {requests.map((req, idx) => {
            const statusMeta = STATUS_META[req.status];
            return (
              <li
                key={req.id}
                style={{
                  padding: 'var(--admin-space-md)',
                  borderTop: idx > 0 ? '1px solid var(--admin-border-subtle)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--admin-space-xs)',
                }}
              >
                <div className="flex items-center justify-between" style={{ gap: 'var(--admin-space-sm)' }}>
                  <span
                    style={{
                      fontSize: 'var(--admin-size-body)',
                      fontWeight: 'var(--admin-weight-medium)',
                      color: 'var(--admin-text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {req.title}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--admin-size-micro)',
                      fontWeight: 'var(--admin-weight-medium)',
                      color: statusMeta.color,
                      backgroundColor: statusMeta.bg,
                      paddingInline: 'var(--admin-space-xs)',
                      paddingBlock: '1px',
                      borderRadius: 'var(--ds-radius-full)',
                      flexShrink: 0,
                    }}
                  >
                    {statusMeta.label}
                  </span>
                </div>

                <div className="flex items-center flex-wrap" style={{ gap: 'var(--admin-space-xs)' }}>
                  <span
                    style={{
                      fontSize: 'var(--admin-size-micro)',
                      fontWeight: 'var(--admin-weight-medium)',
                      color: 'var(--admin-text-secondary)',
                      backgroundColor: 'var(--admin-surface-subtle)',
                      paddingInline: 'var(--admin-space-xs)',
                      paddingBlock: '1px',
                      borderRadius: 'var(--ds-radius-sm)',
                    }}
                  >
                    {CATEGORY_LABELS[req.category] ?? req.category}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--admin-size-micro)',
                      color: 'var(--admin-text-tertiary)',
                    }}
                  >
                    · Priority: {PRIORITY_LABELS[req.priority] ?? req.priority}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 'var(--admin-size-caption)',
                    color: 'var(--admin-text-secondary)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {req.description}
                </p>

                <span
                  style={{
                    fontSize: 'var(--admin-size-micro)',
                    color: 'var(--admin-text-tertiary)',
                  }}
                >
                  Submitted {formatRelativeDate(req.created_at)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
