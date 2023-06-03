const PostModel = require('../models/post.model');
const CommentModel = require('../models/comment.model');
const UserModel = require('../models/user.model');
const ResponseModel = require('../models/commentResponse.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.createComment = async (req, res) => {
    const { message, post, owner } = req.body;
    try {
        const comment = await CommentModel.create({ message, post, owner });
        PostModel.findByIdAndUpdate(
            { _id: req.body.post },
            { $addToSet: { comments: comment._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err)
            }
        );
        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { comments: comment._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err)
            }
        );
        res.status(200).json({ comment: comment })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.createResponse = async (req, res) => {
    const { message, comment, owner } = req.body;

    try {
        const response = await ResponseModel.create({ message, comment, owner });
        CommentModel.findByIdAndUpdate(
            { _id: req.body.comment },
            { $addToSet: { responses: response._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );
        UserModel.findByIdAndUpdate(
            { _id: req.body.owner },
            { $addToSet: { commentResponses: response._id } },
            { new: true, upsert: true },
            (err, docs) => {
                if (err) return res.status(400).json(err);
            }
        );
        res.status(200).json({ response: response })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.findComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    const comment = await CommentModel.find({ _id: req.params.id }).select().populate(["owner", "post", "responses"])
    res.status(200).json(comment);
}

module.exports.findPostComments = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    const comments = await CommentModel.find({ post: req.params.id }).select().populate(["owner", "post"]);
    res.status(200).json(comments);
}

module.exports.findCommentResponse = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    const responses = await ResponseModel.find({ comment: req.params.id }).select().populate(["owner", "comment"]);
    res.status(200).json(responses);
}

module.exports.updateComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    try {
        CommentModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    message: req.body.message
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err })
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });

    }
}

module.exports.updateResponse = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    try {
        ResponseModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    message: req.body.message
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err })
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });

    }
}

module.exports.deleteComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id);

    try {
        await CommentModel.deleteOne({ _id: req.params.id }).exec();
        const responses = await ResponseModel.find({ comment: req.params.id });
        // Faire map sur Responses puis boucle sur Update pour passer sur chaque ID
        await ResponseModel.deleteMany({ comment: req.params.id }).exec();
        const idList = [];

        if (responses) {
            responses.map((response) =>
                idList.push(response.id)
            )
        }

        UserModel.updateMany(
            { commentResponses: { $in: idList } },
            { $pull: { commentResponses: { $in: idList } } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err)
                }
            }
        )
        UserModel.updateMany(
            { comments: req.params.id },
            { $pull: { comments: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err)
                }
            }
        );
        PostModel.updateMany(
            { comments: req.params.id },
            { $pull: { comments: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err)
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted : " + req.params.id })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteResponse = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    try {
        await ResponseModel.deleteOne({ _id: req.params.id }).exec();

        UserModel.updateMany(
            { commentResponses: req.params.id },
            { $pull: { commentResponses: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err)
                }
            }
        );
        CommentModel.updateMany(
            { responses: req.params.id },
            { $pull: { responses: req.params.id } },
            { multi: true },
            (err, docs) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err)
                }
            }
        );
        res.status(200).json({ message: "Succefully deleted : " + req.params.id })
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}