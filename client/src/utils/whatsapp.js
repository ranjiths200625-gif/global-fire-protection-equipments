/**
 * WhatsApp Helper for Global Fire Protection Equipments
 * Generates an inquiry message matching the strict business format
 */
export const buildWhatsAppUrl = (phone, data = {}) => {
  if (!phone) return null;

  // Clean phone number (remove +, spaces, hyphens)
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  
  // If Indian number without country code (10 digits), prepend 91
  if (cleanPhone.length === 10) {
    cleanPhone = `91${cleanPhone}`;
  }

  const {
    productOrService = 'Fire Protection Equipment & Services',
    name = '',
    userPhone = '',
    message = '',
  } = data;

  let text = `Hello Global Fire Protection Equipments,\nI would like to enquire about ${productOrService}.`;
  
  if (name) text += `\nName: ${name}`;
  if (userPhone) text += `\nPhone: ${userPhone}`;
  if (message) text += `\nMessage: ${message}`;

  const encodedMessage = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};
