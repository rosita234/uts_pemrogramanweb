const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get("/register", (req, res) => {
  res.render("auth/register"); 
});

router.get("/login", (req, res) => {
  res.render("auth/login"); 
});

module.exports = router;
