const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


require('dotenv').config();

//Middleware for JSON body parsing
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//View Engine
app.set('view engine', 'ejs');

//API Routes
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

//CSS
app.use(express.static('public'));


// Route to Render the HTML/EJS Page
app.get('/tasks', (req, res) => {
  res.render('tasks/tasks'); // This will look for 'views/tasks.ejs'
});

// Your API Route
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await getTasksFromDatabase(); // however you're fetching tasks
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


//Home Route
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});