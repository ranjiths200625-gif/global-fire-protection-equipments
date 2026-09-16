import api from './api';

const LOCAL_STORAGE_KEY = 'global_fire_products';

const defaultProducts = [
  {
    _id: 'prod_1',
    name: 'Fire Extinguishers',
    slug: 'fire-extinguishers',
    category: 'Fire Extinguishers',
    description: 'Available in ABC Powder, CO₂, Water, Foam, and Wet Chemical types.',
    features: ['ABC Dry Powder', 'CO2 Gas Cylinders', 'Foam & Water Types', 'Refilling Available'],
    image: '/assets/products/fire-extinguishers.jpg',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'prod_2',
    name: 'Fire Hose Box',
    slug: 'fire-hose-box',
    category: 'Fire Hydrant Systems',
    description: 'Heavy-duty dual-door cabinet for canvas fire hoses and branch pipes.',
    features: ['Dual Door Cabinet', 'Mild Steel / Stainless Steel', 'Weatherproof Coating', 'Glass Frontage'],
    image: '/assets/products/fire-hose-box.jpg',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'prod_3',
    name: 'Fire Hose Reel',
    slug: 'fire-hose-reel',
    category: 'Fire Hydrant Systems',
    description: 'Wall-mounted drum system for rapid water discharge and firefighting.',
    features: ['Wall Mount Drum', '30m Flexible Rubber Hose', 'Shut-off Jet Nozzle', 'ISI Certified'],
    image: '/assets/products/fire-hose-reel.jpg',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'prod_4',
    name: 'Fire Extinguisher Operation Method Sign Board',
    slug: 'fire-extinguisher-operation-sign-board',
    category: 'Safety Signage',
    description: 'Bilingual (English & Tamil) P.A.S.S. method safety sign board.',
    features: ['Bilingual (English & Tamil)', 'Glow in Dark / Retroreflective', 'UV Resistant', 'Standard Sizing'],
    image: '/assets/products/fire-extinguisher-operation-sign.jpg',
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const getLocalProducts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultProducts;
  }
};

const saveLocalProducts = (products) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error saving local products:', e);
  }
};

export const productService = {
  getAll: async (params = {}) => {
    let serverProducts = [];
    try {
      const response = await api.get('/products', { params, timeout: 3000 });
      if (response.data?.data && Array.isArray(response.data.data)) {
        serverProducts = response.data.data;
      } else if (Array.isArray(response.data)) {
        serverProducts = response.data;
      }
    } catch (err) {
      // Backend offline / static mode fallback
    }

    let list = getLocalProducts();
    if (serverProducts.length > 0) {
      list = serverProducts;
      saveLocalProducts(list);
    }

    if (params.activeOnly) {
      list = list.filter((p) => p.active !== false);
    }
    if (params.category && params.category !== 'All') {
      list = list.filter((p) => p.category === params.category);
    }

    return { success: true, count: list.length, data: list };
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      if (response.data?.data) return response.data;
    } catch (err) {
      // Fallback
    }
    const list = getLocalProducts();
    const product = list.find((p) => p._id === id || p.slug === id);
    if (product) return { success: true, data: product };
    throw new Error('Product not found');
  },

  create: async (dataOrFormData) => {
    let newProduct = {};
    let isFormData = typeof FormData !== 'undefined' && dataOrFormData instanceof FormData;

    if (isFormData) {
      const featuresRaw = dataOrFormData.get('features');
      let features = [];
      try {
        features = featuresRaw ? JSON.parse(featuresRaw) : [];
      } catch (e) {
        features = typeof featuresRaw === 'string' ? featuresRaw.split(',').map((f) => f.trim()) : [];
      }

      newProduct = {
        _id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        name: dataOrFormData.get('name') || '',
        category: dataOrFormData.get('category') || 'Fire Extinguishers',
        description: dataOrFormData.get('description') || '',
        features: features,
        image: dataOrFormData.get('imageUrl') || dataOrFormData.get('image') || '/assets/products/fire-extinguishers.jpg',
        active: dataOrFormData.get('active') === 'true' || dataOrFormData.get('active') === true,
        createdAt: new Date().toISOString(),
      };
    } else {
      newProduct = {
        _id: 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        ...dataOrFormData,
        createdAt: new Date().toISOString(),
      };
    }

    // Generate slug
    newProduct.slug = newProduct.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Save to local storage
    const list = getLocalProducts();
    list.unshift(newProduct);
    saveLocalProducts(list);

    // Try backend sync if available
    try {
      await api.post('/products', dataOrFormData, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
    } catch (e) {
      // Offline fallback already stored locally
    }

    return { success: true, message: 'Product created successfully', data: newProduct };
  },

  update: async (id, dataOrFormData) => {
    const list = getLocalProducts();
    const index = list.findIndex((p) => p._id === id);
    let updatedProduct = index !== -1 ? { ...list[index] } : { _id: id };
    let isFormData = typeof FormData !== 'undefined' && dataOrFormData instanceof FormData;

    if (isFormData) {
      if (dataOrFormData.get('name')) updatedProduct.name = dataOrFormData.get('name');
      if (dataOrFormData.get('category')) updatedProduct.category = dataOrFormData.get('category');
      if (dataOrFormData.get('description')) updatedProduct.description = dataOrFormData.get('description');
      if (dataOrFormData.get('active') !== null) {
        updatedProduct.active = dataOrFormData.get('active') === 'true' || dataOrFormData.get('active') === true;
      }
      const featuresRaw = dataOrFormData.get('features');
      if (featuresRaw) {
        try {
          updatedProduct.features = JSON.parse(featuresRaw);
        } catch (e) {
          updatedProduct.features = typeof featuresRaw === 'string' ? featuresRaw.split(',').map((f) => f.trim()) : [];
        }
      }
      const img = dataOrFormData.get('imageUrl') || dataOrFormData.get('image');
      if (img && typeof img === 'string') {
        updatedProduct.image = img;
      }
    } else {
      updatedProduct = { ...updatedProduct, ...dataOrFormData };
    }

    if (updatedProduct.name) {
      updatedProduct.slug = updatedProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    updatedProduct.updatedAt = new Date().toISOString();

    if (index !== -1) {
      list[index] = updatedProduct;
    } else {
      list.push(updatedProduct);
    }
    saveLocalProducts(list);

    // Try backend sync
    try {
      await api.put(`/products/${id}`, dataOrFormData, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
    } catch (e) {
      // Saved locally
    }

    return { success: true, message: 'Product updated successfully', data: updatedProduct };
  },

  delete: async (id) => {
    const list = getLocalProducts();
    const filtered = list.filter((p) => p._id !== id);
    saveLocalProducts(filtered);

    try {
      await api.delete(`/products/${id}`);
    } catch (e) {
      // Deleted locally
    }

    return { success: true, message: 'Product deleted successfully' };
  },
};

