import React, { useState, useEffect } from 'react';
import { ZoomIn, Image as ImageIcon } from 'lucide-react';
import { galleryService } from '../../services/galleryService';
import Lightbox from '../common/Lightbox';

const fallbackGallery = [
  {
    _id: 'g1',
    title: 'CO₂ Fire Extinguisher Unit',
    image: '/assets/products/co2-extinguisher.svg',
    category: 'Fire Extinguishers',
  },
  {
    _id: 'g2',
    title: 'ABC Dry Chemical Powder Unit',
    image: '/assets/products/abc-powder-extinguisher.svg',
    category: 'Fire Extinguishers',
  },
  {
    _id: 'g3',
    title: 'Water & Foam Extinguishers',
    image: '/assets/products/foam-extinguisher.svg',
    category: 'Fire Extinguishers',
  },
  {
    _id: 'g4',
    title: 'Fire Hydrant Landing Valve & Hose Reel',
    image: '/assets/products/fire-hydrant.svg',
    category: 'Fire Hydrant Equipment',
  },
  {
    _id: 'g5',
    title: 'Basic Extinguisher Operation Method (P.A.S.S.)',
    image: '/assets/gallery/operation-guide.svg',
    category: 'Fire Extinguisher Operation',
  },
  {
    _id: 'g6',
    title: 'Industrial Fire Hydrant Connection Setup',
    image: '/assets/gallery/hydrant-system.svg',
    category: 'Fire Protection Systems',
  },
];

const CATEGORIES = [
  'All',
  'Fire Extinguishers',
  'Fire Extinguisher Operation',
  'Fire Hydrant Equipment',
  'Fire Protection Systems',
];

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [galleryItems, setGalleryItems] = useState(fallbackGallery);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, item: null });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await galleryService.getAll();
        if (res.data && res.data.length > 0) {
          setGalleryItems(res.data);
        }
      } catch (err) {
        console.warn('Using fallback gallery data:', err.message);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (item) => {
    setLightboxData({ isOpen: true, item });
  };

  const closeLightbox = () => {
    setLightboxData({ isOpen: false, item: null });
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full inline-block mb-3">
            Visual Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Equipment &amp; Systems Gallery
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Visual reference for fire extinguishers, operation guides, and fire hydrant components.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-700 text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item._id || idx}
              onClick={() => openLightbox(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 cursor-pointer shadow-sm hover:shadow-xl hover:border-brand-500/50 transition-all duration-300 aspect-[4/3] flex items-center justify-center p-6"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay with Lightbox Indicator */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="self-end p-2 rounded-xl bg-white/90 text-slate-900 shadow-md">
                  <ZoomIn className="w-4 h-4 text-brand-700" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxData.isOpen && (
        <Lightbox
          isOpen={lightboxData.isOpen}
          image={lightboxData.item?.image}
          title={lightboxData.item?.title}
          category={lightboxData.item?.category}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
};

export default GallerySection;
