const User = require("../models/userModels");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const newUser = new User({ user_id: uuidv4(), ...req.body });
    await newUser.save();
    const token = jwt.sign(newUser.toJSON(), "YOUR_256_BIT_SECRET_KEY", { expiresIn: '1h' });
    res.cookie('Set-Cookie',token);
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
        const token = jwt.sign(user.toJSON(), "YOUR_256_BIT_SECRET_KEY", { expiresIn: '1h' });
        res.cookie('Set-Cookie',token);
        req.session.userId = user.id;
        res.send({
          id: user.id,
          username: user.username,
          password: hash,
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
  try {
    req.session.destroy();
    res.clearCookie('Set-Cookie')
    res.send('You are logged out');
  } catch (error) {
    res.status(400).send(error);
  }

};

module.exports = {
  createUser,
  getUserAll,
  signIn,
  signOut,
};