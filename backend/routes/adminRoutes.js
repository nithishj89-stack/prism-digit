import express from 'express';
import {
  adminLogin,
  toggleFoodAvailability,
  getFoodsWithAvailability
} from '../controllers/adminController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/admin/login
router.post('/login', adminLogin);

// GET /api/admin/foods
router.get('/foods', getFoodsWithAvailability);

// PUT /api/admin/foods/:id/toggle
router.put('/foods/:id/toggle', verifyToken, toggleFoodAvailability);

export default router;