import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('global_fire_token', response.data.token);
      localStorage.setItem('global_fire_admin', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  getCurrentAdmin: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('global_fire_token');
    localStorage.removeItem('global_fire_admin');
  },

  getStoredAdmin: () => {
    const admin = localStorage.getItem('global_fire_admin');
    return admin ? JSON.parse(admin) : null;
  },

  getToken: () => {
    return localStorage.getItem('global_fire_token');
  },
};
