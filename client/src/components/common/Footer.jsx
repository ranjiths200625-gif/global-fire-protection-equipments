import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Global Fire Safety Equipments Logo"
                className="h-12 w-auto object-contain drop-shadow-md bg-white p-1 rounded-xl"
              />
              <div className="flex flex-col">
                <span className="font-heading font-black text-white text-base leading-tight">
                  GLOBAL FIRE
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-brand-400">
                  Safety Equipments
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Fire Protection Equipment &amp; Services based on Kadalaur Road, Kovilpatti. Supplying portable fire extinguishers, refilling solutions, and fire hydrant system services.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About the Business
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                  Product Inventory
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Refilling &amp; Services
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-slate-400 hover:text-white transition-colors">
                  Operation Guide
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-white transition-colors">
                  Equipment Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products & Services */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase mb-4">
              Equipment &amp; Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                  CO₂ Fire Extinguishers
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                  ABC Dry Powder Units
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                  Water &amp; Foam Types
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors">
                  Fire Hydrant Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors">
                  Extinguisher Refilling
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3.5 text-sm">
            <h4 className="text-white font-heading font-bold text-sm tracking-wider uppercase mb-4">
              Location &amp; Working Hours
            </h4>
            <div className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <span>
                {settings.address || 'Kadalaur Road, Kovilpatti, Tamil Nadu, India'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Clock className="w-5 h-5 text-brand-400 shrink-0" />
              <span>{settings.workingHours || 'Mon - Sat: 9:00 AM - 7:00 PM'}</span>
            </div>
            {settings.phone && (
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white font-semibold transition-colors">
                  {settings.phone}
                </a>
              </div>
            )}
            {settings.email && (
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white font-semibold transition-colors">
                  {settings.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 mb-8 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Website Notice:</strong> Website information is provided for general business and product enquiry purposes. Product suitability and service requirements should be confirmed with the business.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 pt-6 border-t border-slate-800">
          <p>© 2026 Global Fire Protection Equipments. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-white font-medium transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
