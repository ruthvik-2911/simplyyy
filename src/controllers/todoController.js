const todoModel = require('../models/todo');

/**
 * Todo Controller handling all API operations for todos
 */
const todoController = {
  /**
   * Retrieves all todos
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllTodos: (req, res) => {
    const todos = todoModel.getAll();
    res.json({ success: true, data: todos });
  },

  /**
   * Retrieves a single todo by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getTodoById: (req, res) => {
    const todo = todoModel.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    res.json({ success: true, data: todo });
  },

  /**
   * Creates a new todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  createTodo: (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const todo = todoModel.create(title);
    res.status(201).json({ success: true, data: todo });
  },

  /**
   * Updates an existing todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateTodo: (req, res) => {
    const updates = req.body;
    const todo = todoModel.update(req.params.id, updates);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.json({ success: true, data: todo });
  },

  /**
   * Deletes a todo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteTodo: (req, res) => {
    const deleted = todoModel.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.json({ success: true, message: 'Todo deleted' });
  }
};

module.exports = todoController;
