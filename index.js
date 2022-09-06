const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

// app.use(cookieParser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello auth!')
});

//User
const userRoutes = require("./routers/userRoute");
app.use("/users", userRoutes);

app.listen(4000, () => {
    console.log('Listening to port 4000');
});