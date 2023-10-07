const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");
const todoController = require("../controllers/todoController");
const authMiddleware = require("../controllers/authenticate");

router.post("/signup", signupController["signup"]);
router.post("/login", loginController["login"]);
router.get("/todos", authMiddleware, todoController["getAllUserTodos"]); // Protecting Routes using Auth Middleware
router.post("/todos", authMiddleware, todoController["addTodo"]);
router.put("/todos/:id", authMiddleware, todoController["updateTodo"]);
router.delete("/todos/:id", authMiddleware, todoController["deleteTodo"]);
module.exports = router;
