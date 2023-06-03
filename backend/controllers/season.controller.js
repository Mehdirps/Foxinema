const SeasonModel = require('../models/season.model');
const SerieModel = require('../models/serie.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
// const { createMovieErrors } = require('../utils/errors.utils');

module.exports.createSeason = async (req, res) => {
    const { seasonNumber, synopsis, banner, releaseDate, episodes, serie } = req.body;

    try {
        const season = await SeasonModel.create({ seasonNumber, synopsis, banner, releaseDate, episodes, serie });

        SerieModel.findByIdAndUpdate(
            { _id: req.body.serie },
            { $addToSet: { seasons: season._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ season: season._id });
    } catch (err) {
        // const errors = createMovieErrors(err);
        res.status(200).send(err);
    }
}

module.exports.getAllSeason = async (req, res) => {
    const series = await SeasonModel.find().select();

    res.status(200).json(series);
}

module.exports.getSeasonInfos = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    SeasonModel.findById(req.params.id, (err, docs) => {
        if
            (!err) res.send(docs);
        else
            console.log(('ID Unknown :' + err));
    }).select().populate(["serie", "followers", "posts", "opinions"]);
}

module.exports.updateSeason = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        SeasonModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    seasonNumber: req.body.seasonNumber,
                    synopsis: req.body.synopsis,
                    releaseDate: req.body.releaseDate,
                    episodes: req.body.episodes,
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

module.exports.deleteSeason = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await SeasonModel.deleteOne({ _id: req.params.id }).exec();
        SerieModel.updateMany(
            { seasons: req.params.id },
            { $pull: { seasons: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.updateMany(
            { followedSeasons: req.params.id },
            { $pull: { followedSeasons: req.params.id } },
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