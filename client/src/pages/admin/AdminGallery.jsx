import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Loader2 } from 'lucide-react';
import { galleryService } from '../../services/galleryService';
import { useToast } from '../../context/ToastContext';

const CATEGORIES = [
  'Fire Extinguishers',
  'Fire Extinguisher Operation',
  'Fire Hydrant Equipment',
  'Fire Protection Systems',
];

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Fire Extinguishers',
    image: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await galleryService.getAll();
      setItems(res.data || []);
    } catch (err) {
      addToast('Failed to load gallery items.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await galleryService.delete(id);
      addToast('Gallery photo deleted.', 'success');
      await fetchGallery();
    } catch (err) {
      addToast('Failed to delete photo.', 'error');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile && !formData.image.trim()) {
      addToast('Please upload an image file or enter an image URL.', 'error');
      return;
    }

    setUploading(true);
    let resolvedImage = formData.image.trim();

    if (selectedFile) {
      try {
        resolvedImage = await fileToDataUrl(selectedFile);
      } catch (err) {
        console.warn('Could not read image file:', err);
      }
    }

    const payload = {
      title: formData.title.trim() || 'Fire Safety Equipment',
      category: formData.category,
      image: resolvedImage || '/assets/products/fire-extinguishers.jpg',
    };

    const data = new FormData();
    data.append('title', payload.title);
    data.append('category', payload.category);
    data.append('imageUrl', payload.image);
    if (selectedFile) {
      data.append('image', selectedFile);
    } else {
      data.append('image', payload.image);
    }

    try {
      await galleryService.create(payload);
      addToast('Gallery image added successfully.', 'success');
      setModalOpen(false);
      setFormData({ title: '', category: 'Fire Extinguishers', image: '' });
      setSelectedFile(null);
      await fetchGallery();
    } catch (err) {
      addToast(err.response?.data?.message || err.message || 'Failed to upload image.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-black text-slate-900">Gallery Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload real photographs of fire safety equipment, systems, and operations.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-red-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-500">Loading gallery...</div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded-3xl">
          No images uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
            >
              <div className="h-44 p-4 bg-slate-50 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-brand-700 font-bold uppercase block">{item.category}</span>
                  <p className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                    {item.title}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-heading font-black text-slate-900 mb-4">Add Gallery Image</h3>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Image Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. CO2 Cylinder Unit Inspection"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Image</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="w-full text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">Or Image URL:</span>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/assets/products/... or https://..."
                      className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600"
                    />
                  </div>
                  {(selectedFile || formData.image) && (
                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 truncate">
                        {selectedFile ? selectedFile.name : formData.image}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
