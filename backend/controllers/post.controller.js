const PostModel = require('../models/post.model');
const MovieModel = require('../models/movie.model');
const SerieModel = require('../models/serie.model');
const SeasonModel = require('../models/season.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

// Find Post
module.exports.findOnePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    const post = await PostModel.find({ _id: req.params.id }).select().populate(["owner", "movie", "serie", "comments"]);

    res.status(200).json(post);
}

// All User Posts
module.exports.findUserPosts = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    const post = await PostModel.find({ owner: req.params.id }).select().populate(["owner", "movie", "serie", "season"]);

    res.status(200).json(post);
}

// Update Post
module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);
    try {
        PostModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title: req.body.title
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

// Movie Post
module.exports.createMoviePost = async (req, res) => {
    const { title, owner, movie } = req.body;
    try {
        const post = await PostModel.create({ title, owner, movie });

        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { moviePosts: post._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );

        MovieModel.findByIdAndUpdate(
            { _id: req.body.movie },
            { $addToSet: { posts: post._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ post: post })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.findMoviePosts = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    const posts = await PostModel.find({ movie: req.params.id }).select().populate(["owner", "movie"]);

    res.status(200).json(posts);
}

module.exports.deleteMoviePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);
    try {
        await PostModel.deleteOne({ _id: req.params.id }).exec();
        MovieModel.updateMany(
            { posts: req.params.id },
            { $pull: { posts: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.updateMany(
            { moviePosts: req.params.id },
            { $pull: { moviePosts: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted : " + req.params.id });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

// Serie
module.exports.createSeriePost = async (req, res) => {
    const { title, owner, serie } = req.body;
    try {
        const post = await PostModel.create({ title, owner, serie });

        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { seriePosts: post._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );

        SerieModel.findByIdAndUpdate(
            { _id: req.body.serie },
            { $addToSet: { posts: post._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ post: post })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.findSeriePosts = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    const posts = await PostModel.find({ serie: req.params.id }).select().populate(["owner", "serie"]);

    res.status(200).json(posts);
}


module.exports.deleteSeriePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);
    try {
        await PostModel.deleteOne({ _id: req.params.id }).exec();
        SerieModel.updateMany(
            { posts: req.params.id },
            { $pull: { posts: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.updateMany(
            { seriePosts: req.params.id },
            { $pull: { seriePosts: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted : " + req.params.id });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

// Season
module.exports.createSeasonPost = async (req, res) => {
    const { title, owner, season } = req.body;
    try {
        const post = await PostModel.create({ title, owner, season });

        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { seasonPosts: post._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );

        SeasonModel.findByIdAndUpdate(
            { _id: req.body.season },
            { $addToSet: { posts: post._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ post: post })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.findSeasonPosts = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    const posts = await PostModel.find({ season: req.params.id }).select().populate(["owner", "season"]);

    res.status(200).json(posts);
}


module.exports.deleteSeasonPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);
    try {
        await PostModel.deleteOne({ _id: req.params.id }).exec();
        SeasonModel.updateMany(
            { posts: req.params.id },
            { $pull: { posts: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.updateMany(
            { seasonPosts: req.params.id },
            { $pull: { seasonPosts: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted : " + req.params.id });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}