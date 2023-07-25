const todoService = require('../services/todos.service');

const getTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await todoService.getTodoById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan!!' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menampilkan data' });
  }
};

const getUserTodos = async (req, res) => {
  const userId = req.user[0][0].id;
  // const {userId} = req.user

  try {
    const todos = await todoService.getTodosByUserId(userId);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTodo = async (req, res) => {
  const { title, description, deadline } = req.body;
  const userId = req.user[0][0].id;

  try {
    await todoService.createTodo({
      userId,
      title,
      description,
      deadline,
    });

    res.status(201).json({ message: 'Todo created successfully' });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const { title, description, deadline } = req.body;

  try {
    // Check if the todo exists
    const todo = await todoService.getTodoById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todoService.updateTodo(todoId, {
      title,
      description,
      deadline,
    });

    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await todoService.getTodoById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todoService.deleteTodo(todoId);

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getTodo,
  getUserTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
