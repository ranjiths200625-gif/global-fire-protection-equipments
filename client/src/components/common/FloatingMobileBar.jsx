import React from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const FloatingMobileBar = ({ onOpenEnquiry }) => {
  const { settings } = useSettings();

  const hasPhone = !!settings.phone;
  const hasWhatsApp = !!settings.whatsapp;
  const whatsappUrl = hasWhatsApp ? buildWhatsAppUrl(settings.whatsapp) : null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-2.5 sm:hidden shadow-2xl">
      <div className="flex items-center justify-around gap-2 max-w-md mx-auto">
        {hasPhone && (
          <a
            href={`tel:${settings.phone}`}
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4 text-brand-600 mb-1" />
            <span>Call</span>
          </a>
        )}

        {hasWhatsApp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 mb-1" />
            <span>WhatsApp</span>
          </a>
        )}

        <button
          onClick={() => onOpenEnquiry && onOpenEnquiry()}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md hover:shadow-red-500/20 transition-colors"
        >
          <Send className="w-4 h-4 text-white mb-1" />
          <span>Enquiry</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingMobileBar;
