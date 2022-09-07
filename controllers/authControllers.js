const auth = require("../models/userModels");

const getCookies = async (req, res) => {
    try {
        res.cookie('name', req.body.username, { expire: 360000 + Date.now() });
        res.send(req.cookies);
        console.log(req.cookies)
        console.log('Signed Cookies: ', req.signedCookies)

    } catch (error) {
        res.status(400).send(error);
        console.log(error)
    }

};

module.exports = {
    getCookies,
};