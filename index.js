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
    res.send(req.cookies);
    console.log(req.cookies)
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