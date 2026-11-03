import { useMemo, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import CustomDropdown from '../../../components/CustomDropdown';
import type { AdminActivity } from '../hooks/useAdminActivity';

type ActivityPeriod = 'day' | 'month' | 'year';

type AdminActivitiesProps = {
  activities: AdminActivity[];
  isLoadingActivities: boolean;
};

function getActivityDescription(activity: AdminActivity) {
  const metadata = activity.metadata ?? {};

  const productName =
    typeof metadata.product_name === 'string'
      ? metadata.product_name.trim()
      : '';

  const rawOrderNumber =
    typeof metadata.order_number === 'string'
      ? metadata.order_number.trim()
      : '';

  const orderNumber = rawOrderNumber.replace(/^#+/, '');

  return activity.event_type === 'product.created' && productName
    ? `${productName} added`
    : activity.event_type === 'order.received' && orderNumber
      ? `Order #${orderNumber} received`
      : activity.description.replace(/^(Order)\s*#+/i, '$1 #');
}

function getDateKey(date: Date, period: ActivityPeriod) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (period === 'year') return String(year);
  if (period === 'month') return `${year}-${month}`;
  return `${year}-${month}-${day}`;
}

function getGroupLabel(key: string, period: ActivityPeriod) {
  if (period === 'year') return key;

  if (period === 'month') {
    const [year, month] = key.split('-').map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString('en-ZA', {
      month: 'long',
      year: 'numeric',
    });
  }

  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function escapeCsvCell(value: unknown) {
  let text = String(value ?? '');

  if (/^[\s]*[=+\-@]/.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

export default function AdminActivities({
  activities,
  isLoadingActivities,
}: AdminActivitiesProps) {
  const [period, setPeriod] = useState<ActivityPeriod>('day');

  const groups = useMemo(() => {
    const grouped = new Map<string, AdminActivity[]>();

    [...activities]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
      .forEach((activity) => {
        const date = new Date(activity.created_at);
        if (Number.isNaN(date.getTime())) return;

        const key = getDateKey(date, period);
        const group = grouped.get(key) ?? [];
        group.push(activity);
        grouped.set(key, group);
      });

    return [...grouped.entries()];
  }, [activities, period]);

  const handleExport = () => {
    const rows = [
      ['Description', 'Event type', 'Entity type', 'Actor email', 'Date and time', 'Activity ID'],
      ...groups.flatMap(([, group]) =>
        group.map((activity) => [
          getActivityDescription(activity),
          activity.event_type,
          activity.entity_type,
          activity.actor_email ?? '',
          activity.created_at,
          activity.id,
        ])
      ),
    ];

    const csv = rows
      .map((row) => row.map(escapeCsvCell).join(','))
      .join('\r\n');

    const blob = new Blob(['\uFEFF', csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yotaabo-activities-${period}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-full">
      <div className="admin-section-header">
        <h1 className="admin-section-header-title admin-type-page-title text-[#4d4d4d]">
          Recent Activities
        </h1>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleExport}
            disabled={activities.length === 0}
            className="inline-flex shrink-0 items-center gap-2 border border-[#4d4d4d] bg-[#4d4d4d] px-3 py-2 text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-transparent hover:text-[#4d4d4d] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiDownload size={15} />
            Export
          </button>
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#4d4d4d]/65">
            Filter
          </span>

          <div className="w-32">
            <CustomDropdown
              value={period}
              onChange={(value) => setPeriod(value as ActivityPeriod)}
              options={[
                { value: 'day', label: 'Day' },
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' },
              ]}
              compact
              menuWidth="144px"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[896px]">
        {isLoadingActivities && activities.length === 0 ? (
          <p className="px-4 py-8 text-sm text-[#4d4d4d]/50">
            Loading activities...
          </p>
        ) : groups.length === 0 ? (
          <p className="px-4 py-8 text-sm text-[#4d4d4d]/50">
            No activities found.
          </p>
        ) : (
          <div className="space-y-7">
            {groups.map(([key, group]) => (
              <section key={key}>
                <h2 className="sticky top-[61px] z-20 mb-3 bg-white py-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#4d4d4d]">
                  {getGroupLabel(key, period)}
                </h2>

                <div className="space-y-2">
                  {group.map((activity) => (
                    <article
                      key={activity.id}
                      className="flex items-center justify-between gap-3 rounded-[5px] border border-[#4d4d4d]/[0.10] bg-[#f5f5f5] px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.035)]"
                    >
                      <p className="min-w-0 text-sm leading-relaxed text-[#4d4d4d]/45">
                        {getActivityDescription(activity)}
                      </p>

                      <time
                        dateTime={activity.created_at}
                        className="shrink-0 whitespace-nowrap text-right text-xs text-[#4d4d4d]/45"
                      >
                        {new Date(activity.created_at).toLocaleString('en-ZA', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
