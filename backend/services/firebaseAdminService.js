import { db, auth } from '../config/firebase.js';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import jwt from 'jsonwebtoken';

// Admin password for authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'username@123mec';

// Authenticate admin
export const authenticateAdmin = async (password) => {
  // In a real application, you would hash and compare passwords
  // For now, we're using a simple comparison
  if (password === ADMIN_PASSWORD) {
    // Generate JWT token
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'fallback_secret_key', {
      expiresIn: '24h'
    });
    return { authenticated: true, token };
  }
  return { authenticated: false, message: 'Invalid password' };
};

// Get admin by username
export const getAdminByUsername = async (username) => {
  try {
    const adminsCollection = collection(db, 'admins');
    const q = query(adminsCollection, where('username', '==', username));
    const adminsSnapshot = await getDocs(q);
    
    if (!adminsSnapshot.empty) {
      const adminDoc = adminsSnapshot.docs[0];
      return {
        id: adminDoc.id,
        ...adminDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching admin:', error);
    return null;
  }
};

// Create admin
export const createAdmin = async (adminData) => {
  try {
    const adminsCollection = collection(db, 'admins');
    const docRef = await addDoc(adminsCollection, adminData);
    
    return {
      id: docRef.id,
      ...adminData
    };
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};