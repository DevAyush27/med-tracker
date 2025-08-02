const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
router.post('/register', async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  
  console.log('Registration attempt:', { name, email, phone, role });
  console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
  
  try {
    // Validate required fields
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ msg: 'Please provide name, email, and password' });
    }
    
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    console.log('Creating new user...');
    user = new User({ name, email, password, phone, role: role || 'patient' });
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    console.log('Saving user to database...');
    await user.save();
    console.log('User saved successfully:', user._id);
    
    const payload = { user: { id: user.id } };
    
    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined!');
      return res.status(500).json({ msg: 'Server configuration error' });
    }
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          console.error('JWT sign error:', err);
          return res.status(500).json({ msg: 'Token generation failed' });
        }
        console.log('Registration successful, token generated');
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router; 