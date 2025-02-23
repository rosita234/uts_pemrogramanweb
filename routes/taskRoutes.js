const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

router.get("/tasks", authMiddleware, async (req, res) => {
  const tasks = await Task.findAllByUserId(req.user.id);
  res.render("tasks/tasks", { tasks });  // Matches views/tasks/tasks.ejs
}); 
  

module.exports = router;
