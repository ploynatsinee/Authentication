const User = require("../models/userModels");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const newUser = new User({ user_id: uuidv4(), ...req.body });
    await newUser.save();
    res.send("new user create success");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

const getUserAll = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users.map((users) => users.toJSON()));
  } catch (error) {
    res.status(400).send(error);
  }
};

const signIn = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password }).select("+password");

  if (user) {
    bcrypt.hash(password, 10).then(async (hash) => {
      if (user) {
        req.session.userId = user.id;
        res.send({
          id: user.id,
          username: user.username,
          password: hash,
          token: hash,
        });
        console.log(req.session);
      } else {
        res.status(401).send("Authentication failed");
      }
    });
  } else {
    res.status(401).send("Authentication failed");
  }
};

const signOut = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password }).select("+password");

  if (user) {
    try {
      req.session.destroy();
      res.clearCookie("user_token");
      res.send("You are logged out");
      next();
    } catch (error) {
      res.status(400).send(error, 1);
      console.log(error, 1);
    }
  }
  if (!user) {
    try {
      res.send("incorrect user");
    } catch (error) {
      res.status(400).send(error, 3);
      console.log(error, 3);
    }
  }
};

module.exports = {
  createUser,
  getUserAll,
  signIn,
  signOut,
};
