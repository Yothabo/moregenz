import Modal from './Modal';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'grey' | 'green';
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Remove',
  cancelText = 'Cancel',
  variant = 'grey',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const confirmColor = variant === 'green' ? '#8aa89b' : '#4d4d4d';

  return (
    <Modal isOpen={isOpen} onClose={onCancel} maxWidth="max-w-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#4d4d4d]">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4d4d4d]/70">{message}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex h-11 flex-1 items-center justify-center border border-[#4d4d4d]/20 bg-transparent text-xs font-semibold text-[#4d4d4d] transition-colors hover:bg-[#4d4d4d]/5"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex h-11 flex-1 items-center justify-center border border-solid text-xs font-semibold text-white transition-colors"
            style={{ backgroundColor: confirmColor, borderColor: confirmColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = confirmColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = confirmColor;
              e.currentTarget.style.color = '#fff';
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
