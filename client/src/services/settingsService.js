import api from './api';

const LOCAL_STORAGE_KEY = 'global_fire_settings';

const defaultSettings = {
  companyName: 'GLOBAL FIRE PROTECTION EQUIPMENTS',
  address: 'Kadalaur Road, Kovilpatti, Tamil Nadu, India',
  city: 'Kovilpatti',
  state: 'Tamil Nadu',
  phone: '+91 73389 62276',
  whatsapp: '7338962276',
  email: 'globalsafety89@gmail.com',
  googleMapsUrl: '',
  workingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
  description:
    'Supplying fire extinguishers and providing fire extinguisher refilling/service. Fire Hydrant System services in Kovilpatti.',
  socialLinks: { facebook: '', instagram: '' },
  verifiedClaims: [],
};

const getLocalSettings = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultSettings;
  }
};

const saveLocalSettings = (data) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving local settings:', e);
  }
};

export const settingsService = {
  getSettings: async () => {
    try {
      const response = await api.get('/settings', { timeout: 3000 });
      if (response.data?.data) {
        saveLocalSettings(response.data.data);
        return response.data;
      }
    } catch (err) {
      // Backend offline / static mode fallback
    }

    const localData = getLocalSettings();
    return { success: true, data: localData };
  },

  updateSettings: async (settingsData) => {
    const current = getLocalSettings();
    const updated = { ...current, ...settingsData };
    saveLocalSettings(updated);

    try {
      const response = await api.put('/settings', settingsData);
      if (response.data) return response.data;
    } catch (err) {
      // Fallback
    }

    return { success: true, message: 'Business settings updated successfully', data: updated };
  },
};

