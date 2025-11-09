import { getAllFoods, getFoodById, createFood, updateFood, deleteFood, toggleFoodAvailability } from '../services/firebaseFoodService.js';

// Get all foods
export const getAllFoodsController = async (req, res) => {
  try {
    const foods = await getAllFoods();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get food by ID
export const getFoodByIdController = async (req, res) => {
  try {
    const food = await getFoodById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get foods by category
export const getFoodsByCategoryController = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await getAllFoods();
    const filteredFoods = foods.filter(food => food.category === category);
    res.json(filteredFoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new food
export const createFoodController = async (req, res) => {
  try {
    const food = await createFood(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update food
export const updateFoodController = async (req, res) => {
  try {
    const food = await updateFood(req.params.id, req.body);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete food
export const deleteFoodController = async (req, res) => {
  try {
    const result = await deleteFood(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle food availability
export const toggleFoodAvailabilityController = async (req, res) => {
  try {
    const food = await toggleFoodAvailability(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
