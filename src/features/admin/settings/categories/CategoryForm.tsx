import { useEffect, useState } from 'react';
import { FiPlus, FiX, FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import Modal from '../../../../components/Modal';
import AccentButton from '../../components/AccentButton';
import AdminDropdown from '../../components/AdminDropdown';
import type { Category, Editor, Subcategory } from './types';

type NewSubcategory = { tempId: string; name: string };
type ExistingSubcategory = { tempId: string; id: string; name: string; originalName: string; isActive: boolean; originalIsActive: boolean; markedForDeletion: boolean };

type CategoryFormProps = {
  editor: Editor;
  category?: Category | null;
  totalPositions: number;
  initialSortOrder: number;
  isSaving: boolean;
  onSubmit: (data: {
    name: string;
    sort_order: number;
    note: string;
    newSubcategories: NewSubcategory[];
    existingSubcategories: ExistingSubcategory[];
  }) => Promise<void>;
  onCancel: () => void;
};

const INPUT_STYLE = {
  width: '100%',
  paddingInline: 'var(--admin-space-sm)',
  paddingBlock: 'var(--admin-space-xs)',
  borderRadius: 'var(--ds-radius-lg)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'var(--admin-border-strong)',
  backgroundColor: 'var(--admin-surface-subtle)',
  color: 'var(--admin-text-primary)',
  fontSize: 'var(--admin-size-body)',
  outline: 'none',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',
} as const;

const LABEL_STYLE = {
  fontSize: 'var(--admin-size-micro)',
  fontWeight: 'var(--admin-weight-medium)',
  color: 'var(--admin-text-secondary)',
  display: 'block',
  marginBottom: 'var(--admin-space-xxs)',
} as const;

export default function CategoryForm({
  editor,
  category,
  totalPositions,
  initialSortOrder,
  isSaving,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const isNew = editor.kind === 'new-category';
  const isSubcategoryEditor = editor.kind === 'new-subcategory' || editor.kind === 'edit-subcategory';

  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [sortOrder, setSortOrder] = useState(editor.kind === 'new-category' ? '' : String(initialSortOrder));
  const [newSubcategories, setNewSubcategories] = useState<NewSubcategory[]>([]);
  const [existingSubcategories, setExistingSubcategories] = useState<ExistingSubcategory[]>([]);

  // For subcategory editing — single name field only
  const [singleSubName, setSingleSubName] = useState('');

  useEffect(() => {
    if (isNew) {
      setName('');
      setNote('');
      setSortOrder('');
      setNewSubcategories([]);
      setExistingSubcategories([]);
    } else if (editor.kind === 'edit-category' && category) {
      setName(category.name);
      setNote('');
      setSortOrder(String(category.sort_order));
      setExistingSubcategories(
        category.subcategories.map((s) => ({
          tempId: s.id,
          id: s.id,
          name: s.name,
          originalName: s.name,
          isActive: s.is_active,
          originalIsActive: s.is_active,
          markedForDeletion: false,
        }))
      );
      setNewSubcategories([]);
    } else if (isSubcategoryEditor && category) {
      const editingId = editor.kind === 'edit-subcategory' ? editor.id : null;
      const existing = category.subcategories.find((s) => s.id === editingId);
      setSingleSubName(existing?.name ?? '');
    }
  }, [editor, category, initialSortOrder, isNew, isSubcategoryEditor]);

  const addSubcategoryRow = () => {
    setNewSubcategories((prev) => [...prev, { tempId: crypto.randomUUID(), name: '' }]);
  };

  const updateNewSub = (tempId: string, value: string) => {
    setNewSubcategories((prev) =>
      prev.map((s) => (s.tempId === tempId ? { ...s, name: value } : s))
    );
  };

  const removeNewSub = (tempId: string) => {
    setNewSubcategories((prev) => prev.filter((s) => s.tempId !== tempId));
  };

  const updateExistingSub = (tempId: string, value: string) => {
    setExistingSubcategories((prev) =>
      prev.map((s) => (s.tempId === tempId ? { ...s, name: value } : s))
    );
  };

  const toggleExistingSubStatus = (tempId: string) => {
    setExistingSubcategories((prev) =>
      prev.map((s) => (s.tempId === tempId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const markExistingSubForDeletion = (tempId: string) => {
    setExistingSubcategories((prev) =>
      prev.map((s) => (s.tempId === tempId ? { ...s, markedForDeletion: !s.markedForDeletion } : s))
    );
  };

  const handleSubmit = async () => {
    if (isSubcategoryEditor) {
      // single-name submit
      if (!singleSubName.trim()) return;
      await onSubmit({
        name: singleSubName.trim(),
        sort_order: initialSortOrder,
        note: '',
        newSubcategories: [],
        existingSubcategories: [],
      });
      return;
    }

    if (!name.trim()) return;

    await onSubmit({
      name: name.trim(),
      // If new category and user didn't pick an order → append at bottom
      sort_order: sortOrder ? Number(sortOrder) : totalPositions,
      note: note.trim(),
      newSubcategories: newSubcategories.filter((s) => s.name.trim()),
      existingSubcategories: existingSubcategories.map((s) => ({
        tempId: s.tempId,
        id: s.id,
        name: s.name,
        originalName: s.originalName,
        isActive: s.isActive,
        originalIsActive: s.originalIsActive,
        markedForDeletion: s.markedForDeletion,
      })),
    });
  };

  const title = isNew
    ? 'New category request'
    : editor.kind === 'edit-category'
      ? `Edit ${category?.name ?? 'category'}`
      : editor.kind === 'new-subcategory'
        ? 'New subcategory'
        : 'Edit subcategory';

  return (
    <Modal isOpen onClose={isSaving ? () => {} : onCancel} maxWidth="max-w-lg">
      <div style={{ padding: 'var(--admin-space-lg)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--admin-space-md)' }}>
          <h3 style={{ fontSize: 'var(--admin-size-heading-3)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-primary)', margin: 0 }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--admin-text-tertiary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FiX size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Current state block — only for edit-category */}
        {editor.kind === 'edit-category' && category && (
          <div
            style={{
              padding: 'var(--admin-space-sm)',
              marginBottom: 'var(--admin-space-md)',
              borderRadius: 'var(--ds-radius-lg)',
              borderWidth: '1px',
              borderStyle: 'dashed',
              borderColor: 'var(--admin-border-strong)',
              backgroundColor: 'var(--admin-surface-subtle)',
            }}
          >
            <div style={{ fontSize: 'var(--admin-size-micro)', fontWeight: 'var(--admin-weight-semibold)', color: 'var(--admin-text-secondary)', marginBottom: 'var(--admin-space-xxs)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Currently on storefront
            </div>
            <div style={{ fontSize: 'var(--admin-size-body)', color: 'var(--admin-text-primary)', fontWeight: 'var(--admin-weight-medium)' }}>
              {category.name}
            </div>
            <div style={{ fontSize: 'var(--admin-size-caption)', color: 'var(--admin-text-tertiary)', marginTop: '2px' }}>
              {category.subcategories.length} subcategor{category.subcategories.length === 1 ? 'y' : 'ies'} · Order {category.sort_order}
            </div>
          </div>
        )}

        {/* Name field (hidden for subcategory editors) */}
        {!isSubcategoryEditor && (
          <div style={{ marginBottom: 'var(--admin-space-md)' }}>
            <label style={LABEL_STYLE}>Category name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., His"
              required
              maxLength={60}
              style={INPUT_STYLE}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--admin-focus)';
                e.currentTarget.style.boxShadow = '0 0 0 2px color-mix(in srgb, var(--admin-focus) 20%, transparent)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--admin-border-strong)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        )}

        {/* Subcategory editor — single name field */}
        {isSubcategoryEditor && (
          <div style={{ marginBottom: 'var(--admin-space-md)' }}>
            <label style={LABEL_STYLE}>Subcategory name</label>
            <input
              type="text"
              value={singleSubName}
              onChange={(e) => setSingleSubName(e.target.value)}
              placeholder="e.g., Amber Oud"
              required
              maxLength={60}
              style={INPUT_STYLE}
              autoFocus
            />
          </div>
        )}

        {/* Category-level fields (not for subcategory editors) */}
        {!isSubcategoryEditor && (
          <>
            {/* Existing subcategories — only for edit-category */}
            {editor.kind === 'edit-category' && existingSubcategories.length > 0 && (
              <div style={{ marginBottom: 'var(--admin-space-md)' }}>
                <label style={LABEL_STYLE}>Existing subcategories</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
                  {existingSubcategories.map((sub) => {
                    const isMarked = sub.markedForDeletion;
                    return (
                      <div
                        key={sub.tempId}
                        style={{
                          display: 'flex',
                          gap: 'var(--admin-space-xs)',
                          alignItems: 'center',
                          opacity: isMarked ? 0.4 : 1,
                          textDecoration: isMarked ? 'line-through' : 'none',
                        }}
                      >
                        <input
                          type="text"
                          value={sub.name}
                          onChange={(e) => updateExistingSub(sub.tempId, e.target.value)}
                          disabled={isMarked}
                          style={{ ...INPUT_STYLE, flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => toggleExistingSubStatus(sub.tempId)}
                          disabled={isMarked}
                          aria-label={sub.isActive ? 'Hide subcategory' : 'Show subcategory'}
                          title={sub.isActive ? 'Visible — click to hide' : 'Hidden — click to show'}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--ds-radius-lg)',
                            border: '1px solid var(--admin-border-strong)',
                            background: 'transparent',
                            cursor: isMarked ? 'not-allowed' : 'pointer',
                            color: sub.isActive ? 'var(--admin-status-green)' : 'var(--admin-text-tertiary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {sub.isActive ? <FiEye size={14} aria-hidden="true" /> : <FiEyeOff size={14} aria-hidden="true" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => markExistingSubForDeletion(sub.tempId)}
                          aria-label={isMarked ? 'Undo delete' : 'Delete subcategory'}
                          title={isMarked ? 'Undo delete' : 'Mark for deletion'}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--ds-radius-lg)',
                            border: '1px solid var(--admin-border-strong)',
                            background: isMarked ? 'var(--admin-status-red)' : 'transparent',
                            cursor: 'pointer',
                            color: isMarked ? 'var(--admin-on-accent)' : 'var(--admin-status-red)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FiTrash2 size={14} aria-hidden="true" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <p style={{ fontSize: 'var(--admin-size-micro)', color: 'var(--admin-text-tertiary)', margin: 'var(--admin-space-xs) 0 0', lineHeight: 1.3 }}>
                  Click <FiEye size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> to toggle visibility. Click <FiTrash2 size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> to mark for deletion.
                </p>
              </div>
            )}

            {/* New subcategories */}
            {isNew && newSubcategories.length > 0 && (
              <div style={{ marginBottom: 'var(--admin-space-md)' }}>
                <label style={LABEL_STYLE}>Subcategories</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--admin-space-xs)' }}>
                  {newSubcategories.map((sub) => (
                    <div key={sub.tempId} style={{ display: 'flex', gap: 'var(--admin-space-xs)' }}>
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) => updateNewSub(sub.tempId, e.target.value)}
                        placeholder="Subcategory name"
                        style={{ ...INPUT_STYLE, flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => removeNewSub(sub.tempId)}
                        aria-label="Remove subcategory"
                        style={{ width: '36px', height: 'auto', borderRadius: 'var(--ds-radius-lg)', border: '1px solid var(--admin-border-strong)', background: 'transparent', cursor: 'pointer', color: 'var(--admin-status-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <FiX size={14} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add subcategory button */}
            {isNew && (
              <button
                type="button"
                onClick={addSubcategoryRow}
                style={{
                  width: '100%',
                  paddingBlock: 'var(--admin-space-xs)',
                  marginBottom: 'var(--admin-space-md)',
                  borderRadius: 'var(--ds-radius-lg)',
                  borderWidth: '1px',
                  borderStyle: 'dashed',
                  borderColor: 'var(--admin-border-strong)',
                  backgroundColor: 'transparent',
                  color: 'var(--admin-text-secondary)',
                  fontSize: 'var(--admin-size-caption)',
                  fontWeight: 'var(--admin-weight-medium)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--admin-space-xs)',
                }}
              >
                <FiPlus size={12} aria-hidden="true" />
                Add subcategory
              </button>
            )}

            {/* Position */}
            <div style={{ marginBottom: 'var(--admin-space-md)' }}>
              <label style={LABEL_STYLE}>Display order</label>
              <AdminDropdown
                value={sortOrder}
                onChange={setSortOrder}
                placeholder="Select display order…"
                options={Array.from({ length: totalPositions }, (_, i) => {
                  const pos = i + 1;
                  return {
                    value: String(pos),
                    label: `${pos}${pos === 1 ? ' (top)' : pos === totalPositions ? ' (bottom)' : ''}`,
                  };
                })}
                align="left"
              />
            </div>

            {/* Note to technical team */}
            <div style={{ marginBottom: 'var(--admin-space-md)' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--admin-space-xxs)' }}>
                <label style={{ ...LABEL_STYLE, marginBottom: 0 }}>Note to technical team</label>
                <span style={{ fontSize: 'var(--admin-size-micro)', color: note.length > 180 ? 'var(--admin-status-amber)' : 'var(--admin-text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
                  {note.length}/200
                </span>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={200}
                rows={2}
                placeholder="What would you like us to build on the storefront?"
                style={{ ...INPUT_STYLE, resize: 'vertical', minHeight: '60px', fontFamily: 'inherit' }}
              />
            </div>
          </>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--admin-space-xs)', marginTop: 'var(--admin-space-md)' }}>
          <AccentButton variant="neutral" shape="pill" onClick={onCancel} ariaLabel="Cancel">
            Cancel
          </AccentButton>
          <AccentButton
            variant="dark"
            shape="pill"
            onClick={() => void handleSubmit()}
            ariaLabel={isSaving ? 'Saving' : 'Request change'}
          >
            {isSaving ? 'Saving…' : 'Request change'}
          </AccentButton>
        </div>
      </div>
    </Modal>
  );
}
