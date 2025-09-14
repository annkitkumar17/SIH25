const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = admin.auth();
const db = admin.firestore();

const router = express.Router();

// Helper function to generate JWT token
const generateToken = (uid, email, username) => {
  const payload = {
    uid,
    email,
    username,
    iat: Math.floor(Date.now() / 1000)
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password ,role  } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if user already exists
    try {
      await auth.getUserByEmail(email);
      return res.status(400).json({ message: 'User with this email already exists' });
    } catch (error) {
      // User doesn't exist, continue
    }

    // Check if username already exists
    const usernameQuery = await db.collection('users').where('username', '==', username).get();
    if (!usernameQuery.empty) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email: email.toLowerCase().trim(),
      password: password,
      displayName: username
    });

    // Hash password (for additional backend storage if needed)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Store additional user data in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      role: role, // Default role
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Generate JWT token
    const token = generateToken(userRecord.uid, email, username);

    // Return success response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: userRecord.uid,
        username,
        email,
        role,
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Firebase specific errors
    if (error.code === 'auth/weak-password') {
      return res.status(400).json({ message: 'Password should be at least 6 characters' });
    }
    if (error.code === 'auth/invalid-email') {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Sign in with Firebase Auth
    const userRecord = await auth.getUserByEmail(email.toLowerCase().trim());
    
    // Get user data from Firestore
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    if (!userDoc.exists) {
      return res.status(400).json({ message: 'User not found' });
    }

    const userData = userDoc.data();

    // Generate JWT token
    const token = generateToken(userRecord.uid, email, userData.username);

    // Return success response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: userRecord.uid,
        username: userData.username,
        email: userData.email,
        role: userData.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    
    if (error.code === 'auth/user-not-found') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (error.code === 'auth/wrong-password') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// Protected Route Example
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from Firebase
    const userRecord = await auth.getUser(decoded.uid);
    const userDoc = await db.collection('users').doc(decoded.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();

    res.json({
      user: {
        id: decoded.uid,
        username: userData.username,
        email: userData.email,
        role: userData.role
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;