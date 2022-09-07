const User = require("../models/userModels");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");

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

//fix logic

const signIn = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
  
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          req.cookies.username= req.body.username;
          console.log(req.cookies);
          res.send();
          // req.session.userId = user.id;
          // res.send({
          //   id: user.id,
          //   name: user.name,
          //   username: user.username,
          // });
        } else {
          res.status(401).send("Authentication failed");
        }
      });
    } else {
      res.status(401).send("Authentication failed");
    }
  };
  
//   const signOut = async (req, res, next) => {
//     req.session.destroy();
//     res.send("Success");
//   };

module.exports = {
    createUser,
    getUserAll,
    signIn,
    // signOut,
};