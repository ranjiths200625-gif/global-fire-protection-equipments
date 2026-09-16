import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('global_fire_token', response.data.token);
        localStorage.setItem('global_fire_admin', JSON.stringify(response.data.admin));
      }
      return response.data;
    } catch (error) {
      // Offline / Static Vercel fallback for default credentials
      const { email, password } = credentials;
      if (
        (email === 'admin@globalfire.com' && password === 'Admin@12345') ||
        (email === 'globalsafety89@gmail.com' && password === 'Admin@12345') ||
        (email === 'ranjiths200625@gmail.com' && password === 'Admin@12345')
      ) {
        const fallbackAdmin = {
          id: 'admin_local_1',
          name: 'Global Fire Administrator',
          email: email,
          role: 'superadmin',
        };
        const token = 'mock_jwt_token_' + Date.now();
        localStorage.setItem('global_fire_token', token);
        localStorage.setItem('global_fire_admin', JSON.stringify(fallbackAdmin));
        return {
          success: true,
          token,
          admin: fallbackAdmin,
        };
      }
      throw error;
    }
  },

  getCurrentAdmin: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      const stored = authService.getStoredAdmin();
      if (stored) return { success: true, admin: stored };
      throw err;
    }
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
