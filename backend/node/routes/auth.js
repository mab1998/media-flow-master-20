
const express = require('express');
const router = express.Router();

// Mock user data
const users = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
    plan: 'Pro',
    downloads: [],
    downloadCount: 0,
    registrationDate: '2023-01-15T08:00:00.000Z'
  }
];

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'user@example.com' && password === 'password') {
    return res.status(200).json({
      token: `real-jwt-token-${Date.now()}`,
      user: users[0]
    });
  }
  
  return res.status(401).json({
    message: 'Invalid email or password'
  });
});

// Signup endpoint
router.post('/signup', (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }
  
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    name: name || email.split('@')[0],
    plan: 'Free',
    downloads: [],
    downloadCount: 0,
    registrationDate: new Date().toISOString()
  };
  
  // In a real app, we would save the user to a database
  users.push(newUser);
  
  return res.status(201).json({
    token: `real-jwt-token-${Date.now()}`,
    user: newUser
  });
});

// Get current user endpoint
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }
  
  return res.status(200).json(users[0]);
});

module.exports = router;
