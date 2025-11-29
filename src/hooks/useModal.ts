import { useState, useCallback } from 'react';

export type ModalType = 'chat' | 'project' | 'pdf-preview';

export const useModal = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const openModal = useCallback((modalType: ModalType) => {
    setActiveModal(modalType);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  }, []);

  return {
    activeModal,
    openModal,
    closeModal
  };
};
