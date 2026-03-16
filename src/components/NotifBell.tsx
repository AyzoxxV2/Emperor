/* eslint-disable */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Trash2 } from 'lucide-react';
import { useNotifs } from '../context/NotifContext';
import { useAuth } from '../context/AuthContext';
import './NotifBell.scss';

const NotifBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAllRead, markRead, clearAll } = useNotifs();
  const { user } = useAuth();

  // Only show for admins
  if (!user?.is_admin) return null;

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="notif-bell">
      <button className="notif-bell__btn" onClick={() => { setOpen(!open); if (!open) markAllRead(); }}>
        <Bell size={16} />
        {unreadCount > 0 && (
          <motion.span className="notif-bell__badge"
            key={unreadCount}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="notif-bell__backdrop" onClick={() => setOpen(false)} />
            <motion.div className="notif-bell__panel"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="notif-bell__header">
                <span>Notifications</span>
                <div className="notif-bell__header-actions">
                  {notifications.length > 0 && (
                    <button onClick={clearAll} title="Clear all"><Trash2 size={13} /></button>
                  )}
                  <button onClick={() => setOpen(false)}><X size={14} /></button>
                </div>
              </div>

              <div className="notif-bell__list">
                {notifications.length === 0 ? (
                  <div className="notif-bell__empty">
                    <Bell size={24} />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  notifications.map(n => (
                    <motion.div key={n.id}
                      className={`notif-bell__item ${!n.read ? 'unread' : ''}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => markRead(n.id)}
                    >
                      <div className="notif-bell__item-icon">{n.icon}</div>
                      <div className="notif-bell__item-content">
                        <div className="notif-bell__item-title">{n.title}</div>
                        <div className="notif-bell__item-msg">{n.message}</div>
                        <div className="notif-bell__item-time">{formatTime(n.time)}</div>
                      </div>
                      {!n.read && <div className="notif-bell__item-dot" />}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotifBell;
