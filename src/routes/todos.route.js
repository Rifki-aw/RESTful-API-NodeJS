const express = require('express');
const passport = require('passport');
const todoController = require('../controllers/todos.controller');

const router = express.Router();

router.get(
  '/view/:id',
  passport.authenticate('jwt', { session: false }),
  todoController.getTodo
);
router.get(
  '/view',
  passport.authenticate('jwt', { session: false }),
  todoController.getUserTodos
);
router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  todoController.createTodo
);
router.put(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  todoController.updateTodo
);
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  todoController.deleteTodo
);

module.exports = router;
