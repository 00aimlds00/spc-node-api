const connection = require('../db');

exports.createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and Description are required' });
  }

  connection.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Task created successfully!', taskId: results.insertId });
  });
};

exports.getTasks = (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.updateTask = (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  connection.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task updated successfully!' });
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task deleted successfully!' });
  });
};