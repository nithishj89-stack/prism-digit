import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';

// Get current UPI ID
export const getUpiId = async () => {
  try {
    // For now, we'll return the UPI ID from environment variables
    return process.env.UPI_ID || 'canteen@upi';
  } catch (error) {
    console.error('Error fetching UPI ID:', error);
    throw error;
  }
};

// Update UPI ID
export const updateUpiId = async (newUpiId) => {
  try {
    // For now, we'll just return the new UPI ID
    // In a real application, you might store this in Firebase
    return newUpiId;
  } catch (error) {
    console.error('Error updating UPI ID:', error);
    throw error;
  }
};

// Process a payment
export const processPayment = async (paymentData) => {
  try {
    const paymentsCollection = collection(db, 'payments');
    const docRef = await addDoc(paymentsCollection, paymentData);
    
    return {
      id: docRef.id,
      ...paymentData
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

// Get payment by ID
export const getPaymentById = async (paymentId) => {
  try {
    const paymentDoc = doc(db, 'payments', paymentId);
    const paymentSnapshot = await getDoc(paymentDoc);
    
    if (paymentSnapshot.exists()) {
      return {
        id: paymentSnapshot.id,
        ...paymentSnapshot.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
};

// Get all payments
export const getAllPayments = async () => {
  try {
    const paymentsCollection = collection(db, 'payments');
    const q = query(paymentsCollection, orderBy('timestamp', 'desc'));
    const paymentsSnapshot = await getDocs(q);
    const paymentsList = paymentsSnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    return paymentsList;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};