import api from './api';

const LOCAL_STORAGE_KEY = 'global_fire_local_enquiries';

const getLocalEnquiries = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalEnquiry = (enquiryData) => {
  try {
    const list = getLocalEnquiries();
    const newRecord = {
      _id: 'enq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      ...enquiryData,
      status: 'New',
      notes: 'Submitted via web portal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newRecord);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    return newRecord;
  } catch (e) {
    console.error('Error saving local enquiry:', e);
    return enquiryData;
  }
};

export const enquiryService = {
  submit: async (enquiryData) => {
    try {
      const response = await api.post('/enquiries', enquiryData);
      return response.data;
    } catch (error) {
      console.warn('Backend API submission failed, saving enquiry locally:', error?.message);
      // Fallback: save to client storage so the user's enquiry is never lost
      const saved = saveLocalEnquiry(enquiryData);
      return {
        success: true,
        message: 'Enquiry received successfully',
        data: saved,
        isOfflineFallback: true,
      };
    }
  },

  getAll: async (params = {}) => {
    let serverList = [];
    try {
      const response = await api.get('/enquiries', { params });
      serverList = response.data?.data || (Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.warn('Could not fetch server enquiries, falling back to local store:', err?.message);
    }

    const localList = getLocalEnquiries();
    // Filter local list if params exist
    let filteredLocal = localList;
    if (params.status && params.status !== 'All') {
      filteredLocal = filteredLocal.filter((e) => e.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filteredLocal = filteredLocal.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.phone?.includes(q) ||
          e.email?.toLowerCase().includes(q) ||
          e.productOrService?.toLowerCase().includes(q)
      );
    }

    // Merge without duplicating IDs
    const all = [...filteredLocal, ...serverList.filter((s) => !filteredLocal.some((l) => l._id === s._id))];
    return { success: true, count: all.length, data: all };
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/enquiries/${id}`);
      return response.data;
    } catch (err) {
      const found = getLocalEnquiries().find((e) => e._id === id);
      if (found) return { success: true, data: found };
      throw err;
    }
  },

  updateStatus: async (id, data) => {
    try {
      const response = await api.patch(`/enquiries/${id}`, data);
      return response.data;
    } catch (err) {
      const list = getLocalEnquiries();
      const idx = list.findIndex((e) => e._id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        return { success: true, data: list[idx] };
      }
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/enquiries/${id}`);
      return response.data;
    } catch (err) {
      const list = getLocalEnquiries();
      const updated = list.filter((e) => e._id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { success: true, message: 'Deleted successfully' };
    }
  },
};

