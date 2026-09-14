import React, { useState, useEffect } from 'react';
import { Flame, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { productService } from '../../services/productService';

const fallbackProducts = [
  {
    _id: '1',
    name: 'CO₂ Fire Extinguishers',
    slug: 'co2-fire-extinguishers',
    category: 'Fire Extinguishers',
    description:
      'CO₂ fire extinguishers are available for suitable applications. Contact us to discuss the appropriate equipment for your needs.',
    image: '/assets/products/co2-extinguisher.svg',
    features: ['Suitable for electrical hazard areas', 'Clean agent leaving no residue', 'Durable discharge horn and cylinder'],
  },
  {
    _id: '2',
    name: 'ABC Dry Chemical Powder Fire Extinguishers',
    slug: 'abc-dry-chemical-powder-fire-extinguishers',
    category: 'Fire Extinguishers',
    description:
      'ABC dry chemical powder fire extinguishers for suitable fire protection applications.',
    image: '/assets/products/abc-powder-extinguisher.svg',
    features: ['Multipurpose fire extinguishing agent', 'Easy-to-read pressure gauge', 'Robust safety pin mechanism'],
  },
  {
    _id: '3',
    name: 'Water Type Fire Extinguishers',
    slug: 'water-type-fire-extinguishers',
    category: 'Fire Extinguishers',
    description:
      'Water-based fire extinguishing equipment for suitable applications.',
    image: '/assets/products/water-extinguisher.svg',
    features: ['Effective cooling action for combustible materials', 'Corrosion-resistant internal lining', 'Simple operation nozzle and trigger'],
  },
  {
    _id: '4',
    name: 'Foam Type Fire Extinguishers',
    slug: 'foam-type-fire-extinguishers',
    category: 'Fire Extinguishers',
    description:
      'Foam fire extinguishing equipment for suitable applications.',
    image: '/assets/products/foam-extinguisher.svg',
    features: ['Forms a blanketing film over liquid surfaces', 'Dual cooling and smothering effect', 'Standard safety pin and valve assembly'],
  },
  {
    _id: '5',
    name: 'Fire Hydrant Systems',
    slug: 'fire-hydrant-systems',
    category: 'Fire Hydrant Systems',
    description:
      'Fire hydrant system equipment and related services. Contact us for requirements and installation/service discussion.',
    image: '/assets/products/fire-hydrant.svg',
    features: ['Hydrant landing valves and coupling accessories', 'Reinforced delivery fire hoses & branch pipes', 'Inspection, testing, and servicing support'],
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
            Supplying fire extinguishers and fire protection equipment for businesses, residential units, and industrial facilities in Kovilpatti.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id || product.slug}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-brand-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
            >
              {/* Product Image Stage */}
              <div className="relative h-64 bg-gradient-to-b from-slate-50 to-slate-100/60 flex items-center justify-center p-6 border-b border-slate-100">
                <img
                  src={product.image || '/assets/products/placeholder.svg'}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
                <span className="absolute top-4 left-4 text-[11px] font-bold text-slate-700 bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1 rounded-full shadow-xs">
                  {product.category || 'Equipment'}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-heading font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Feature Bullets */}
                  {product.features && product.features.length > 0 && (
                    <ul className="mt-4 space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-4">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(product.name)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-brand-700 text-white font-bold text-xs transition-colors duration-200 flex items-center justify-center gap-2 group-hover:bg-brand-700 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
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
            Contact us to discuss appropriate sizing, mounting brackets, placement guidelines, and refilling schedules for your site.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
