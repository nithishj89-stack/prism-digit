import AdminService from '../services/adminService.js';

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;
    const result = await AdminService.adminLogin(password);
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
    
    const food = await AdminService.toggleFoodAvailability(id, available);
    
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
    const foods = await AdminService.getFoodsWithAvailability();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Initialize default admin user
export const initializeAdmin = async () => {
  await AdminService.initializeAdmin();
};