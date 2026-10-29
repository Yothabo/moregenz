import toast, { Toaster } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading';

export const showSubmissionToast = (type: ToastType, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        duration: 4000,
        position: 'bottom-right',
        className: 'yotaabo-toast yotaabo-toast--success',
      });
      break;
    case 'error':
      toast.error(message, {
        duration: 6000,
        position: 'bottom-right',
        className: 'yotaabo-toast yotaabo-toast--error',
      });
      break;
    case 'loading':
      toast.loading(message, {
        duration: 3000,
        position: 'bottom-right',
        className: 'yotaabo-toast',
      });
      break;
  }
};
