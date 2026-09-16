import api from './api';

const LOCAL_STORAGE_KEY = 'global_fire_gallery';

const defaultGallery = [
  {
    _id: 'g1',
    title: 'Portable Fire Extinguishers Lineup',
    image: '/assets/products/fire-extinguishers.jpg',
    category: 'Fire Extinguishers',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'g2',
    title: 'Double-Door Fire Hose Box',
    image: '/assets/products/fire-hose-box.jpg',
    category: 'Fire Hydrant Equipment',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'g3',
    title: 'Wall-Mounted Fire Hose Reel Drum',
    image: '/assets/products/fire-hose-reel.jpg',
    category: 'Fire Hydrant Equipment',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'g4',
    title: 'Fire Extinguisher Operation Method (P.A.S.S. Guide)',
    image: '/assets/products/fire-extinguisher-operation-sign.jpg',
    category: 'Fire Extinguisher Operation',
    createdAt: new Date().toISOString(),
  },
];

const getLocalGallery = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultGallery));
      return defaultGallery;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultGallery;
  }
};

const saveLocalGallery = (items) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving local gallery:', e);
  }
};

export const galleryService = {
  getAll: async (params = {}) => {
    let serverGallery = [];
    try {
      const response = await api.get('/gallery', { params, timeout: 3000 });
      if (response.data?.data && Array.isArray(response.data.data)) {
        serverGallery = response.data.data;
      } else if (Array.isArray(response.data)) {
        serverGallery = response.data;
      }
    } catch (err) {
      // Backend offline / static mode
    }

    let list = getLocalGallery();
    if (serverGallery.length > 0) {
      list = serverGallery;
      saveLocalGallery(list);
    }

    if (params.category && params.category !== 'All') {
      list = list.filter((item) => item.category === params.category);
    }

    return { success: true, count: list.length, data: list };
  },

  create: async (dataOrFormData) => {
    let newItem = {};
    let isFormData = typeof FormData !== 'undefined' && dataOrFormData instanceof FormData;

    if (isFormData) {
      newItem = {
        _id: 'gal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        title: dataOrFormData.get('title') || 'Fire Protection Equipment',
        category: dataOrFormData.get('category') || 'Fire Extinguishers',
        image: dataOrFormData.get('imageUrl') || dataOrFormData.get('image') || '/assets/products/fire-extinguishers.jpg',
        createdAt: new Date().toISOString(),
      };
    } else {
      newItem = {
        _id: 'gal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        ...dataOrFormData,
        createdAt: new Date().toISOString(),
      };
    }

    const list = getLocalGallery();
    list.unshift(newItem);
    saveLocalGallery(list);

    try {
      await api.post('/gallery', dataOrFormData, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
    } catch (e) {
      // Offline fallback saved
    }

    return { success: true, message: 'Gallery item added successfully', data: newItem };
  },

  delete: async (id) => {
    const list = getLocalGallery();
    const filtered = list.filter((item) => item._id !== id);
    saveLocalGallery(filtered);

    try {
      await api.delete(`/gallery/${id}`);
    } catch (e) {
      // Offline fallback deleted
    }

    return { success: true, message: 'Gallery item deleted successfully' };
  },
};

