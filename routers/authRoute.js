const express = require("express");
const authRoutes = express.Router();
const authController = require("../controllers/authControllers");


// userRoutes.post("/", userController.createUser);
// userRoutes.get("/",userController.getUserAll)
authRoutes.get("/", authController.getCookies)

module.exports = authRoutes;