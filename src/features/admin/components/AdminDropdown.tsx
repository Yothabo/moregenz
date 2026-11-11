import { useState, useEffect, useRef } from 'react';

type Option = {
  value: string;
  label: string;
};

type AdminDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  compact?: boolean;
  placeholder?: string;
  menuWidth?: string;
  align?: 'left' | 'right';
};

export default function AdminDropdown({
  value,
  onChange,
  options,
  compact = false,
  placeholder = 'Select...',
  menuWidth = '100%',
  align = 'left',
}: AdminDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="admin-type-body"
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
          margin: 0,
          textDecoration: 'none',
          cursor: 'pointer',
          outline: 'none',
          boxSizing: 'border-box',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'left',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--admin-border-subtle)',
          borderRadius: 'var(--ds-radius-lg)',
          backgroundColor: 'var(--admin-surface-subtle)',
          color: 'var(--admin-text-primary)',
          padding: compact ? '6px 12px' : '12px 16px',
        }}
      >
        <span
          style={{
            color: selected ? 'var(--admin-text-primary)' : 'var(--admin-text-tertiary)',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {selected ? selected.label : placeholder}
        </span>
        <svg
          style={{
            marginLeft: '8px',
            width: '16px',
            height: '16px',
            flexShrink: 0,
            color: 'var(--admin-text-tertiary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 200ms ease',
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            [align === 'right' ? 'right' : 'left']: 0,
            top: '100%',
            width: menuWidth,
            marginTop: '4px',
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
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="admin-type-body"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                margin: 0,
                textDecoration: 'none',
                cursor: 'pointer',
                outline: 'none',
                boxSizing: 'border-box',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                padding: '10px 16px',
                border: 'none',
                background: 'transparent',
                color: 'var(--admin-text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--admin-surface-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{option.label}</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border:
                    option.value === value
                      ? '5px solid var(--admin-accent)'
                      : '1.5px solid var(--admin-border-strong)',
                  flexShrink: 0,
                  transition: 'all 200ms ease',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
