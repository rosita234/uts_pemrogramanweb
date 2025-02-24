const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);

router.get("/register", (req, res) => {
  res.render("auth/register"); 
});

//route login
router.get("/login", (req, res) => {
  res.render("auth/login"); 
});

//route logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/api/auth/login');
});

module.exports = router;
