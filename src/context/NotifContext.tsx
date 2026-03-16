import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface Notification {
  id: string;
  type: 'new_voucher' | 'new_user' | 'voucher_approved';
  title: string;
  message: string;
  time: Date;
  read: boolean;
  icon: string;
}

interface NotifContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  clearAll: () => void;
}

const NotifContext = createContext<NotifContextType | null>(null);

export const NotifProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();

  const addNotif = useCallback((notif: Omit<Notification, 'id' | 'time' | 'read'>) => {
    setNotifications(prev => [{
      ...notif,
      id: crypto.randomUUID(),
      time: new Date(),
      read: false,
    }, ...prev].slice(0, 20)); // keep max 20
  }, []);

  useEffect(() => {
    if (!user?.is_admin) return;

    // Listen for new vouchers
    const voucherSub = supabase
      .channel('admin-vouchers')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'vouchers',
      }, (payload) => {
        const v = payload.new as any;
        addNotif({
          type: 'new_voucher',
          title: 'New Voucher Submitted',
          message: `${v.username} submitted a ${v.stars}★ review — pending approval`,
          icon: '⭐',
        });
      })
      .subscribe();

    // Listen for new users
    const profileSub = supabase
      .channel('admin-profiles')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'profiles',
      }, (payload) => {
        const p = payload.new as any;
        if (p.id === user.id) return; // ignore self
        addNotif({
          type: 'new_user',
          title: 'New Member Joined',
          message: `${p.username} just created an account`,
          icon: '👤',
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(voucherSub);
      supabase.removeChannel(profileSub);
    };
  }, [user, addNotif]);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const clearAll = () => setNotifications([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotifContext.Provider value={{ notifications, unreadCount, markAllRead, markRead, clearAll }}>
      {children}
    </NotifContext.Provider>
  );
};

export const useNotifs = () => {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error('useNotifs must be used within NotifProvider');
  return ctx;
};
