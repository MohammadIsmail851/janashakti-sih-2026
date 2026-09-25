import React, { createContext, useContext, useState } from 'react';
import { notificationsList } from '../data/mockData';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('janashakti_notifs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return notificationsList;
  });
  const [toastMessage, setToastMessage] = useState(null);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('janashakti_notifs', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('janashakti_notifs', JSON.stringify(updated));
      return updated;
    });
    showToast("All notifications marked as read", "info");
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: "Just now",
      ...notif
    };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem('janashakti_notifs', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotifsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
