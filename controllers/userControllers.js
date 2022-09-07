const User = require("../models/userModels");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const newUser = new User({ user_id: uuidv4(), ...req.body });
    await newUser.save();
    res.send("new user create success");
  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }

};

const getUserAll = async (req, res, next) => {
  try {
    // console.log("Hello")
    const users = await User.find()
    // console.log(users)
    res.send(users.map((users) => users.toJSON()))
  } catch (error) {
    res.status(400).send(error);
  }


};


const signIn = async (req, res, next) => {

  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");

  if (user) {

    // bcrypt.compare(password, user.password, function (err, result) {
    if (user) {
      res.cookie('Set-Cookie', 'isLoggedin=true');
      req.session.userId = user.id;
      console.log(req.session)
      res.send({
        id: user.id,
        username: user.username,
        password: user.password,
      });
    } else {
      res.status(401).send("Authentication failed");
      console.log(user.id)
      console.log(user.password)
    }
    // });
  } else {
    res.status(401).send("Authentication failed");
  }
};

const signOut = async (req, res, next) => {
  try {
    req.session.destroy();
    res.send("Success");
  } catch (err) {
    res.status(400).send(error);
  }

};

module.exports = {
  createUser,
  getUserAll,
  signIn,
  signOut,
};