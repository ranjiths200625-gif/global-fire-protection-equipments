import rateLimit from 'express-rate-limit';

// Standard rate limiter for public API
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per 15 min
  message: {
    success: false,
    message: 'Too many requests created from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for enquiry submissions
export const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 25, // Max 25 enquiries per hour per IP
  message: {
    success: false,
    message: 'Enquiry submission limit reached for this hour. Please contact us directly.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for admin login attempts
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Max 15 login attempts per 15 minutes
  message: {
    success: false,
    message: 'Too many login attempts. Please wait 15 minutes before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
