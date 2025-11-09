import express from 'express';
import {
  studentLoginController,
  facultyLoginController,
  studentRegisterController,
  facultyRegisterController,
  logoutController
} from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/student/login
router.post('/student/login', studentLoginController);

// POST /api/auth/faculty/login
router.post('/faculty/login', facultyLoginController);

// POST /api/auth/student/register
router.post('/student/register', studentRegisterController);

// POST /api/auth/faculty/register
router.post('/faculty/register', facultyRegisterController);

// POST /api/auth/logout
router.post('/logout', logoutController);

export default router;