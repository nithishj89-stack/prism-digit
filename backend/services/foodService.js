// Food service to handle data operations
// Can work with both MongoDB and in-memory storage

let useMongoDB = false;

// Try to import MongoDB models
let FoodModel;
try {
  FoodModel = (await import('../models/Food.js')).default;
  useMongoDB = true;
  console.log('Using MongoDB for food data');
} catch (error) {
  console.log('Using in-memory storage for food data');
}

// In-memory food data store (fallback)
let foods = [
  { _id: '1', id: 1, name: "Samosa", category: "Snacks", price: 20, emoji: "🥟", available: true, time: "All Day" },
  { _id: '2', id: 2, name: "Veg Burger", category: "Snacks", price: 40, emoji: "🍔", available: true, time: "All Day" },
  { _id: '3', id: 3, name: "French Fries", category: "Snacks", price: 30, emoji: "🍟", available: true, time: "All Day" },
  { _id: '4', id: 4, name: "Paneer Roll", category: "Snacks", price: 50, emoji: "🌯", available: false, time: "After 2 PM" },
  { _id: '5', id: 5, name: "Dal Rice Combo", category: "Meals", price: 80, emoji: "🍛", available: true, time: "12-3 PM" },
  { _id: '6', id: 6, name: "Chicken Biryani", category: "Meals", price: 120, emoji: "🍚", available: true, time: "12-3 PM" },
  { _id: '7', id: 7, name: "Veg Thali", category: "Meals", price: 100, emoji: "🍽️", available: true, time: "12-3 PM" },
  { _id: '8', id: 8, name: "Pasta", category: "Meals", price: 90, emoji: "🍝", available: false, time: "After 5 PM" },
  { _id: '9', id: 9, name: "Cold Coffee", category: "Beverages", price: 50, emoji: "☕", available: true, time: "All Day" },
  { _id: '10', id: 10, name: "Mango Shake", category: "Beverages", price: 60, emoji: "🥤", available: true, time: "All Day" },
  { _id: '11', id: 11, name: "Lemon Soda", category: "Beverages", price: 30, emoji: "🍋", available: true, time: "All Day" },
  { _id: '12', id: 12, name: "Masala Chai", category: "Beverages", price: 20, emoji: "🫖", available: true, time: "All Day" },
  { _id: '13', id: 13, name: "Ice Cream", category: "Desserts", price: 40, emoji: "🍦", available: true, time: "All Day" },
  { _id: '14', id: 14, name: "Brownie", category: "Desserts", price: 60, emoji: "🍰", available: false, time: "After 4 PM" },
  { _id: '15', id: 15, name: "Gulab Jamun", category: "Desserts", price: 30, emoji: "🍮", available: true, time: "All Day" },
  { _id: '16', id: 16, name: "Fruit Salad", category: "Desserts", price: 50, emoji: "🍇", available: true, time: "All Day" }
];

class FoodService {
  // Get all foods
  static async getAllFoods() {
    if (useMongoDB && FoodModel) {
      try {
        return await FoodModel.find();
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    return foods;
  }

  // Get food by ID
  static async getFoodById(id) {
    if (useMongoDB && FoodModel) {
      try {
        return await FoodModel.findById(id);
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    return foods.find(food => food._id === id);
  }

  // Create new food
  static async createFood(foodData) {
    if (useMongoDB && FoodModel) {
      try {
        const food = new FoodModel(foodData);
        return await food.save();
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    
    const newFood = {
      _id: String(foods.length + 1),
      ...foodData
    };
    foods.push(newFood);
    return newFood;
  }

  // Update food
  static async updateFood(id, updates) {
    if (useMongoDB && FoodModel) {
      try {
        return await FoodModel.findByIdAndUpdate(id, updates, { new: true });
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    
    const index = foods.findIndex(food => food._id === id);
    if (index === -1) return null;
    
    foods[index] = { ...foods[index], ...updates };
    return foods[index];
  }

  // Delete food
  static async deleteFood(id) {
    if (useMongoDB && FoodModel) {
      try {
        return await FoodModel.findByIdAndDelete(id);
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    
    const index = foods.findIndex(food => food._id === id);
    if (index === -1) return false;
    
    foods.splice(index, 1);
    return true;
  }

  // Get foods by category
  static async getFoodsByCategory(category) {
    if (useMongoDB && FoodModel) {
      try {
        return await FoodModel.find({ category });
      } catch (error) {
        console.error('MongoDB error, falling back to in-memory:', error.message);
        useMongoDB = false; // Disable MongoDB for future calls
      }
    }
    return foods.filter(food => food.category === category);
  }
}

export default FoodService;