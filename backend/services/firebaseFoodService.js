import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// Get all foods
export const getAllFoods = async () => {
  try {
    const foodsCollection = collection(db, 'foods');
    const foodsSnapshot = await getDocs(foodsCollection);
    const foodsList = foodsSnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    return foodsList;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

// Get food by ID
export const getFoodById = async (id) => {
  try {
    const foodDoc = doc(db, 'foods', id);
    const foodSnapshot = await getDoc(foodDoc);
    
    if (foodSnapshot.exists()) {
      return {
        id: foodSnapshot.id,
        ...foodSnapshot.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching food by ID:', error);
    throw error;
  }
};

// Create a new food item
export const createFood = async (food) => {
  try {
    const foodsCollection = collection(db, 'foods');
    const docRef = await addDoc(foodsCollection, food);
    
    return {
      id: docRef.id,
      ...food
    };
  } catch (error) {
    console.error('Error creating food:', error);
    throw error;
  }
};

// Update a food item
export const updateFood = async (id, updates) => {
  try {
    const foodDoc = doc(db, 'foods', id);
    await updateDoc(foodDoc, updates);
    
    // Return the updated food
    const updatedFood = await getFoodById(id);
    return updatedFood;
  } catch (error) {
    console.error('Error updating food:', error);
    throw error;
  }
};

// Delete a food item
export const deleteFood = async (id) => {
  try {
    const foodDoc = doc(db, 'foods', id);
    await deleteDoc(foodDoc);
    return true;
  } catch (error) {
    console.error('Error deleting food:', error);
    throw error;
  }
};

// Toggle food availability
export const toggleFoodAvailability = async (id) => {
  try {
    // First get the current food item
    const currentFood = await getFoodById(id);
    if (!currentFood) {
      throw new Error('Food not found');
    }

    // Toggle the availability
    const foodDoc = doc(db, 'foods', id);
    await updateDoc(foodDoc, { available: !currentFood.available });
    
    // Return the updated food
    const updatedFood = await getFoodById(id);
    return updatedFood;
  } catch (error) {
    console.error('Error toggling food availability:', error);
    throw error;
  }
};