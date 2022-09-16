const User = require("../models/userModels");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const newUser = new User({ user_id: uuidv4(), ...req.body });
    await newUser.save();
    const token = jwt.sign(newUser.toJSON(), process.env.MY_SECRET, { expiresIn: '1h' });
    res.cookie('Set_Cookie', token);
    res.send("new user create success");
  } catch (error) {
    res.status(400).send(error);
  }

};

const getUserAll = async (req, res, next) => {
  try {
    const users = await User.find()
    res.send(users.map((users) => users.toJSON()))
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
        const token = jwt.sign(user.toJSON(), process.env.MY_SECRET, { expiresIn: '1h' });
        res.cookie('Set_Cookie', token);
        req.session.userId = user.id;
        res.send({
          id: user.id,
          username: user.username,
          password: hash,
          token: token,
        });
        console.log(req.session)
      } else {
        res.status(401).send("Authentication failed");
      }
    })
  } else {
    res.status(401).send("Authentication failed");
  }
};

const signOut = async (req, res, next) => {
  const token = req.cookies.Set_Cookie;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.MY_SECRET);
      req.user = user;
      req.session.destroy();
      res.clearCookie('Set_Cookie')
      res.send('You are logged out');
      next();
    } catch (error) {
      res.status(400).send(error, 1);
    }
  }
  if (!token) {
    try {
      res.send('You are not login');
    } catch (error) {
      res.status(400).send(error, 2);
    }
  }
};

module.exports = {
  createUser,
  getUserAll,
  signIn,
  signOut,
};