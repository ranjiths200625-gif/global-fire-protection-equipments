import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.route('/')
  .post(enquiryLimiter, createEnquiry)
  .get(protect, getEnquiries);

router.route('/:id')
  .get(protect, getEnquiryById)
  .patch(protect, updateEnquiryStatus)
  .delete(protect, deleteEnquiry);

export default router;
