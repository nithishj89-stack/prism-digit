import express from 'express';
import {
  processPaymentController,
  getPaymentStatusController,
  getAllPaymentsController,
  generateUpiQrCode,
  updateUpiIdController,
  getUpiIdController
} from '../controllers/paymentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/payments/process
router.post('/process', processPaymentController);

// GET /api/payments/status/:paymentId
router.get('/status/:paymentId', getPaymentStatusController);

// GET /api/payments (admin only)
router.get('/', verifyToken, getAllPaymentsController);

// POST /api/payments/generate-upi-qr
router.post('/generate-upi-qr', generateUpiQrCode);

// POST /api/payments/update-upi-id (admin only)
router.post('/update-upi-id', verifyToken, updateUpiIdController);

// GET /api/payments/upi-id
router.get('/upi-id', getUpiIdController);

export default router;