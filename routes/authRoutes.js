const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();


router.get("/register", (req, res) => {
  res.render("auth/register"); 
});

router.get("/login", (req, res) => {
  res.render("auth/login"); 
});

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
