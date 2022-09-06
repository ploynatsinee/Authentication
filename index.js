const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

// app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello auth!')
});

app.listen(4000, () => {
    console.log('Listening to port 4000');
});