const CategoryModel = require("../models/category.model");
const MovieModel = require("../models/movie.model");
const SerieModel = require("../models/serie.model");
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await CategoryModel.create({ name });
        console.log(category);
        res.status(200).json({ category: category });

    } catch (err) {
        return res.status(200).send(err)
    }
}

module.exports.getAllCategories = async (req, res) => {
    const categories = await CategoryModel.find().select();

    res.status(200).json(categories);
}

module.exports.getCategoryInfos = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    CategoryModel.findById(req.params.id, (err, docs) => {
        if
            (!err) res.send(docs);
        else
            console.log(('ID Unknown :' + err));
    }).select().populate(['movies', 'series']);
}

module.exports.updateCategory = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        CategoryModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name
                },
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

module.exports.deleteMovieCategory = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        await CategoryModel.remove({ _id: req.params.id }).exec();
        MovieModel.updateMany(
            { categories: req.params.id },
            { $pull: { categories: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted :" + req.params.id });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
module.exports.deleteSerieCategory = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        await CategoryModel.remove({ _id: req.params.id }).exec();
        SerieModel.updateMany(
            { categories: req.params.id },
            { $pull: { categories: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted :" + req.params.id });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}