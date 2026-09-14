import api from './api';

export const enquiryService = {
  submit: async (enquiryData) => {
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  },

  getAll: async (params = {}) => {
    const response = await api.get('/enquiries', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/enquiries/${id}`);
    return response.data;
  },

  updateStatus: async (id, data) => {
    const response = await api.patch(`/enquiries/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/enquiries/${id}`);
    return response.data;
  },
};
