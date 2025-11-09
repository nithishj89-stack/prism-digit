// Admin service to handle admin operations
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

let useMongoDB = false;
let AdminModel;

// Try to import MongoDB models
try {
  AdminModel = (await import('../models/Admin.js')).default;
  useMongoDB = true;
  console.log('Using MongoDB for admin data');
} catch (error) {
  console.log('Using environment variables for admin authentication');
}

class AdminService {
  // Admin login
  static async adminLogin(password) {
    // Check if password matches the environment variable
    if (password !== process.env.ADMIN_PASSWORD) {
      throw new Error('Invalid password');
    }
    
    // Create JWT token
    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return {
      message: 'Login successful',
      token,
      authenticated: true
    };
  }

  // Toggle food availability
  static async toggleFoodAvailability(id, available) {
    if (useMongoDB && AdminModel) {
      try {
        // Import Food model here to avoid circular dependencies
        const FoodModel = (await import('../models/Food.js')).default;
        return await FoodModel.findByIdAndUpdate(id, { available }, { new: true });
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    
    // Fallback to in-memory data
    const foods = (await import('../data/foods.js')).getAllFoods();
    const index = foods.findIndex(food => food._id === id);
    if (index === -1) return null;
    
    foods[index].available = available;
    return foods[index];
  }

  // Get all foods with availability status
  static async getFoodsWithAvailability() {
    if (useMongoDB && AdminModel) {
      try {
        // Import Food model here to avoid circular dependencies
        const FoodModel = (await import('../models/Food.js')).default;
        return await FoodModel.find();
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    
    // Fallback to in-memory data
    return (await import('../data/foods.js')).getAllFoods();
  }

  // Initialize default admin user
  static async initializeAdmin() {
    if (useMongoDB && AdminModel) {
      try {
        const existingAdmin = await AdminModel.findOne({ username: 'admin' });
        
        if (!existingAdmin) {
          const admin = new AdminModel({
            username: 'admin',
            password: process.env.ADMIN_PASSWORD
          });
          
          await admin.save();
          console.log('Default admin user created');
        } else {
          console.log('Admin user already exists');
        }
      } catch (error) {
        console.error('Error initializing admin:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    } else {
      console.log('Using environment variable for admin authentication');
    }
  }
}

export default AdminService;