import React from 'react';
import { Flame, RefreshCw, Wrench, Shield, MapPin, MessageSquare } from 'lucide-react';

const servicePoints = [
  {
    title: 'Fire Protection Equipment',
    description: 'Supplying various portable fire extinguishers including CO₂, ABC dry chemical powder, water, and foam types.',
    icon: Flame,
    color: 'text-brand-700 bg-red-50 border-red-100',
  },
  {
    title: 'Extinguisher Refilling Service',
    description: 'Providing refilling solutions for empty, used, or due fire extinguishers with appropriate agents.',
    icon: RefreshCw,
    color: 'text-amber-700 bg-amber-50 border-amber-100',
  },
  {
    title: 'Maintenance Support',
    description: 'Support for routine physical inspections, gauge checks, valve maintenance, and equipment readiness checks.',
    icon: Wrench,
    color: 'text-blue-700 bg-blue-50 border-blue-100',
  },
  {
    title: 'Fire Hydrant System Services',
    description: 'Maintenance, valve inspection, and component servicing for commercial fire hydrant installations.',
    icon: Shield,
    color: 'text-indigo-700 bg-indigo-50 border-indigo-100',
  },
  {
    title: 'Local Service in Kovilpatti',
    description: 'Conveniently located on Kadalaur Road to serve businesses, factories, and properties across Kovilpatti.',
    icon: MapPin,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  },
  {
    title: 'Product Enquiry Support',
    description: 'Direct assistance to help you select appropriate equipment types for your building layout and safety needs.',
    icon: MessageSquare,
    color: 'text-purple-700 bg-purple-50 border-purple-100',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full inline-block mb-3">
            Service Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Our Business Offerings
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Essential fire protection equipment and local servicing support for your property.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicePoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-brand-500/50 hover:bg-white transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
