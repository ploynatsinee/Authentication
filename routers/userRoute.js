const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userControllers");

userRoutes.post("/signup", userController.createUser);
userRoutes.post("/signin",userController.signIn)

userRoutes.get("/",userController.getUserAll)
// userRoutes.post("/signout",userController.signOut)

module.exports = userRoutes;