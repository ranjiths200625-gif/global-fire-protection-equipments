import React, { useState } from 'react';
import { X, Send, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
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

const EnquiryModal = ({ isOpen, onClose, initialItem = 'General Enquiry' }) => {
  const { settings } = useSettings();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    productOrService: initialItem || 'General Enquiry',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      addToast('Please fill in your name, phone number, and message.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await enquiryService.submit(formData);
      setSuccess(true);
      addToast('Your enquiry has been received. We will contact you soon.', 'success');
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          productOrService: 'General Enquiry',
          message: '',
        });
        onClose();
      }, 2000);
    } catch (error) {
      addToast(
        error.response?.data?.message || 'Failed to submit enquiry. Please try again or call us.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    if (!settings.whatsapp) {
      addToast('WhatsApp contact is currently being configured.', 'info');
      return;
    }

    const waUrl = buildWhatsAppUrl(settings.whatsapp, {
      productOrService: formData.productOrService,
      name: formData.name,
      userPhone: formData.phone,
      message: formData.message || 'I would like to discuss requirements.',
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full inline-block">
            Direct Enquiry
          </span>
          <h3 className="text-xl font-heading font-black text-slate-900 mt-2">
            Global Fire Protection Equipments
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Fill out the details below to discuss your fire protection requirements in Kovilpatti.
          </p>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Enquiry Submitted!</h4>
            <p className="text-xs text-slate-600">
              Thank you. Our team will review your requirements and respond shortly.
            </p>
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
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
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
                  placeholder="e.g. 9876543210"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
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
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Equipment / Service Required <span className="text-brand-600">*</span>
              </label>
              <select
                name="productOrService"
                value={formData.productOrService}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all"
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
                Requirement Details / Message <span className="text-brand-600">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention the quantity, type of facility, or refilling requirement..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-red-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>

              {settings.whatsapp && (
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
