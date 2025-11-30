import { useState, useEffect } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

function NotificationSystem() {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(null);

    const showNotification = (message, severity = 'info', autoHideDuration = 6000) => {
        const newNotification = {
            id: Date.now(),
            message,
            severity,
            autoHideDuration
        };

        setNotifications(prev => [...prev, newNotification]);
    };

    useEffect(() => {
        if (notifications.length > 0 && !currentNotification) {
            setCurrentNotification(notifications[0]);
            setOpen(true);
        }
    }, [notifications, currentNotification]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        
        setOpen(false);
        setTimeout(() => {
            setNotifications(prev => prev.slice(1));
            setCurrentNotification(null);
        }, 300);
    };

    useEffect(() => {
        window.showNotification = showNotification;
    }, []);

    if (!currentNotification) return null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={currentNotification.autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert
                severity={currentNotification.severity}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                sx={{ width: '100%' }}
            >
                {currentNotification.message}
            </Alert>
        </Snackbar>
    );
}

export default NotificationSystem;