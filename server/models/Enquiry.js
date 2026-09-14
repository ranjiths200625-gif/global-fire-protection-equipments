import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    productOrService: {
      type: String,
      required: [true, 'Please select a product or service'],
      enum: [
        'CO₂ Fire Extinguisher',
        'ABC Dry Chemical Powder Fire Extinguisher',
        'Water Type Fire Extinguisher',
        'Foam Type Fire Extinguisher',
        'Fire Hydrant System',
        'Fire Extinguisher Refilling',
        'Fire Extinguisher Maintenance',
        'General Enquiry',
      ],
      default: 'General Enquiry',
    },
    message: {
      type: String,
      required: [true, 'Please provide an enquiry message'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Completed', 'Closed'],
      default: 'New',
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
