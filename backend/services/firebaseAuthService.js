import { auth, db } from '../config/firebase.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Student login
export const studentLogin = async (email, password) => {
  try {
    // For student login, we'll use email as studentId@college.edu format
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional student info in localStorage
    localStorage.setItem('userType', 'student');
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('userEmail', user.email);
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Student login error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Faculty login
export const facultyLogin = async (email, password) => {
  try {
    // For faculty login, we'll use email as facultyId@college.edu format
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional faculty info in localStorage
    localStorage.setItem('userType', 'faculty');
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('userEmail', user.email);
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Faculty login error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Student registration
export const registerStudent = async (studentId, email, password) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store in localStorage
    localStorage.setItem('userType', 'student');
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('userEmail', user.email);
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        studentId: studentId
      }
    };
  } catch (error) {
    console.error('Student registration error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Faculty registration
export const registerFaculty = async (facultyId, email, password) => {
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store in localStorage
    localStorage.setItem('userType', 'faculty');
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('userEmail', user.email);
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        facultyId: facultyId
      }
    };
  } catch (error) {
    console.error('Faculty registration error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    // Clear localStorage
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminToken');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('userId');
};

// Get current user type
export const getCurrentUserType = () => {
  return localStorage.getItem('userType');
};