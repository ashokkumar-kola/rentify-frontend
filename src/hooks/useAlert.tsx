import { useState } from 'react';

interface AlertOptions {
    confirmText?: string;
    onConfirm?: (() => void) | null;
}

interface AlertState {
    visible: boolean;
    title: string;
    message: string;
    confirmText: string;
    onConfirm: (() => void) | null;
}

const useAlert = () => {
  const [alertState, setAlertState] = useState<AlertState>({
    visible: false,
    title: '',
    message: '',
    confirmText: 'OK',
    onConfirm: null,
  });

const showAlert = (
    title: string,
    message: string,
    options: AlertOptions = {}
) => {
    setAlertState({
        visible: true,
        title,
        message,
        confirmText: options.confirmText || 'OK',
        onConfirm: options.onConfirm || null,
    });
};

  const hideAlert = () => {
    setAlertState(prev => ({ ...prev, visible: false }));
  };

  return {
    alertState,
    showAlert,
    hideAlert,
  };
};

export default useAlert;
