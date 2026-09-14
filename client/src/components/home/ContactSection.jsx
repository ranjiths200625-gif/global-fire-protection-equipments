import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, Loader2, Navigation } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const PRODUCTS_AND_SERVICES = [
  'CO₂ Fire Extinguisher',
  'ABC Dry Chemical Powder Fire Extinguisher',
  'Water Type Fire Extinguisher',
  'Foam Type Fire Extinguisher',
  'Fire Hydrant System',
  'Fire Extinguisher Refilling',
  'Fire Extinguisher Maintenance',
  'General Enquiry',
];

const ContactSection = () => {
  const { settings } = useSettings();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    productOrService: 'General Enquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      addToast('Please fill in required fields (Name, Phone, Message).', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await enquiryService.submit(formData);
      setSuccess(true);
      addToast('Enquiry received. We will contact you soon.', 'success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        productOrService: 'General Enquiry',
        message: '',
      });
    } catch (error) {
      addToast(
        error.response?.data?.message || 'Failed to submit enquiry. Please try again or call us.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = settings.whatsapp
    ? buildWhatsAppUrl(settings.whatsapp, {
        productOrService: formData.productOrService,
        name: formData.name,
        userPhone: formData.phone,
        message: formData.message,
      })
    : null;

  const mapsUrl = settings.googleMapsUrl || 'https://maps.google.com/?q=Kadalaur+Road,+Kovilpatti,+Tamil+Nadu';

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full inline-block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Contact Us &amp; Enquiries
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Contact us to discuss your fire protection requirements, request a refilling service, or enquire about equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Business Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-6 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  Business Location
                </span>
                <h3 className="text-xl font-heading font-black text-slate-900 mt-1">
                  GLOBAL FIRE PROTECTION EQUIPMENTS
                </h3>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-brand-700 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</p>
                    <p className="text-slate-900 font-semibold mt-0.5 leading-snug">
                      {settings.address || 'Kadalaur Road, Kovilpatti, Tamil Nadu, India'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Working Hours</p>
                    <p className="text-slate-900 font-semibold mt-0.5">
                      {settings.workingHours || 'Monday - Saturday: 9:00 AM - 7:00 PM'}
                    </p>
                  </div>
                </div>

                {settings.phone && (
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</p>
                      <a
                        href={`tel:${settings.phone}`}
                        className="text-slate-900 font-bold hover:text-brand-700 transition-colors mt-0.5 block"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings.email && (
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 shrink-0 mt-0.5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</p>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-slate-900 font-bold hover:text-brand-700 transition-colors mt-0.5 block"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-300 shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-brand-600" />
                  <span>Get Directions</span>
                </a>

                {settings.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-red-500/20"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
              <div className="mb-6">
                <h3 className="text-xl font-heading font-black text-slate-900">Send Direct Enquiry</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We will review your requirements and respond promptly.
                </p>
              </div>

              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Enquiry Received!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you. We have saved your enquiry in our records and will contact you regarding your request.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Your Full Name <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Phone Number <span className="text-brand-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Mobile or contact number"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Product or Service <span className="text-brand-600">*</span>
                    </label>
                    <select
                      name="productOrService"
                      value={formData.productOrService}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                    >
                      {PRODUCTS_AND_SERVICES.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Message / Requirement Details <span className="text-brand-600">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please mention your equipment or refilling requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-red-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>

                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-6 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
