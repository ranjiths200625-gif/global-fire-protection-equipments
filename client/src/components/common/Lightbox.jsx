import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Lightbox = ({ isOpen, image, title, category, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 sm:p-8 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-lg transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Image View */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-2xl max-h-[75vh] flex items-center justify-center p-6 w-full">
          <img
            src={image}
            alt={title || 'Fire Protection Equipment'}
            className="max-h-[65vh] w-auto object-contain rounded-xl"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          {category && (
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300 bg-brand-950/80 border border-brand-800/40 px-3 py-1 rounded-full inline-block mb-1.5 shadow-sm">
              {category}
            </span>
          )}
          <h4 className="text-base sm:text-lg font-bold text-white">{title}</h4>
          <p className="text-xs text-slate-300 mt-0.5">Global Fire Protection Equipments, Kovilpatti</p>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
