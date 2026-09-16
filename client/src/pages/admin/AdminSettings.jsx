import React, { useState, useEffect } from 'react';
import { Save, ShieldAlert, Loader2, KeyRound, User, Lock, CheckCircle2 } from 'lucide-react';
import { settingsService } from '../../services/settingsService';
import { useSettings } from '../../context/SettingsContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const { settings, refreshSettings } = useSettings();
  const { admin, updateCredentials } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({ ...settings });
  const [claimsInput, setClaimsInput] = useState('');
  const [saving, setSaving] = useState(false);

  // Admin Account & Password State
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [updatingAccount, setUpdatingAccount] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
      setClaimsInput(
        Array.isArray(settings.verifiedClaims) ? settings.verifiedClaims.join('\n') : ''
      );
    }
  }, [settings]);

  useEffect(() => {
    if (admin) {
      setAccountData((prev) => ({
        ...prev,
        name: admin.name || 'Global Fire Administrator',
        email: admin.email || 'globalsafety89@gmail.com',
      }));
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const verifiedClaims = claimsInput
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    try {
      await settingsService.updateSettings({
        ...formData,
        verifiedClaims,
      });
      await refreshSettings();
      addToast('Business settings updated successfully.', 'success');
    } catch (err) {
      addToast('Failed to update business settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();

    if (!accountData.currentPassword) {
      addToast('Please enter your Current Password to verify identity.', 'error');
      return;
    }

    if (accountData.newPassword) {
      if (accountData.newPassword.length < 6) {
        addToast('New password must be at least 6 characters long.', 'error');
        return;
      }
      if (accountData.newPassword !== accountData.confirmPassword) {
        addToast('New password and confirm password do not match.', 'error');
        return;
      }
    }

    setUpdatingAccount(true);
    try {
      await updateCredentials({
        name: accountData.name,
        email: accountData.email,
        currentPassword: accountData.currentPassword,
        newPassword: accountData.newPassword || undefined,
      });

      addToast('Admin username and credentials updated successfully!', 'success');
      setAccountData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (err) {
      addToast(err.message || 'Failed to update credentials. Please check current password.', 'error');
    } finally {
      setUpdatingAccount(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-black text-slate-900">Admin & Business Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure business details, contact channels, and manage admin portal login credentials.
        </p>
      </div>

      {/* Admin Login Credentials & Security Section */}
      <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-heading font-bold text-slate-900">
              Admin Login &amp; Security Credentials
            </h2>
            <p className="text-xs text-slate-500">
              Change the administrator name, login email / username, and portal password.
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Admin Display Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  name="name"
                  value={accountData.name}
                  onChange={handleAccountChange}
                  placeholder="e.g. Global Fire Administrator"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Admin Email / Username * (Used for Sign In)
              </label>
              <input
                type="email"
                required
                name="email"
                value={accountData.email}
                onChange={handleAccountChange}
                placeholder="e.g. globalsafety89@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Current Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  name="currentPassword"
                  value={accountData.currentPassword}
                  onChange={handleAccountChange}
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                New Password (Optional)
              </label>
              <input
                type="password"
                name="newPassword"
                value={accountData.newPassword}
                onChange={handleAccountChange}
                placeholder="Min. 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={accountData.confirmPassword}
                onChange={handleAccountChange}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={updatingAccount}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {updatingAccount ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Credentials...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Update Admin Credentials</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* General Business Information */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-base font-heading font-bold text-slate-900 mb-4">
            General Business Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours || ''}
                onChange={handleChange}
                placeholder="e.g. Monday - Saturday: 9:00 AM - 7:00 PM"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Business Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="e.g. Kadalaur Road, Kovilpatti, Tamil Nadu, India"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Website Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 resize-none"
            />
          </div>
        </div>

        {/* Contact & Integrations */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-base font-heading font-bold text-slate-900 mb-4">
            Contact Channels &amp; Map
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="e.g. +91 9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">If blank, Call button is hidden on mobile.</p>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">WhatsApp Number</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp || ''}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">If blank, WhatsApp buttons are hidden.</p>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="e.g. contact@globalfire.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Google Maps Link</label>
              <input
                type="text"
                name="googleMapsUrl"
                value={formData.googleMapsUrl || ''}
                onChange={handleChange}
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Legal-Safe Business Claims Management */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-heading font-bold text-slate-900">
              Verified Business Claims (Optional)
            </h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Enter verified claims or registrations ONLY if you possess valid supporting documentation. If left empty, no certification claims or empty badges will be displayed on the public site. (One per line)
          </p>
          <textarea
            rows={3}
            value={claimsInput}
            onChange={(e) => setClaimsInput(e.target.value)}
            placeholder="Enter optional verified claim (leave blank if none)..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 resize-none font-mono"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md hover:shadow-red-500/20 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Business Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;

