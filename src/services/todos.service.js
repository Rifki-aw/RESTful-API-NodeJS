const dbPool = require('../config/database');

const getTodoById = async (id) => {
  const query = `
    SELECT users.username, todos.title, todos.description, todos.deadline
    FROM todos
    JOIN users ON todos.user_id = users.id
    WHERE todos.id = ?`;
  
  const [rows] = await dbPool.execute(query, [id]);
  return rows[0];
};

const getTodosByUserId = async (userId) => {
  const query = 'SELECT todos.title, todos.description, todos.deadline FROM todos JOIN users ON todos.user_id = users.id WHERE todos.user_id = ?';
  const [rows] = await dbPool.execute(query, [userId]);
  return rows;
};

const createTodo = async (todo) => {
  const query = 'INSERT INTO todos (user_id, title, description, deadline) VALUES (?, ?, ?, ?)';
  const { userId, title, description, deadline } = todo;
  return dbPool.execute(query, [userId, title, description, deadline]);
};

const updateTodo = async (id, todo) => {
  const { title, description, deadline } = todo;
  const query = 'UPDATE todos SET title = ?, description = ?, deadline = ? WHERE id = ?';
  await dbPool.execute(query, [title, description, deadline, id]);
};

const deleteTodo = async (id) => {
  const query = 'DELETE FROM todos WHERE id = ?';
  await dbPool.execute(query, [id]);
};
 
module.exports = { 
  getTodoById,
  getTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo
};