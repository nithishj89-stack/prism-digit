import { db } from './config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Sample food data
const foods = [
  { name: "Samosa", category: "Snacks", price: 20, emoji: "🥟", available: true, time: "All Day" },
  { name: "Veg Burger", category: "Snacks", price: 40, emoji: "🍔", available: true, time: "All Day" },
  { name: "French Fries", category: "Snacks", price: 30, emoji: "🍟", available: true, time: "All Day" },
  { name: "Paneer Roll", category: "Snacks", price: 50, emoji: "🌯", available: false, time: "After 2 PM" },
  { name: "Dal Rice Combo", category: "Meals", price: 80, emoji: "🍛", available: true, time: "12-3 PM" },
  { name: "Chicken Biryani", category: "Meals", price: 120, emoji: "🍚", available: true, time: "12-3 PM" },
  { name: "Veg Thali", category: "Meals", price: 100, emoji: "🍽️", available: true, time: "12-3 PM" },
  { name: "Pasta", category: "Meals", price: 90, emoji: "🍝", available: false, time: "After 5 PM" },
  { name: "Cold Coffee", category: "Beverages", price: 50, emoji: "☕", available: true, time: "All Day" },
  { name: "Mango Shake", category: "Beverages", price: 60, emoji: "🥤", available: true, time: "All Day" },
  { name: "Lemon Soda", category: "Beverages", price: 30, emoji: "🍋", available: true, time: "All Day" },
  { name: "Masala Chai", category: "Beverages", price: 20, emoji: "🫖", available: true, time: "All Day" },
  { name: "Ice Cream", category: "Desserts", price: 40, emoji: "🍦", available: true, time: "All Day" },
  { name: "Brownie", category: "Desserts", price: 60, emoji: "🍰", available: false, time: "After 4 PM" },
  { name: "Gulab Jamun", category: "Desserts", price: 30, emoji: "🍮", available: true, time: "All Day" },
  { name: "Fruit Salad", category: "Desserts", price: 50, emoji: "🍇", available: true, time: "All Day" }
];

// Seed the database
async function seedDatabase() {
  try {
    // Add foods to the foods collection
    const foodsCollection = collection(db, 'foods');
    for (const food of foods) {
      await addDoc(foodsCollection, food);
      console.log(`Added ${food.name} to foods collection`);
    }
    
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase();