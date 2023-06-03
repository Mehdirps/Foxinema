const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.requireAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return next(new Error(''));
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                next(new Error(''));
            } else {
                console.log(decodedToken.id);
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        console.log('No token');
        next(new Error(''));
    }
};

module.exports.requireUser = (req, res, next) => {
    if (res.locals.user) next();
    else res.status(403).send();
}

module.exports.requireAdmin = (req, res, next) => {
    if (res.locals.user.roles.includes('ROLE_ADMIN')) next();
    else res.status(403).send({ message: 'Vous n\'avez pas accès à cette fonctionnalité' });
}
