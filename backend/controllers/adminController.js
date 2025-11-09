import { authenticateAdmin, getAdminByUsername, createAdmin } from '../services/firebaseAdminService.js';

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;
    const result = await authenticateAdmin(password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message || 'Invalid password' });
  }
};

// Toggle food availability
export const toggleFoodAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;
    
    // Import the toggle function from food service
    const { toggleFoodAvailability } = await import('../services/foodService.js');
    
    const food = await toggleFoodAvailability(id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all foods with availability status
export const getFoodsWithAvailability = async (req, res) => {
  try {
    // Import the get function from food service
    const { getAllFoods } = await import('../services/foodService.js');
    
    const foods = await getAllFoods();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Initialize default admin user
export const initializeAdmin = async () => {
  // For now, we're not initializing an admin user in Supabase
  // The authentication is handled through the ADMIN_PASSWORD environment variable
  console.log('Admin initialization skipped for Supabase implementation');
};