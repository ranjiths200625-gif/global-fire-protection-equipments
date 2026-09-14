import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Phone, MessageCircle, MapPin, CheckCircle2, Flame, Wrench, RefreshCw, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const Hero = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();

  const whatsappUrl = settings.whatsapp ? buildWhatsAppUrl(settings.whatsapp) : null;
  const mapsUrl = settings.googleMapsUrl || 'https://maps.google.com/?q=Kadalaur+Road,+Kovilpatti,+Tamil+Nadu';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/60 via-white to-slate-50 pt-10 pb-20 lg:py-24 border-b border-slate-200">
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 hero-pattern-light pointer-events-none opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-red-200/80 text-xs font-bold text-brand-800 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span>Kadalaur Road, Kovilpatti, Tamil Nadu</span>
            </div>

            {/* Company Name & Headline */}
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] font-extrabold text-brand-700 mb-2">
                Fire Protection Equipment &amp; Services
              </span>
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-heading font-black text-slate-900 tracking-tight leading-[1.15]">
                GLOBAL FIRE <br className="hidden sm:inline" />
                <span className="text-gradient-red">PROTECTION EQUIPMENTS</span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Reliable fire protection equipment, extinguisher refilling and fire hydrant system services in Kovilpatti.
            </p>

            {/* Quick Service Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-brand-700 flex items-center justify-center mb-2 font-bold">
                  <Flame className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900">Extinguisher Supply</p>
                <p className="text-[11px] text-slate-500 mt-0.5">CO₂, ABC, Water, Foam</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 font-bold">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900">Refilling Service</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Timely local refill</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-2 font-bold">
                  <Wrench className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-900">Hydrant Services</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Valves &amp; hose systems</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/products"
                className="px-6 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-lg hover:shadow-red-500/25 transition-all duration-200 flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>View Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry('General Enquiry')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                Contact Us
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-sm transition-all duration-200 flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Get Directions</span>
              </a>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              )}
            </div>

          </div>

          {/* Right Visual Showcase Composition */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-white border border-slate-200 p-6 flex flex-col items-center justify-between shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
              
              {/* Top Card Badge */}
              <div className="w-full flex justify-between items-center text-xs font-semibold text-slate-500 border-b border-slate-100 pb-3">
                <span className="flex items-center gap-1.5 text-brand-700 font-bold">
                  <Flame className="w-4 h-4 text-brand-600" />
                  Safety Equipment
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                  Kovilpatti Hub
                </span>
              </div>

              {/* Center Composition Image with Bright Soft Glow */}
              <div className="relative my-auto w-48 sm:w-56 h-64 sm:h-72 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-red-100/40 rounded-full blur-2xl -z-10" />
                <img
                  src="/assets/products/co2-extinguisher.svg"
                  alt="CO2 Fire Extinguisher Unit"
                  className="max-h-full max-w-full drop-shadow-xl object-contain"
                />
              </div>

              {/* Floating Feature Tag */}
              <div className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">CO₂ &amp; ABC Dry Powder</p>
                  <p className="text-[11px] text-slate-500">Available for commercial &amp; industrial sites</p>
                </div>
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry('CO₂ Fire Extinguisher')}
                  className="px-3 py-1.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Enquire
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
