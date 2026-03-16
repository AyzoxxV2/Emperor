/* eslint-disable */
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Camera, Save, User, Mail, Crown, Calendar, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Pages.scss';
import './ProfilePage.scss';

const toastStyle = {
  background: 'rgba(14,14,14,0.97)', color: '#fff',
  border: '1px solid rgba(232,168,0,0.35)', backdropFilter: 'blur(12px)',
  fontFamily: 'Rajdhani, sans-serif', fontSize: '0.9rem',
  borderRadius: '6px', padding: '12px 18px',
};

const planColors: Record<string, string> = {
  free: '#00FF87', pro: '#FFD700', elite: '#FFD700', lifetime: '#f72585'
};

const ProfilePage: React.FC = () => {
  const { user, refreshProfile, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return <Navigate to="/" replace />;

  const [username, setUsername] = useState(user.name);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { toast.error('Image must be under 3MB', { style: toastStyle }); return; }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!username.trim()) { toast.error('Username cannot be empty', { style: toastStyle }); return; }
    setSaving(true);
    try {
      let newAvatarUrl = avatarUrl;

      // Upload avatar if changed
      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop();
        const path = `avatars/${user.id}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from('vouchers')
          .upload(path, avatarFile, { upsert: true });
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage.from('vouchers').getPublicUrl(path);
        newAvatarUrl = data.publicUrl;
      }

      // Update profile
      const { error } = await supabase.from('profiles').update({
        username: username.trim(),
        ...(newAvatarUrl !== avatarUrl ? { avatar_url: newAvatarUrl } : {}),
        updated_at: new Date().toISOString(),
      }).eq('id', user.id);

      if (error) throw error;

      await refreshProfile();
      setAvatarUrl(newAvatarUrl);
      setAvatarFile(null);
      setAvatarPreview(null);
      toast.success('Profile updated! ✅', { style: toastStyle });
    } catch (e: any) {
      toast.error(e.message || 'Failed to update profile', { style: toastStyle });
    } finally {
      setSaving(false);
    }
  };

  const displayAvatar = avatarPreview || avatarUrl;
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="page">
      <div className="page__hero" style={{ minHeight: '32vh' }}>
        <div className="page__hero-glow" />
        <motion.div className="page__hero-content"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          {/* Avatar */}
          <div className="profile__avatar-wrap">
            <div className="profile__avatar">
              {displayAvatar ? (
                <img src={displayAvatar} alt={user.name} className="profile__avatar-img" />
              ) : (
                <span className="profile__avatar-letter">{user.name.charAt(0).toUpperCase()}</span>
              )}
              <button className="profile__avatar-edit" onClick={() => fileRef.current?.click()}>
                <Camera size={14} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </div>
            {avatarPreview && (
              <span className="profile__avatar-hint">Click Save to apply</span>
            )}
          </div>

          <div className={`badge badge--gold`} style={{ color: planColors[user.plan] }}>
            {user.plan.toUpperCase()} MEMBER
          </div>
          <h1 className="display-lg">{user.name}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Member since {joinDate}</p>
        </motion.div>
      </div>

      <div className="page__container">
        <div className="profile__layout">
          {/* Edit form */}
          <motion.div className="profile__card"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          >
            <h3 className="profile__card-title"><User size={16} /> Edit Profile</h3>

            <div className="profile__field">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Your username"
                maxLength={32}
              />
              <span className="profile__field-hint">{username.length}/32</span>
            </div>

            <div className="profile__field">
              <label>Email</label>
              <input type="email" value={user.email} disabled />
              <span className="profile__field-hint">Email cannot be changed</span>
            </div>

            <motion.button
              className="profile__save-btn btn btn--gold"
              onClick={handleSave} disabled={saving}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              {saving ? <div className="profile__spinner" /> : <><Save size={15} /> Save Changes</>}
            </motion.button>
          </motion.div>

          {/* Stats */}
          <div className="profile__right">
            <motion.div className="profile__card"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <h3 className="profile__card-title"><Crown size={16} /> Account Info</h3>
              <div className="profile__info-rows">
                <div className="profile__info-row">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
                <div className="profile__info-row">
                  <Crown size={14} style={{ color: planColors[user.plan] }} />
                  <span style={{ color: planColors[user.plan] }}>{user.plan.toUpperCase()} Plan</span>
                </div>
                <div className="profile__info-row">
                  <Calendar size={14} />
                  <span>Joined {joinDate}</span>
                </div>
                {user.is_admin && (
                  <div className="profile__info-row">
                    <Shield size={14} style={{ color: 'var(--gold)' }} />
                    <span style={{ color: 'var(--gold)' }}>Administrator</span>
                  </div>
                )}
              </div>
            </motion.div>

            {user.plan === 'free' && (
              <motion.div className="profile__upgrade-card"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              >
                <div className="profile__upgrade-glow" />
                <Crown size={24} color="var(--gold)" />
                <h3>Upgrade your plan</h3>
                <p>Get access to premium features, priority support and more.</p>
                <a href="/pricing" className="btn btn--gold profile__upgrade-btn">
                  See Plans
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
