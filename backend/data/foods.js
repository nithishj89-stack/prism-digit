// In-memory food data store
export let foods = [
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

export const getAllFoods = () => foods;

export const getFoodById = (id) => foods.find(food => food._id === id);

export const createFood = (food) => {
  const newFood = {
    _id: String(foods.length + 1),
    ...food
  };
  foods.push(newFood);
  return newFood;
};

export const updateFood = (id, updates) => {
  const index = foods.findIndex(food => food._id === id);
  if (index === -1) return null;
  
  foods[index] = { ...foods[index], ...updates };
  return foods[index];
};

export const deleteFood = (id) => {
  const index = foods.findIndex(food => food._id === id);
  if (index === -1) return false;
  
  foods.splice(index, 1);
  return true;
};

export const getFoodsByCategory = (category) => {
  return foods.filter(food => food.category === category);
};