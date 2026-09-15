import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { productService } from '../../services/productService';

const fallbackProducts = [
  {
    _id: '1',
    name: 'Fire Extinguishers',
    slug: 'fire-extinguishers',
    category: 'Fire Extinguishers',
    description:
      'Available in ABC Powder, CO₂, Water, Foam, and Wet Chemical types.',
    image: '/assets/products/fire-extinguishers.jpg',
  },
  {
    _id: '2',
    name: 'Fire Hose Box',
    slug: 'fire-hose-box',
    category: 'Fire Hydrant Systems',
    description:
      'Heavy-duty dual-door cabinet for canvas fire hoses and branch pipes.',
    image: '/assets/products/fire-hose-box.jpg',
  },
  {
    _id: '3',
    name: 'Fire Hose Reel',
    slug: 'fire-hose-reel',
    category: 'Fire Hydrant Systems',
    description:
      'Wall-mounted drum system for rapid water discharge and firefighting.',
    image: '/assets/products/fire-hose-reel.jpg',
  },
  {
    _id: '4',
    name: 'Fire Extinguisher Operation Method Sign Board',
    slug: 'fire-extinguisher-operation-sign-board',
    category: 'Safety Signage',
    description:
      'Bilingual (English & Tamil) P.A.S.S. method safety sign board.',
    image: '/assets/products/fire-extinguisher-operation-sign.jpg',
  },
];

const ProductsSection = ({ onOpenEnquiry }) => {
  const [products, setProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await productService.getAll({ activeOnly: true });
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn('Using fallback products data:', err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <section id="products" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full inline-block mb-3">
            Fire Safety Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Fire Protection Equipment
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Supplying essential fire extinguishers, hydrant equipment, and safety signboards for facilities in Kovilpatti.
          </p>
        </div>

        {/* Products Grid - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id || product.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-brand-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
            >
              {/* Product Image Stage */}
              <div className="relative h-60 bg-gradient-to-b from-slate-50 to-slate-100/70 flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden">
                <img
                  src={product.image || '/assets/products/placeholder.svg'}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm rounded-xl"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold text-slate-700 bg-white/95 backdrop-blur-sm border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
                  {product.category || 'Equipment'}
                </span>
              </div>

              {/* Product Content - Name & Small Description Only */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-heading font-black text-slate-900 group-hover:text-brand-700 transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(product.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-brand-700 text-white font-bold text-xs transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-brand-700 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enquire Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          <p>
            Contact us for pricing, installation advice, sizing recommendations, and refilling support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
