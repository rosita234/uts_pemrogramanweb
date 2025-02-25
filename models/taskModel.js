const db = require('../config/db');
const Task = {
  create: async (userId, title, kategori, description, deadline) => {
    const formattedDeadline = deadline ? new Date(deadline).toISOString().slice(0, 19).replace('T', ' ') : null; // Format to MySQL datetime
  const [result] = await db.promise().query('INSERT INTO tasks (user_id, title, kategori, description, deadline) VALUES (?, ?, ?, ?, ?)', [userId, title, kategori, description, formattedDeadline]);
  },
  findAllByUserId: async (userId) => {
    const [rows] = await db.promise().query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
  },
  update: async (taskId, title, kategori, description, completed, deadline) => {
    const formattedDeadline = deadline ? new Date(deadline).toISOString().slice(0, 19).replace('T', ' ') : null; // Format to MySQL datetime
    await db.promise().query(
      'UPDATE tasks SET title = ?, kategori = ?, description = ?, deadline = ?, completed = ? WHERE id = ?', 
      [title, kategori, description, formattedDeadline, completed, taskId]
    );
  },
  delete: async (taskId) => {
    await db.promise().query('DELETE FROM tasks WHERE id = ?', [taskId]);
  }
};
module.exports = Task;