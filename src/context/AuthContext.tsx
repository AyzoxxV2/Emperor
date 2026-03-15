import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  username: string;
  name: string;        // alias of username, used across components
  email: string;
  plan: 'free' | 'pro' | 'elite' | 'lifetime';
  discord_id?: string;
  avatar: string;      // static bot avatar for now
  joinedAt: string;    // human-readable join date
  created_at: string;
}

interface AuthContextType {
  user: Profile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (username: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const buildProfile = (sbUser: User, data: any): Profile => {
  const username = data?.username || sbUser.email?.split('@')[0] || 'User';
  return {
    id: sbUser.id,
    username,
    name: username,
    email: sbUser.email || '',
    plan: data?.plan || 'free',
    discord_id: data?.discord_id,
    avatar: '/emperor/emperor_bot_avatar_ani.gif',
    joinedAt: data?.created_at
      ? new Date(data.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    created_at: data?.created_at || new Date().toISOString(),
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (sbUser: User) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sbUser.id)
        .single();
      setUser(buildProfile(sbUser, data));
    } catch (e) {
      // If profiles table doesn't exist yet, still set user from auth data
      console.warn('[Emperor] Could not fetch profile, using auth data:', e);
      setUser(buildProfile(sbUser, null));
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (session?.user) await fetchProfile(session.user);
  }, [session, fetchProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user).finally(() => setLoading(false));
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) await fetchProfile(session.user);
      else setUser(null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { username } }
    });
    return { error: error?.message || null };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, isAuthenticated: !!user, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
