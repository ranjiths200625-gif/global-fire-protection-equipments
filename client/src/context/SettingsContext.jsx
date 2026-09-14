import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: 'GLOBAL FIRE PROTECTION EQUIPMENTS',
    address: 'Kadalaur Road, Kovilpatti, Tamil Nadu, India',
    city: 'Kovilpatti',
    state: 'Tamil Nadu',
    phone: '+91 97517 80504',
    whatsapp: '9751780504',
    email: '',
    googleMapsUrl: '',
    workingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
    description:
      'Supplying fire extinguishers and providing fire extinguisher refilling/service. Fire Hydrant System services in Kovilpatti.',
    socialLinks: { facebook: '', instagram: '' },
    verifiedClaims: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await settingsService.getSettings();
      if (res.data) {
        setSettings(res.data);
      }
    } catch (error) {
      console.warn('Failed to fetch settings, using defaults:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
