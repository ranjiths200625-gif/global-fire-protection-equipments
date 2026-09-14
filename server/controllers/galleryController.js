import Gallery from '../models/Gallery.js';
import fs from 'fs';
import path from 'path';

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload new gallery image
// @route   POST /api/gallery
// @access  Private (Admin)
export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, category } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image file or URL',
      });
    }

    const galleryItem = await Gallery.create({
      title: title || 'Fire Safety Equipment',
      category: category || 'Fire Extinguishers',
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Gallery item added successfully',
      data: galleryItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
export const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    if (item.image && item.image.startsWith('/uploads/')) {
      const imgPath = path.join(process.cwd(), item.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
