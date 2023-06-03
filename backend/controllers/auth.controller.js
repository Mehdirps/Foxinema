const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};

// Register
module.exports.signUp = async (req, res) => {
    const { userName, email, password, dateOfBirth, rgpd, age } = req.body;

    try {
        if (!req.body.rgpd) {
            return res.status(200).send({ errors: { rgpd: 'Vous devez accepter les conditions générales' } })
        }
        const user = await UserModel.create({ userName, email, password, dateOfBirth, rgpd, age });
        res.status(201).json({ user: user });
    }
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
    }
};

// Login
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        // res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user, token: token });
    }
    catch (err) {
        const errors = signInErrors(err)
        res.status(201).json({ errors });
    }
};

// Logout
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};