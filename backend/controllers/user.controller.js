const UserModel = require('../models/user.model');
const MovieModel = require('../models/movie.model');
const SerieModel = require('../models/serie.model');
const SeasonModel = require('../models/season.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.getUserInfos = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    UserModel.findById(req.params.id, (err, docs) => {
        if
            (!err) res.send(docs);
        else
            console.log(('ID unknown :' + err));
    }).select('-password').populate(["followers", "following", "followedMovies", "followedSeries", "followedSeasons", "moviesOpinions", "seriesOpinions", "seasonsOpinions"]);
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    userName: req.body.userName,
                    email: req.body.email,
                    dateOfBirth: req.body.dateOfBirth,
                    avatar: req.body.avatar,
                    bio: req.body.bio,
                    active: req.body.active,
                    ban: req.body.ban,
                    roles: req.body.roles,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.updateProfil = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    userName: req.body.userName,
                    email: req.body.email,
                    bio: req.body.bio,
                    firstLogin: req.body.firstLogin
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        MovieModel.updateMany(
            { followers: req.params.id },
            { $pull: { followers: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        SerieModel.updateMany(
            { followers: req.params.id },
            { $pull: { followers: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        SeasonModel.updateMany(
            { followers: req.params.id },
            { $pull: { followers: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.updateMany(
            { followers: req.params.id },
            { $pull: { followers: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted : " + req.params.id });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send("ID unknown : " + req.body.idToFollow);
    try {
        // Add to the followers list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Add to followings list
        UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToUnfollow))
        return res.status(400).send("ID unknown : " + req.body.idToUnfollow);
    try {
        // Remove to the followers list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Remove to followings list
        UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.followMovie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToFollowMedia))
        return res.status(400).send("ID unknown : " + req.body.idToFollowMedia);

    try {
        // Add to the followingMovie list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { followedMovies: req.body.idToFollowMedia } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Remove to followings list
        MovieModel.findByIdAndUpdate(
            req.body.idToFollowMedia,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.unfollowMovie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToUnfollowMedia))
        return res.status(400).send("ID unknown : " + req.body.idToUnfollowMedia);

    try {
        // Add to the followingMovie list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { followedMovies: req.body.idToUnfollowMedia } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Remove to followings list
        MovieModel.findByIdAndUpdate(
            req.body.idToUnfollowMedia,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.followSerie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToFollowMedia))
        return res.status(400).send("ID unknown : " + req.body.idToFollowMedia);

    try {
        // Add to the followingMovie list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { followedSeries: req.body.idToFollowMedia } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Remove to followings list
        SerieModel.findByIdAndUpdate(
            req.body.idToFollowMedia,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.unfollowSerie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToUnfollowMedia))
        return res.status(400).send("ID unknown : " + req.body.idToUnfollowMedia);

    try {
        // Add to the followingMovie list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { followedSeries: req.body.idToUnfollowMedia } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Remove to followings list
        SerieModel.findByIdAndUpdate(
            req.body.idToUnfollowMedia,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.followSeason = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToFollowSeason))
        return res.status(400).send("ID unknown : " + req.body.idToFollowSeason);

    try {
        // Add to the followingMovie list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { followedSeasons: req.body.idToFollowSeason } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Remove to followings list
        SeasonModel.findByIdAndUpdate(
            req.body.idToFollowSeason,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.unfollowSeason = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (!ObjectID.isValid(req.body.idToUnfollowSeason))
        return res.status(400).send("ID unknown : " + req.body.idToUnfollowSeason);

    try {
        // Add to the followingMovie list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { followedSeasons: req.body.idToUnfollowSeason } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // Remove to followings list
        SeasonModel.findByIdAndUpdate(
            req.body.idToUnfollowSeason,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
