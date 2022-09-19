const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userControllers");
const authenticateToken = require("../middleware/authenticateToken");

userRoutes.post("/signup", authenticateToken, userController.createUser);
userRoutes.post("/signin", authenticateToken, userController.signIn);
userRoutes.post("/signout", userController.signOut);
userRoutes.get("/", userController.getUserAll);

module.exports = userRoutes;
