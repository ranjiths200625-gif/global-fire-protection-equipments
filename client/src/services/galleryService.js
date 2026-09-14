import api from './api';

export const galleryService = {
  getAll: async (params = {}) => {
    const response = await api.get('/gallery', { params });
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};
