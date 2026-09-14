import React, { useState, useEffect } from 'react';
import { Save, ShieldAlert, Loader2 } from 'lucide-react';
import { settingsService } from '../../services/settingsService';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const { settings, refreshSettings } = useSettings();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ ...settings });
  const [claimsInput, setClaimsInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
      setClaimsInput(
        Array.isArray(settings.verifiedClaims) ? settings.verifiedClaims.join('\n') : ''
      );
    }
  }, [settings]);

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

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-black text-slate-900">Business Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure contact numbers, business address, working hours, and Google Maps integration.
        </p>
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
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
