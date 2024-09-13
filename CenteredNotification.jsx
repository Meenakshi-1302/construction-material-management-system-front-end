// CenteredNotification.jsx
import React, { useEffect } from 'react';
import './CenteredNotification.css'; // Import custom CSS for the notification

const CenteredNotification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Adjust the timeout duration if needed

      return () => clearTimeout(timer);
    }
  }, [onClose]);

  return (
    <div className={`centered-notification ${type}`} role="alert">
      <div className="notification-content">
        {message}
      </div>
      <button className="notification-close" onClick={onClose}>✕</button>
    </div>
  );
};

export default CenteredNotification;
