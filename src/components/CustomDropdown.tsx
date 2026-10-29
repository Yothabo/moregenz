import { useState, useEffect, useRef } from 'react';

type Option = {
  value: string;
  label: string;
};

type CustomDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  compact?: boolean;
  placeholder?: string;
};

export default function CustomDropdown({
  value,
  onChange,
  options,
  compact = false,
  placeholder = 'Select...',
}: CustomDropdownProps) {
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

  const baseButtonStyle: React.CSSProperties = {
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    margin: 0,
    fontFamily: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
    color: '#4d4d4d',
  };

  const optionButtonStyle: React.CSSProperties = {
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    margin: 0,
    fontFamily: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...baseButtonStyle,
          padding: compact ? '6px 12px' : '12px 16px',
          fontSize: compact ? '12px' : '16px',
          fontWeight: compact ? 600 : 500,
          fontFamily: compact ? 'var(--font-body)' : 'var(--font-heading)',
        }}
      >
        <span style={{ color: selected ? '#4d4d4d' : 'rgba(77,77,77,0.4)' }}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          style={{
            marginLeft: '8px',
            width: '16px',
            height: '16px',
            flexShrink: 0,
            color: 'rgba(77,77,77,0.5)',
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
            left: 0,
            right: 0,
            top: '100%',
            marginTop: '4px',
            zIndex: 100,
            maxHeight: '240px',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
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
              style={{
                ...optionButtonStyle,
                padding: '10px 16px',
                fontSize: compact ? '12px' : '16px',
                fontWeight: option.value === value ? 600 : 500,
                fontFamily: compact ? 'var(--font-body)' : 'var(--font-heading)',
                color: '#4d4d4d',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{option.label}</span>
              {/* Radio button on the right */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: option.value === value ? '5px solid #8aa89b' : '1.5px solid rgba(77,77,77,0.3)',
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
