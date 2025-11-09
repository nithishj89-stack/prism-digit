import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Food from './models/Food.js';

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding');
    
    // Check if foods already exist
    const existingFoods = await Food.countDocuments();
    if (existingFoods > 0) {
      console.log('Foods already exist in database, skipping seed');
      mongoose.connection.close();
      return;
    }
    
    // Seed food data
    const foods = [
      { name: "Samosa", category: "Snacks", price: 20, emoji: "🥟", time: "All Day" },
      { name: "Veg Burger", category: "Snacks", price: 40, emoji: "🍔", time: "All Day" },
      { name: "French Fries", category: "Snacks", price: 30, emoji: "🍟", time: "All Day" },
      { name: "Paneer Roll", category: "Snacks", price: 50, emoji: "🌯", time: "After 2 PM" },
      { name: "Dal Rice Combo", category: "Meals", price: 80, emoji: "🍛", time: "12-3 PM" },
      { name: "Chicken Biryani", category: "Meals", price: 120, emoji: "🍚", time: "12-3 PM" },
      { name: "Veg Thali", category: "Meals", price: 100, emoji: "🍽️", time: "12-3 PM" },
      { name: "Pasta", category: "Meals", price: 90, emoji: "🍝", time: "After 5 PM" },
      { name: "Cold Coffee", category: "Beverages", price: 50, emoji: "☕", time: "All Day" },
      { name: "Mango Shake", category: "Beverages", price: 60, emoji: "🥤", time: "All Day" },
      { name: "Lemon Soda", category: "Beverages", price: 30, emoji: "🍋", time: "All Day" },
      { name: "Masala Chai", category: "Beverages", price: 20, emoji: "🫖", time: "All Day" },
      { name: "Ice Cream", category: "Desserts", price: 40, emoji: "🍦", time: "All Day" },
      { name: "Brownie", category: "Desserts", price: 60, emoji: "🍰", time: "After 4 PM" },
      { name: "Gulab Jamun", category: "Desserts", price: 30, emoji: "🍮", time: "All Day" },
      { name: "Fruit Salad", category: "Desserts", price: 50, emoji: "🍇", time: "All Day" }
    ];
    
    await Food.insertMany(foods);
    console.log('Food data seeded successfully');
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });