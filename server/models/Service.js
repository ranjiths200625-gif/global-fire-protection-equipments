import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a service name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a service description'],
      trim: true,
    },
    icon: {
      type: String,
      default: 'ShieldAlert',
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
