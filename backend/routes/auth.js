const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });

// GET /api/auth/test - check if auth route is reachable
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working', mongoState: require('mongoose').connection.readyState });
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Signup request received:', req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      console.log('Email already exists');
      return res.status(400).json({ message: 'Email already registered. Please login instead.' });
    }

    const user = await User.create({ name: name.trim(), email: email.toLowerCase(), password });
    console.log('User created:', user._id);

    const token = signToken(user);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body?.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'No account found with this email. Please sign up.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Wrong password for:', email);
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    const token = signToken(user);
    console.log('Login success:', user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
