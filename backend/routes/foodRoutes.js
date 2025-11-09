import express from 'express';
import {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getFoodsByCategory
} from '../controllers/foodController.js';

const router = express.Router();

// GET /api/foods
router.get('/', getAllFoods);

// GET /api/foods/category/:category
router.get('/category/:category', getFoodsByCategory);

// GET /api/foods/:id
router.get('/:id', getFoodById);

// POST /api/foods
router.post('/', createFood);

// PUT /api/foods/:id
router.put('/:id', updateFood);

// DELETE /api/foods/:id
router.delete('/:id', deleteFood);

export default router;