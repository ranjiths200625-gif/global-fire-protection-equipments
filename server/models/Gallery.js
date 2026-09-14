import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an image title'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL/path'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Fire Extinguishers',
        'Fire Extinguisher Operation',
        'Fire Hydrant Equipment',
        'Fire Protection Systems',
      ],
      default: 'Fire Extinguishers',
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
