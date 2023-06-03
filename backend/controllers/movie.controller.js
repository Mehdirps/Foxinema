const MovieModel = require('../models/movie.model');
const CategoryModel = require('../models/category.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { createMovieErrors } = require('../utils/errors.utils');

module.exports.createMovie = async (req, res) => {
    const { name, synopsis, banner, durable, ageRequired, releaseDate, categories } = req.body;

    try {
        const movie = await MovieModel.create({ name, synopsis, banner, durable, ageRequired, releaseDate, categories });

        CategoryModel.updateMany(
            { _id: { $in: req.body.categories } },
            { $addToSet: { movies: movie._id } },
            { new: true, upsert: true, multi: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ movie: movie._id });
    } catch (err) {
        const errors = createMovieErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.getAllMovies = async (req, res) => {
    const movies = await MovieModel.find().select();

    res.status(200).json(movies);
}

module.exports.getMovieInfos = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    MovieModel.findById(req.params.id, (err, docs) => {
        if
            (!err) res.send(docs);
        else
            console.log(('ID Unknown :' + err));
    }).select().populate(["categories", "followers", "opinions", "posts"]);
}

module.exports.updateMovie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        MovieModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    synopsis: req.body.synopsis,
                    durable: req.body.durable,
                    ageRequired: req.body.ageRequired,
                    releaseDate: req.body.releaseDate,
                    active: req.body.active,
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
}

module.exports.deleteMovie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await MovieModel.deleteOne({ _id: req.params.id }).exec();
        CategoryModel.updateMany(
            { movies: req.params.id },
            { $pull: { movies: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.updateMany(
            { followedMovies: req.params.id },
            { $pull: { followedMovies: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        // TODO Supprimer avis quand fait
        res.status(200).json({ message: "Succefully deleted : " + req.params.id });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.addCategory = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        MovieModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { categories: req.body.category } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
                CategoryModel.findByIdAndUpdate(
                    req.body.category,
                    { $addToSet: { movies: req.params.id } },
                    { new: true, upsert: true, multi: true },
                    (err, docs) => {
                        if (err) return res.status(400).json(err);
                    }
                )
                res.status(201).json(docs);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.removeCategory = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        MovieModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { categories: req.body.category } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
                CategoryModel.findByIdAndUpdate(
                    req.body.category,
                    { $pull: { movies: req.params.id } },
                    { new: true, upsert: true, multi: true },
                    (err, docs) => {
                        if (err) return res.status(400).json(err);
                    }
                )
                res.status(201).json(docs);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}