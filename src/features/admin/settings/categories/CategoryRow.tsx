import { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiEye, FiEyeOff } from 'react-icons/fi';
import AccentButton from '../../components/AccentButton';
import { getCategoryTheme } from '../../../../utils/categoryTheme';
import type { Category } from './types';
import { CARD_CHROME } from '../../components/shared/cardChrome';
import AdminConfirmModal from '../../components/AdminConfirmModal';

type CategoryRowProps = {
  category: Category;
  onChangeStatus: (kind: 'category' | 'subcategory', id: string, isActive: boolean, categoryId?: string) => Promise<void>;
  onEditCategory: (c: Category) => void;

  onMoveToPosition: (category: Category, position: number) => Promise<void>;
  groupPosition: number;
  groupSize: number;
};

const ICON_BTN_STYLE = {
  width: '32px',
  height: '32px',
  minWidth: '32px',
  padding: 0,
} as const;

const CATEGORY_GRID = 'minmax(0, 1fr) auto';
const SUBCATEGORY_GRID = 'minmax(0, 1fr) auto';

const ROW_STYLE = {
  display: 'grid',
  alignItems: 'center',
  padding: 'var(--admin-space-sm) var(--admin-space-md)',
  gap: 'var(--admin-space-sm)',
} as const;

export default function CategoryRow({
  category,
  onChangeStatus,
  onEditCategory,
  onMoveToPosition,
  groupPosition,
  groupSize,
}: CategoryRowProps) {
  const categoryTheme = getCategoryTheme(category.name);
  const sortCircleColor = categoryTheme?.hexColor ?? 'var(--admin-accent)';

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<
    | { kind: 'category'; name: string; isActive: boolean; subcategoryCount: number }
    | { kind: 'subcategory'; id: string; categoryId: string; name: string; isActive: boolean }
    | null
  >(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSortOpen) return;
    const mouseHandler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSortOpen(false);
    };
    document.addEventListener('mousedown', mouseHandler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', mouseHandler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isSortOpen]);



  return (
    <div
      className="admin-card-bg overflow-hidden"
      style={{
        ...CARD_CHROME,
        opacity: category.is_active ? 1 : 0.5,
        transition: 'opacity 200ms ease',
      }}
    >
      <div
        className="admin-category-header border-b border-[var(--admin-border-subtle)]"
        style={{
          ...ROW_STYLE,
          gridTemplateColumns: CATEGORY_GRID,
        }}
      >
        <div className="flex items-center" style={{ gap: 'var(--admin-space-sm)', minWidth: 0 }}>
          <span
            style={{
              fontSize: 'var(--admin-size-body)',
              fontWeight: 'var(--admin-weight-medium)',
              color: 'var(--admin-text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textDecoration: category.is_active ? 'none' : 'line-through',
            }}
          >
            {category.name}
          </span>
        </div>

        <div className="flex items-center justify-end" style={{ gap: 'var(--admin-space-xs)' }}>
          {/* Sort button — circular with orange position number */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen((v) => !v)}
              aria-label={`Change position of ${category.name}`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--admin-border-strong)',
                backgroundColor: 'var(--admin-surface)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <span
                style={{
                  fontSize: 'var(--admin-size-caption)',
                  fontWeight: 'var(--admin-weight-semibold)',
                  fontVariantNumeric: 'tabular-nums',
                  color: 'var(--admin-text-primary)',
                  lineHeight: 1,
                }}
              >
                {groupPosition}
              </span>
            </button>

            {isSortOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  right: 0,
                  width: '180px',
                  zIndex: 100,
                  maxHeight: '240px',
                  overflowY: 'auto',
                  backgroundColor: 'var(--admin-surface)',
                  boxShadow: 'var(--admin-shadow)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'var(--admin-border-subtle)',
                  borderRadius: 'var(--ds-radius-lg)',
                }}
              >
                <div
                  style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid var(--admin-border-subtle)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'var(--admin-size-micro)',
                      fontWeight: 'var(--admin-weight-semibold)',
                      color: 'var(--admin-text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    Sorting
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--admin-size-micro)',
                      color: 'var(--admin-text-tertiary)',
                      lineHeight: 1.3,
                      marginTop: '2px',
                    }}
                  >
                    Determines how this section is positioned on the storefront.
                  </div>
                </div>
                {Array.from({ length: groupSize }, (_, i) => {
                  const position = i + 1;
                  const isCurrent = position === groupPosition;
                  return (
                    <button
                      key={position}
                      type="button"
                      onClick={() => {
                        setIsSortOpen(false);
                        if (!isCurrent) void onMoveToPosition(category, position);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--admin-space-sm)',
                        padding: '8px 12px',
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--admin-text-primary)',
                        fontSize: 'var(--admin-size-caption)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--admin-surface-subtle)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <span>{position}</span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          border: isCurrent
                            ? `4px solid ${sortCircleColor}`
                            : '1.5px solid var(--admin-border-strong)',
                          flexShrink: 0,
                          transition: 'border 200ms ease',
                          boxSizing: 'border-box',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <AccentButton
            variant="neutral"
            shape="circle"
            onClick={() => onEditCategory(category)}
            ariaLabel={`Edit ${category.name}`}
            style={ICON_BTN_STYLE}
          >
            <FiEdit2 size={14} aria-hidden="true" />
          </AccentButton>
          <AccentButton
            variant="neutral"
            shape="circle"
            onClick={() =>
              setPendingToggle({
                kind: 'category',
                name: category.name,
                isActive: category.is_active,
                subcategoryCount: category.subcategories.length,
              })
            }
            ariaLabel={`${category.is_active ? 'Hide' : 'Show'} ${category.name}`}
            style={ICON_BTN_STYLE}
          >
            {category.is_active ? <FiEyeOff size={14} aria-hidden="true" /> : <FiEye size={14} aria-hidden="true" />}
          </AccentButton>
        </div>
      </div>


      {category.subcategories.length > 0 && (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {category.subcategories.map((sub, index) => {
            return (
              <li
                key={sub.id}
                style={{
                  borderTop:
                    index > 0
                      ? '1px solid var(--admin-border-subtle)'
                      : 'none',
                }}
              >
                <div style={{ ...ROW_STYLE, gridTemplateColumns: SUBCATEGORY_GRID }}>
                  <span
                    style={{
                      fontSize: 'var(--admin-size-body)',
                      color: 'var(--admin-text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      paddingLeft: 'var(--admin-space-md)',
                    }}
                  >
                    {sub.name}
                  </span>

                  <div className="flex items-center" style={{ gap: 'var(--admin-space-xs)' }}>
                  </div>

                </div>

              </li>
            );
          })}
        </ul>
      )}




      {/* Confirmation modal for hide/show */}
      <AdminConfirmModal
        isOpen={pendingToggle !== null}
        title={
          pendingToggle?.isActive
            ? `Hide ${pendingToggle.kind === 'category' ? 'category' : 'subcategory'}?`
            : `Show ${pendingToggle?.kind === 'category' ? 'category' : 'subcategory'}?`
        }
        message={
          pendingToggle
            ? pendingToggle.isActive
              ? pendingToggle.kind === 'category'
                ? `"${pendingToggle.name}" and its ${pendingToggle.subcategoryCount} subcategor${pendingToggle.subcategoryCount === 1 ? 'y' : 'ies'} will be hidden from the storefront. You can show it again at any time.`
                : `"${pendingToggle.name}" will be hidden from the storefront. You can show it again at any time.`
              : pendingToggle.kind === 'category'
                ? `"${pendingToggle.name}" and its subcategories will be visible on the storefront again.`
                : `"${pendingToggle.name}" will be visible on the storefront again.`
            : ''
        }
        confirmText={pendingToggle?.isActive ? 'Hide' : 'Show'}
        cancelText="Cancel"
        variant="grey"
        onConfirm={() => {
          if (!pendingToggle) return;
          if (pendingToggle.kind === 'category') {
            void onChangeStatus('category', category.id, pendingToggle.isActive);
          } else {
            void onChangeStatus('subcategory', pendingToggle.id, pendingToggle.isActive, pendingToggle.categoryId);
          }
          setPendingToggle(null);
        }}
        onCancel={() => setPendingToggle(null)}
      />
    </div>
  );
}
