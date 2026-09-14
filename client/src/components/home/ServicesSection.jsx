import React, { useState, useEffect } from 'react';
import { Flame, RefreshCw, Wrench, ShieldCheck, MessageSquare } from 'lucide-react';
import { serviceService } from '../../services/serviceService';

const fallbackServices = [
  {
    _id: 's1',
    name: 'Fire Extinguisher Supply',
    description:
      'Supply of portable fire extinguishers including CO₂, ABC dry chemical powder, water, and foam types suitable for commercial, retail, and residential premises.',
    icon: 'Flame',
    color: 'bg-red-50 text-brand-700 border-red-100',
  },
  {
    _id: 's2',
    name: 'Fire Extinguisher Refilling',
    description:
      'Prompt refilling services for discharged or periodic maintenance due fire extinguishers using genuine extinguishing agents and pressure checks.',
    icon: 'RefreshCw',
    color: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    _id: 's3',
    name: 'Fire Extinguisher Service & Maintenance',
    description:
      'Routine inspection, mechanical component check, pressure testing, discharge valve servicing, and maintenance to maintain equipment readiness.',
    icon: 'Wrench',
    color: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    _id: 's4',
    name: 'Fire Hydrant System Services',
    description:
      'Servicing, valve overhaul, hose testing, coupling checks, and maintenance support for commercial and industrial fire hydrant systems.',
    icon: 'ShieldCheck',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
];

const iconMap = {
  Flame: Flame,
  RefreshCw: RefreshCw,
  Wrench: Wrench,
  ShieldCheck: ShieldCheck,
};

const ServicesSection = ({ onOpenEnquiry }) => {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await serviceService.getAll({ activeOnly: true });
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (err) {
        console.warn('Using fallback services data:', err.message);
      }
    };
    loadServices();
  }, []);

  return (
    <section id="services" className="py-20 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full inline-block mb-3">
            Core Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Fire Safety Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Supplying, refilling, and servicing fire extinguishers and fire hydrant systems across Kovilpatti and surrounding areas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Flame;
            return (
              <div
                key={service._id || index}
                className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-brand-700 mb-6 group-hover:scale-110 group-hover:bg-brand-700 group-hover:text-white transition-all duration-300 shadow-xs">
                    <IconComponent className="w-6 h-6 p-0.5" />
                  </div>

                  <h3 className="text-lg font-heading font-black text-slate-900 mb-2.5 group-hover:text-brand-700 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(service.name)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-brand-700 text-slate-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200 hover:border-brand-700 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enquire Service</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
