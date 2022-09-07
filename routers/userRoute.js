const express = require("express");
const userRoutes = express.Router();
const userController = require("../controllers/userControllers");

userRoutes.post("/signup", userController.createUser);
userRoutes.post("/signin",userController.signIn)
userRoutes.post("/signout",userController.signOut)
userRoutes.get("/",userController.getUserAll)
module.exports = userRoutes;