const SerieModel = require('../models/serie.model');
const CategoryModel = require('../models/category.model');
const UserModel = require('../models/user.model');
const SeasonModel = require('../models/season.model');
const ObjectID = require('mongoose').Types.ObjectId;
// const { createMovieErrors } = require('../utils/errors.utils');

module.exports.createSerie = async (req, res) => {
    const { name, banner, synopsis, ageRequired, releaseDate, categories } = req.body;

    try {
        const serie = await SerieModel.create({ name, synopsis, banner, ageRequired, releaseDate, categories });

        CategoryModel.updateMany(
            { _id: { $in: req.body.categories } },
            { $addToSet: { series: serie._id } },
            { new: true, upsert: true, multi: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ serie: serie._id });
    } catch (err) {
        // const errors = createMovieErrors(err);
        res.status(200).send(err);
    }
}

module.exports.getAllSeries = async (req, res) => {
    const series = await SerieModel.find().select();

    res.status(200).json(series);
}

module.exports.getSerieInfos = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    SerieModel.findById(req.params.id, (err, docs) => {
        if
            (!err) res.send(docs);
        else
            console.log(('ID Unknown :' + err));
    }).select().populate(["categories", "followers", "seasons", "opinions", "posts"]);
}

module.exports.updateSerie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        SerieModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    synopsis: req.body.synopsis,
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

module.exports.deleteSerie = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await SerieModel.deleteOne({ _id: req.params.id }).exec();
        UserModel.updateMany(
            { followedSeries: req.params.id },
            { $pull: { followedSeries: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        CategoryModel.updateMany(
            { series: req.params.id },
            { $pull: { series: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        SeasonModel.deleteMany(
            { serie: req.params.id },
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

module.exports.addCategory = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        SerieModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { categories: req.body.category } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
                CategoryModel.findByIdAndUpdate(
                    req.body.category,
                    { $addToSet: { series: req.params.id } },
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
        SerieModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { categories: req.body.category } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
                CategoryModel.findByIdAndUpdate(
                    req.body.category,
                    { $pull: { series: req.params.id } },
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