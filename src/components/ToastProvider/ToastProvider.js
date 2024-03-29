import React from 'react';

import useKeydown from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [message, setMessage] = React.useState('');
  // notice | warning | success | error
  const [variant, setVariant] = React.useState('notice');
  const [toasts, setToasts] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', handleEscape);

  function createToast(event) {
    event.preventDefault();

    if (message !== '') {
      const nextToasts = [
        ...toasts,
        {
          id: crypto.randomUUID(),
          message,
          variant,
        },
      ];

      setToasts(nextToasts);
      setMessage('');
      setVariant('notice');
    }
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider
      value={{
        message,
        setMessage,
        variant,
        setVariant,
        toasts,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
