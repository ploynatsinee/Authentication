const express = require("express");
const authRoutes = express.Router();
const authController = require("../controllers/authControllers");

authRoutes.get("/", authController.getCookies)


module.exports = authRoutes;