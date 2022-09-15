const User = require("../models/userModels");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const newUser = new User({ user_id: uuidv4(), ...req.body });
    await newUser.save();
    const token = jwt.sign(newUser.toJSON(), "YOUR_256_BIT_SECRET_KEY", { expiresIn: '1h' });
    res.cookie('Set_Cookie',token);
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
        res.cookie('Set_Cookie', token);
        // res.cookie('Set-Cookie', 'isLoggedin=true');
        req.session.userId = user.id;
        res.send({
          // id: user.id,
          token: token,
          // username: user.username,
          // password: hash,
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
  // const token = req.cookies.Set_Cookie;
  // const token = req.header("Set_Cookie");
  // const string = JSON.stringify(token)

  const token  = req.body.token;
  if (!token) {
    res.sendStatus(403).send("no token");
  }

  // if (!string) {
  //   return res.status(403).send("no token")
  // }

  // const token = authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, "YOUR_256_BIT_SECRET_KEY");
    req.userId = data.id;
    // req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403).send("catch err");
  }

  // try {
  //   const data = jwt.verify(string, "YOUR_256_BIT_SECRET_KEY");
  //   // req.user_id = data.id;
  //   // // req.userRole = data.role;
  //   // console.log(data.id)
  //   // console.log(data.role)
  //   if (data) {
  //     req.session.destroy();
  //     res.clearCookie('Set_Cookie')
  //     res.send('You are logged out');
  //   }

  // } catch (error) {
  //   res.status(400).send(error);
  //   console.log(error)
  // }

  // if (token) {
  //   try {
  //     req.session.destroy();
  //     res.clearCookie('Set_Cookie')
  //     res.send('You are logged out');
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // }
};

module.exports = {
  createUser,
  getUserAll,
  signIn,
  signOut,
};