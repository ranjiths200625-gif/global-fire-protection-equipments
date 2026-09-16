import api from './api';

const LOCAL_STORAGE_KEY = 'global_fire_services';

const defaultServices = [
  {
    _id: 's1',
    name: 'Fire Extinguisher Supply',
    description:
      'Supply of portable fire extinguishers including CO₂, ABC dry chemical powder, water, and foam types suitable for commercial, retail, and residential premises.',
    icon: 'Flame',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 's2',
    name: 'Fire Extinguisher Refilling',
    description:
      'Prompt refilling services for discharged or periodic maintenance due fire extinguishers using genuine extinguishing agents and pressure checks.',
    icon: 'RefreshCw',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 's3',
    name: 'Fire Extinguisher Service & Maintenance',
    description:
      'Routine inspection, mechanical component check, pressure testing, discharge valve servicing, and maintenance to maintain equipment readiness.',
    icon: 'Wrench',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 's4',
    name: 'Fire Hydrant System Services',
    description:
      'Servicing, valve overhaul, hose testing, coupling checks, and maintenance support for commercial and industrial fire hydrant systems.',
    icon: 'ShieldCheck',
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const getLocalServices = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultServices));
      return defaultServices;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultServices;
  }
};

const saveLocalServices = (services) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(services));
  } catch (e) {
    console.error('Error saving local services:', e);
  }
};

export const serviceService = {
  getAll: async (params = {}) => {
    let serverServices = [];
    try {
      const response = await api.get('/services', { params, timeout: 3000 });
      if (response.data?.data && Array.isArray(response.data.data)) {
        serverServices = response.data.data;
      } else if (Array.isArray(response.data)) {
        serverServices = response.data;
      }
    } catch (err) {
      // Backend offline / static mode
    }

    let list = getLocalServices();
    if (serverServices.length > 0) {
      list = serverServices;
      saveLocalServices(list);
    }

    if (params.activeOnly) {
      list = list.filter((s) => s.active !== false);
    }

    return { success: true, count: list.length, data: list };
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      if (response.data?.data) return response.data;
    } catch (err) {
      // Fallback
    }
    const list = getLocalServices();
    const service = list.find((s) => s._id === id);
    if (service) return { success: true, data: service };
    throw new Error('Service not found');
  },

  create: async (data) => {
    const newService = {
      _id: 'serv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: data.name || '',
      description: data.description || '',
      icon: data.icon || 'Flame',
      active: data.active !== false,
      createdAt: new Date().toISOString(),
    };

    const list = getLocalServices();
    list.unshift(newService);
    saveLocalServices(list);

    try {
      await api.post('/services', data);
    } catch (e) {
      // Offline fallback saved
    }

    return { success: true, message: 'Service created successfully', data: newService };
  },

  update: async (id, data) => {
    const list = getLocalServices();
    const index = list.findIndex((s) => s._id === id);
    let updated = index !== -1 ? { ...list[index], ...data } : { _id: id, ...data };
    updated.updatedAt = new Date().toISOString();

    if (index !== -1) {
      list[index] = updated;
    } else {
      list.push(updated);
    }
    saveLocalServices(list);

    try {
      await api.put(`/services/${id}`, data);
    } catch (e) {
      // Offline fallback saved
    }

    return { success: true, message: 'Service updated successfully', data: updated };
  },

  delete: async (id) => {
    const list = getLocalServices();
    const filtered = list.filter((s) => s._id !== id);
    saveLocalServices(filtered);

    try {
      await api.delete(`/services/${id}`);
    } catch (e) {
      // Offline fallback deleted
    }

    return { success: true, message: 'Service deleted successfully' };
  },
};

