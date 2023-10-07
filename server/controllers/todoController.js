// todoController.js
const Todo = require("../models/todo");

const todoController = {
  // Get all TODOs of a specific user
  getAllUserTodos: async (req, res) => {
    const userId = req.user; // Assuming the user ID is part of the URL parameters
    console.log(userId);
    try {
      // Find all TODOs where the user field matches the provided user ID
      const userTodos = await Todo.find({ user: userId });

      res.json(userTodos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a new TODO
  addTodo: async (req, res) => {
    console.log("REQUEST", req.user);
    const { text, completed, userId } = req.body;

    try {
      const newTodo = new Todo({
        text,
        completed: completed || false,
        user: req.user["_id"],
      });

      // Save the new TODO
      await newTodo.save();

      res.status(201).json(newTodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update a TODO
  updateTodo: async (req, res) => {
    const todoId = req.params.id;
    const updateData = req.body;

    try {
      const updatedTodo = await Todo.findByIdAndUpdate(todoId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTodo) {
        return res.status(404).json({ message: "TODO not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a TODO
  deleteTodo: async (req, res) => {
    const todoId = req.params.id;

    try {
      const deletedTodo = await Todo.findByIdAndDelete(todoId);

      if (!deletedTodo) {
        return res.status(404).json({ message: "TODO not found" });
      }

      res.json({ message: "TODO deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = todoController;
