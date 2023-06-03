const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
// const { uploadErrors } = require("../utils/errors.utils");

module.exports.fileFilter = async (req, file, cb) => {
    if (
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpeg"
    )
        return cb(new Error('Mauvais format d\'image'), false);

    if (file.size > 500000)
        return cb(new Error('Taille d\'image trop volumineuse'), false);

    cb(null, true)
}

module.exports.uploadProfil = async (req, res) => {
    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { avatar: "profil/" + req.file.filename } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if
                    (!err) return res.send(docs);
                else
                    return res.status(500).send({ message: 'err' + err });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err });
    }
};

