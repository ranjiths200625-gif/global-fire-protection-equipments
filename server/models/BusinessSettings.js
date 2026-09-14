import mongoose from 'mongoose';

const businessSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'GLOBAL FIRE PROTECTION EQUIPMENTS',
      trim: true,
    },
    address: {
      type: String,
      default: 'Kadalaur Road, Kovilpatti, Tamil Nadu, India',
      trim: true,
    },
    city: {
      type: String,
      default: 'Kovilpatti',
      trim: true,
    },
    state: {
      type: String,
      default: 'Tamil Nadu',
      trim: true,
    },
    phone: {
      type: String,
      default: '', // Configurable by admin
      trim: true,
    },
    whatsapp: {
      type: String,
      default: '', // Configurable by admin
      trim: true,
    },
    email: {
      type: String,
      default: '', // Configurable by admin
      trim: true,
    },
    googleMapsUrl: {
      type: String,
      default: '',
      trim: true,
    },
    workingHours: {
      type: String,
      default: 'Monday - Saturday: 9:00 AM - 7:00 PM',
      trim: true,
    },
    description: {
      type: String,
      default:
        'Supplying fire extinguishers and providing fire extinguisher refilling/service. Fire Hydrant System services in Kovilpatti and surrounding regions.',
      trim: true,
    },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    // Optional verified business claims: ONLY displayed if explicitly added by business owner
    verifiedClaims: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const BusinessSettings = mongoose.model('BusinessSettings', businessSettingsSchema);
export default BusinessSettings;
