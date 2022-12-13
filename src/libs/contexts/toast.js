import React, { useCallback } from 'react';
import { createContext, useState, useContext } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

const ToastContext = createContext((severity, message) => {});

export const ToastProvider = ({ children, autoHideDuration }) => {
  const [severity, setSeverity] = useState('info');
  const [message, setMessage] = useState(null);

  const toggle = useCallback((severity, message) => {
    setSeverity(severity);
    setMessage(message);
  }, []);

  const onClose = useCallback(() => {
    setSeverity('info');
    setMessage(null);
  }, []);

  return (
    <ToastContext.Provider value={toggle}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={!!message}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={onClose} severity={severity} sx={{ mb: 5 }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

ToastProvider.defaultProps = {
  autoHideDuration: 9000,
};

const useToast = () => useContext(ToastContext);

export default useToast;
