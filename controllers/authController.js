const Bcrypt = require('bcrypt');

const User = require('../models/userModel');
const { generateToken } = require('../config/auth');

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const userId = await User.create(username, password);
      const token = generateToken(userId);
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Registration failed' });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const isMatch = await Bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      const token = generateToken(user.id);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "login failed." });
    }
  }
};

module.exports = authController;