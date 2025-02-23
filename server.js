const express = require("express");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());

// Auth routes - no middleware required here
app.use("/api/auth", authRoutes);

// Task routes - middleware is used inside taskRoutes.js
app.use("/api", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
