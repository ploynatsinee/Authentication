const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
    select: false,
  }

});

const userModels = new mongoose.model("User", userSchema);

module.exports = userModels;