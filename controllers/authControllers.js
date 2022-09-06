const auth = require("../models/userModels");

const getCookies = async (req, res) => {
    // res.send('POST API');
    try {
        res.send(req.cookies);
        console.log(req.cookies)
        // const newUser = new User({ user_id: uuidv4(), ...req.body });
        // await newUser.save();
        // res.send("new user create success");
    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }

};

module.exports = {
    getCookies,
};