import React from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

interface AlertProps {
  status: boolean;
  messageSeverity: AlertColor;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<AlertProps> = ({ status, message, messageSeverity, onClose }) => {
  return (
    <Snackbar open={status} autoHideDuration={3000} onClose={onClose} sx={{ width: '90%' }}>
      <Alert severity={messageSeverity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;