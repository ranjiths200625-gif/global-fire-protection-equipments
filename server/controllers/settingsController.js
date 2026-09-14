import BusinessSettings from '../models/BusinessSettings.js';

// @desc    Get business contact & general settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();

    if (!settings) {
      settings = await BusinessSettings.create({
        companyName: 'GLOBAL FIRE PROTECTION EQUIPMENTS',
        address: 'Kadalaur Road, Kovilpatti, Tamil Nadu, India',
        city: 'Kovilpatti',
        state: 'Tamil Nadu',
        phone: '+91 97517 80504',
        whatsapp: '9751780504',
        email: '',
        googleMapsUrl: '',
        workingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM',
        description:
          'Supplying fire extinguishers and providing fire extinguisher refilling/service. Fire Hydrant System services in Kovilpatti.',
        socialLinks: { facebook: '', instagram: '' },
        verifiedClaims: [],
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update business settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await BusinessSettings.findOne();

    if (!settings) {
      settings = await BusinessSettings.create(req.body);
    } else {
      settings = await BusinessSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Business settings updated successfully',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};
