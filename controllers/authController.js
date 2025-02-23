const User = require("../models/userModel");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcryptjs");

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const userId = await User.create(username, password);
      const token = generateToken(userId);
      console.log("New user registered:", username);
      console.log("Generated Token:", token);
  
      // ✅ Send the token as JSON
      res.status(201).json({ message: "Register account successful", token });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Registration failed" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    console.log("Username from form:", username);
    console.log("Password from form:", password);
  
    try {
      const user = await User.findByUsername(username);
      console.log("User from DB:", user);
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch);
  
      if (!isMatch) {
        console.log("Invalid credentials");
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = generateToken(user.id);
      res.json({ token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login failed" });
    }
  },
};

console.log("User from DB:", User);


module.exports = authController;
