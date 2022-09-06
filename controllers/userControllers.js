const User = require("../models/userModels");
const { v4: uuidv4 } = require('uuid');

const createUser = async (req, res) => {
    // res.send('POST API');
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
    console.log("Hello")
    const users = await User.find()
    console.log(users)
    res.send(users.map((users) => users.toJSON()))
};

module.exports = {
    createUser,
    getUserAll,
};