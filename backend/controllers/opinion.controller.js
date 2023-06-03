const OpinionModel = require('../models/opinion.model');
const MovieModel = require('../models/movie.model');
const SerieModel = require('../models/serie.model');
const SeasonModel = require('../models/season.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.createMovieOpinion = async (req, res) => {
    const { owner, note, comment, movie } = req.body;

    try {
        const opinion = await OpinionModel.create({ owner, note, comment, movie });

        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { moviesOpinions: opinion._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );

        MovieModel.findByIdAndUpdate(
            { _id: req.body.movie },
            { $addToSet: { opinions: opinion._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ opinion: opinion })
    } catch (err) {
        console.log(err)
    }
}

module.exports.createSerieOpinion = async (req, res) => {
    const { owner, note, comment, serie } = req.body;

    try {
        const opinion = await OpinionModel.create({ owner, note, comment, serie });

        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { seriesOpinions: opinion._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );

        SerieModel.findByIdAndUpdate(
            { _id: req.body.serie },
            { $addToSet: { opinions: opinion._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ opinion: opinion })
    } catch (err) {
        console.log(err)
    }
}

module.exports.createSeasonOpinion = async (req, res) => {
    const { owner, note, comment, season } = req.body;

    try {
        const opinion = await OpinionModel.create({ owner, note, comment, season });

        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { seasonsOpinions: opinion._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );

        SeasonModel.findByIdAndUpdate(
            { _id: req.body.season },
            { $addToSet: { opinions: opinion._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        )
        res.status(200).json({ opinion: opinion._id })
    } catch (err) {
        console.log(err)
    }
}

module.exports.getOpinionInfos = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    OpinionModel.findById(req.params.id, (err, docs) => {
        if
            (!err) res.send(docs);
        else
            console.log(('ID unknown :' + err));
    }).select('-password').populate(["owner"]);
}

module.exports.updatOpinion = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        OpinionModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    comment: req.body.comment,
                    note: req.body.note
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

module.exports.deleteMovieOpinion = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await OpinionModel.deleteOne({ _id: req.params.id }).exec();
        MovieModel.findByIdAndUpdate(
            { _id: req.body.movie },
            { $pull: { opinions: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $pull: { moviesOpinions: req.params.id } },
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

module.exports.deleteSerieOpinion = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await OpinionModel.deleteOne({ _id: req.params.id }).exec();
        SerieModel.findByIdAndUpdate(
            { _id: req.body.serie },
            { $pull: { opinions: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $pull: { seriesOpinions: req.params.id } },
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

module.exports.deleteSeasonOpinion = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await OpinionModel.deleteOne({ _id: req.params.id }).exec();
        SeasonModel.findByIdAndUpdate(
            { _id: req.body.season },
            { $pull: { opinions: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $pull: { seasonsOpinions: req.params.id } },
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