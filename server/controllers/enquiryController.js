import Enquiry from '../models/Enquiry.js';

// @desc    Submit new enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, email, productOrService, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, phone number, and enquiry message.',
      });
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      email: email || '',
      productOrService: productOrService || 'General Enquiry',
      message,
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your enquiry. We will get back to you shortly.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
export const getEnquiries = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    // Summary counts for admin KPI dashboard
    const totalCount = await Enquiry.countDocuments();
    const newCount = await Enquiry.countDocuments({ status: 'New' });
    const contactedCount = await Enquiry.countDocuments({ status: 'Contacted' });
    const completedCount = await Enquiry.countDocuments({ status: 'Completed' });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      metrics: {
        total: totalCount,
        new: newCount,
        contacted: contactedCount,
        completed: completedCount,
      },
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
export const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry record not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status and notes
// @route   PATCH /api/enquiries/:id
// @access  Private (Admin)
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const updateData = {};

    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
