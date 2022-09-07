const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const session = require("express-session");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();

app.use(async (req, res, next) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.get('/', (req, res) => {
  req.cookies.username= req.body.username;
   console.log('boby-username',req.body.username);
  
  try {
    if (!username) {
      res.cookie('name', 'value', { expire: 360000 + Date.now(), httpOnly: true, signed: false });
      res.send(req.cookies);
      req.signedCookies['name']
      console.log('req Cookies: ',req.cookies)
      console.log('Signed Cookies: ', req.signedCookies)
    } else if (username) {
      var username = req.body.username;
      return res.send();
    }

  } catch (error) {
    res.status(400).send(error);
    console.log(error)
  }
});

//User
const userRoutes = require("./routers/userRoute");
app.use("/users", userRoutes);

//Auth
const authRoutes = require("./routers/authRoute");
app.use("/auth", authRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});