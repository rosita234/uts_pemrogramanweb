const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/login", (req, res) => {
  res.render("auth/login");  // Matches views/auth/login.ejs
});

router.get("/register", (req, res) => {
  res.render("auth/register");  // Matches views/auth/register.ejs
});

  

module.exports = router;
