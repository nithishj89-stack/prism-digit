import { studentLogin, facultyLogin, registerStudent, registerFaculty, logout } from '../services/firebaseAuthService.js';
import { db } from '../config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Student login endpoint
export const studentLoginController = async (req, res) => {
  try {
    const { studentId, password } = req.body;
    
    // Create email from studentId (in a real app, you might have a different format)
    const email = `${studentId}@madrascollege.edu`;
    
    const result = await studentLogin(email, password);
    
    if (result.success) {
      res.status(200).json({
        message: 'Student login successful',
        user: result.user,
        userType: 'student'
      });
    } else {
      res.status(401).json({
        message: 'Student login failed',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Student login controller error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Faculty login endpoint
export const facultyLoginController = async (req, res) => {
  try {
    const { facultyId, password } = req.body;
    
    // Create email from facultyId (in a real app, you might have a different format)
    const email = `${facultyId}@madrascollege.edu`;
    
    const result = await facultyLogin(email, password);
    
    if (result.success) {
      res.status(200).json({
        message: 'Faculty login successful',
        user: result.user,
        userType: 'faculty'
      });
    } else {
      res.status(401).json({
        message: 'Faculty login failed',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Faculty login controller error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Student registration endpoint
export const studentRegisterController = async (req, res) => {
  try {
    const { studentId, name, email, password } = req.body;
    
    // Create email from studentId
    const firebaseEmail = `${studentId}@madrascollege.edu`;
    
    const result = await registerStudent(studentId, firebaseEmail, password);
    
    if (result.success) {
      // Save additional student data to Firestore
      try {
        const studentsCollection = collection(db, 'students');
        await addDoc(studentsCollection, {
          uid: result.user.uid,
          studentId: studentId,
          name: name,
          email: firebaseEmail,
          createdAt: new Date()
        });
      } catch (firestoreError) {
        console.error('Error saving student data to Firestore:', firestoreError);
        // Don't fail the registration if Firestore save fails
      }
      
      res.status(201).json({
        message: 'Student registration successful',
        user: result.user,
        userType: 'student'
      });
    } else {
      // Provide more specific error messages
      if (result.error && result.error.includes('auth/operation-not-allowed')) {
        res.status(400).json({
          message: 'Registration is currently disabled',
          error: 'Firebase authentication is not enabled. Please contact the administrator.'
        });
      } else if (result.error && result.error.includes('auth/email-already-in-use')) {
        res.status(400).json({
          message: 'Email already in use',
          error: 'An account with this email already exists. Please use a different email or login instead.'
        });
      } else if (result.error && result.error.includes('auth/invalid-email')) {
        res.status(400).json({
          message: 'Invalid email',
          error: 'Please enter a valid email address.'
        });
      } else if (result.error && result.error.includes('auth/weak-password')) {
        res.status(400).json({
          message: 'Weak password',
          error: 'Password should be at least 6 characters.'
        });
      } else {
        res.status(400).json({
          message: 'Student registration failed',
          error: result.error
        });
      }
    }
  } catch (error) {
    console.error('Student registration controller error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Faculty registration endpoint
export const facultyRegisterController = async (req, res) => {
  try {
    const { facultyId, name, email, password } = req.body;
    
    // Create email from facultyId
    const firebaseEmail = `${facultyId}@madrascollege.edu`;
    
    const result = await registerFaculty(facultyId, firebaseEmail, password);
    
    if (result.success) {
      // Save additional faculty data to Firestore
      try {
        const facultyCollection = collection(db, 'faculty');
        await addDoc(facultyCollection, {
          uid: result.user.uid,
          facultyId: facultyId,
          name: name,
          email: firebaseEmail,
          createdAt: new Date()
        });
      } catch (firestoreError) {
        console.error('Error saving faculty data to Firestore:', firestoreError);
        // Don't fail the registration if Firestore save fails
      }
      
      res.status(201).json({
        message: 'Faculty registration successful',
        user: result.user,
        userType: 'faculty'
      });
    } else {
      // Provide more specific error messages
      if (result.error && result.error.includes('auth/operation-not-allowed')) {
        res.status(400).json({
          message: 'Registration is currently disabled',
          error: 'Firebase authentication is not enabled. Please contact the administrator.'
        });
      } else if (result.error && result.error.includes('auth/email-already-in-use')) {
        res.status(400).json({
          message: 'Email already in use',
          error: 'An account with this email already exists. Please use a different email or login instead.'
        });
      } else if (result.error && result.error.includes('auth/invalid-email')) {
        res.status(400).json({
          message: 'Invalid email',
          error: 'Please enter a valid email address.'
        });
      } else if (result.error && result.error.includes('auth/weak-password')) {
        res.status(400).json({
          message: 'Weak password',
          error: 'Password should be at least 6 characters.'
        });
      } else {
        res.status(400).json({
          message: 'Faculty registration failed',
          error: result.error
        });
      }
    }
  } catch (error) {
    console.error('Faculty registration controller error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Logout endpoint
export const logoutController = async (req, res) => {
  try {
    const result = await logout();
    
    if (result.success) {
      res.status(200).json({
        message: 'Logout successful'
      });
    } else {
      res.status(500).json({
        message: 'Logout failed',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Logout controller error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};