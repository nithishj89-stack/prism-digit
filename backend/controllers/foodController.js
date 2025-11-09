import FoodService from '../services/foodService.js';

// Get all foods
export const getAllFoods = async (req, res) => {
  try {
    const foods = await FoodService.getAllFoods();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get food by ID
export const getFoodById = async (req, res) => {
  try {
    const food = await FoodService.getFoodById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new food
export const createFood = async (req, res) => {
  try {
    const food = await FoodService.createFood(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update food
export const updateFood = async (req, res) => {
  try {
    const food = await FoodService.updateFood(req.params.id, req.body);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete food
export const deleteFood = async (req, res) => {
  try {
    const result = await FoodService.deleteFood(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get foods by category
export const getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await FoodService.getFoodsByCategory(category);
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};