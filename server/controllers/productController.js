import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, activeOnly } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (activeOnly === 'true' || !req.headers.authorization) {
      filter.active = true;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    let product;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.id);
    } else {
      product = await Product.findOne({ slug: req.params.id });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, features, active } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    let parsedFeatures = [];
    if (typeof features === 'string') {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = features.split(',').map((f) => f.trim()).filter(Boolean);
      }
    } else if (Array.isArray(features)) {
      parsedFeatures = features;
    }

    const product = await Product.create({
      name,
      description,
      category: category || 'Fire Extinguishers',
      image: image || '/assets/products/placeholder.svg',
      features: parsedFeatures,
      active: active !== undefined ? active : true,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const updateData = { ...req.body };

    if (req.file) {
      // Remove old uploaded file if it was in /uploads/
      if (product.image && product.image.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), product.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (updateData.features && typeof updateData.features === 'string') {
      try {
        updateData.features = JSON.parse(updateData.features);
      } catch {
        updateData.features = updateData.features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete image if local upload
    if (product.image && product.image.startsWith('/uploads/')) {
      const imgPath = path.join(process.cwd(), product.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
