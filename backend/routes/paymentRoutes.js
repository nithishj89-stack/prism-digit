import express from 'express';
import {
  processPayment,
  getPaymentStatus,
  getAllPayments,
  generateUpiQrCode,
  updateUpiId,
  getUpiId
} from '../controllers/paymentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/payments/process
router.post('/process', processPayment);

// GET /api/payments/status/:paymentId
router.get('/status/:paymentId', getPaymentStatus);

// GET /api/payments (admin only)
router.get('/', verifyToken, getAllPayments);

// POST /api/payments/generate-upi-qr
router.post('/generate-upi-qr', generateUpiQrCode);

// POST /api/payments/update-upi-id (admin only)
router.post('/update-upi-id', verifyToken, updateUpiId);

// GET /api/payments/upi-id
router.get('/upi-id', getUpiId);

export default router;