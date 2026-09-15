import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Phone, MessageSquare, Menu, X, MapPin } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Navbar = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Operation Guide', path: '/guide' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top micro bar for quick business info */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span className="font-medium">Kadalaur Road, Kovilpatti, Tamil Nadu</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">{settings.workingHours || 'Mon - Sat: 9:00 AM - 7:00 PM'}</span>
            {settings.phone ? (
              <a
                href={`tel:${settings.phone}`}
                className="text-white hover:text-brand-300 flex items-center gap-1.5 font-semibold transition-colors"
              >
                <Phone className="w-3 h-3 text-brand-400" />
                <span>{settings.phone}</span>
              </a>
            ) : (
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="text-white hover:text-brand-300 flex items-center gap-1.5 font-semibold transition-colors"
              >
                <MessageSquare className="w-3 h-3 text-brand-400" />
                <span>Enquire Direct</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header shadow-md'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/logo.png"
                alt="Global Fire Safety Equipments Logo"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                  GLOBAL FIRE
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-brand-700 uppercase">
                  Safety Equipments
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-brand-700 bg-brand-50 border border-brand-100'
                        : 'text-slate-700 hover:text-brand-700 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Action Button */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-sm font-bold transition-all duration-200 shadow-md hover:shadow-red-500/25 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Enquiry</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-brand-700 hover:bg-slate-100 lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-center flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Enquiry</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
