const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const JWT = req.body.username;
    const token = jwt.sign(JSON.stringify(JWT), process.env.MY_SECRET);
    res.cookie("user_token", token);
    const user = jwt.verify(token, process.env.MY_SECRET);
    req.user = user;
  } catch {
    res.status(400).send(error);
  }
  next();
};
