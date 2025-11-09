import express from 'express';
import {
  getAllFoodsController,
  getFoodByIdController,
  createFoodController,
  updateFoodController,
  deleteFoodController,
  getFoodsByCategoryController
} from '../controllers/foodController.js';

const router = express.Router();

// GET /api/foods
router.get('/', getAllFoodsController);

// GET /api/foods/category/:category
router.get('/category/:category', getFoodsByCategoryController);

// GET /api/foods/:id
router.get('/:id', getFoodByIdController);

// POST /api/foods
router.post('/', createFoodController);

// PUT /api/foods/:id
router.put('/:id', updateFoodController);

// DELETE /api/foods/:id
router.delete('/:id', deleteFoodController);

export default router;