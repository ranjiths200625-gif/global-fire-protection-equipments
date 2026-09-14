import React from 'react';
import { MapPin, Flame } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const AboutSection = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();

  return (
    <section id="about" className="py-20 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information Card */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full inline-block">
              About The Business
            </span>

            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              About Global Fire Protection Equipments
            </h2>

            {/* Strictly factual description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Global Fire Protection Equipments, located on Kadalaur Road, Kovilpatti, supplies fire extinguishers and provides fire extinguisher refilling and service-related solutions. The business also offers fire hydrant system services.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Location &amp; Accessibility</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kadalaur Road, Kovilpatti, Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Product &amp; Service Focus</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Supply and refilling of portable fire extinguishers, along with fire hydrant component support.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry('General Enquiry')}
                className="px-6 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-red-500/20 flex items-center gap-2"
              >
                <span>Contact Business</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Feature Box */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 relative space-y-6 shadow-xl">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Business Capabilities
                </span>
                <h3 className="text-xl font-heading font-black text-slate-900 mt-1">
                  Local Fire Protection Support
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs text-brand-700 font-bold uppercase">Supplies</p>
                  <p className="text-sm font-black text-slate-900 mt-1">Fire Extinguishers</p>
                  <p className="text-xs text-slate-500 mt-1">CO₂, ABC Powder, Water, Foam types</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs text-amber-700 font-bold uppercase">Services</p>
                  <p className="text-sm font-black text-slate-900 mt-1">Extinguisher Refilling</p>
                  <p className="text-xs text-slate-500 mt-1">Timely agent refill and pressure check</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs text-blue-700 font-bold uppercase">Maintenance</p>
                  <p className="text-sm font-black text-slate-900 mt-1">Periodic Inspection</p>
                  <p className="text-xs text-slate-500 mt-1">Physical check and valve servicing</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-xs text-emerald-700 font-bold uppercase">Systems</p>
                  <p className="text-sm font-black text-slate-900 mt-1">Fire Hydrant Systems</p>
                  <p className="text-xs text-slate-500 mt-1">Valves, hoses, and maintenance support</p>
                </div>
              </div>

              <div className="text-xs text-slate-500 border-t border-slate-100 pt-4">
                <p>
                  For equipment specifications or refilling quotes, visit our location on Kadalaur Road or contact us through the enquiry form.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
