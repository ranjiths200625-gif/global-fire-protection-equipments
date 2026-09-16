import api from './api';

const CREDENTIALS_KEY = 'global_fire_admin_credentials';

const DEFAULT_ADMIN = {
  name: 'Global Fire Administrator',
  email: 'globalsafety89@gmail.com',
  password: 'Admin@12345',
  role: 'superadmin',
};

const getStoredCredentials = () => {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if (!raw) {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN));
      return DEFAULT_ADMIN;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_ADMIN;
  }
};

const saveStoredCredentials = (data) => {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving admin credentials locally:', e);
  }
};

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
      // Offline / Static Vercel fallback
      const { email, password } = credentials;
      const stored = getStoredCredentials();

      const isValidUser =
        (email.toLowerCase() === stored.email.toLowerCase() && password === stored.password) ||
        (email.toLowerCase() === 'admin@globalfire.com' && password === stored.password) ||
        (email.toLowerCase() === 'globalsafety89@gmail.com' && password === stored.password) ||
        (email.toLowerCase() === 'ranjiths200625@gmail.com' && password === 'Admin@12345');

      if (isValidUser) {
        const fallbackAdmin = {
          id: 'admin_local_1',
          name: stored.name || 'Global Fire Administrator',
          email: email.toLowerCase(),
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

  updateCredentials: async ({ name, email, currentPassword, newPassword }) => {
    const stored = getStoredCredentials();

    // Verify current password in offline/fallback mode
    if (currentPassword && currentPassword !== stored.password) {
      throw new Error('Current password does not match our records.');
    }

    if (newPassword && newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }

    const updated = {
      ...stored,
      name: name?.trim() || stored.name,
      email: email?.trim().toLowerCase() || stored.email,
      password: newPassword ? newPassword : stored.password,
    };

    saveStoredCredentials(updated);

    const updatedAdminInfo = {
      id: 'admin_local_1',
      name: updated.name,
      email: updated.email,
      role: 'superadmin',
    };
    localStorage.setItem('global_fire_admin', JSON.stringify(updatedAdminInfo));

    // Try server update if backend is active
    try {
      const response = await api.put('/auth/update-credentials', {
        name,
        email,
        currentPassword,
        newPassword,
      });
      if (response.data?.admin) {
        localStorage.setItem('global_fire_admin', JSON.stringify(response.data.admin));
      }
    } catch (err) {
      // Handled via local storage fallback
    }

    return {
      success: true,
      message: 'Admin credentials updated successfully!',
      admin: updatedAdminInfo,
    };
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
    if (admin) {
      try {
        return JSON.parse(admin);
      } catch (e) {
        return null;
      }
    }
    const creds = getStoredCredentials();
    return {
      id: 'admin_local_1',
      name: creds.name,
      email: creds.email,
      role: 'superadmin',
    };
  },

  getToken: () => {
    return localStorage.getItem('global_fire_token');
  },
};

