const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: 'posts',
            required: true
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        responses: [{
            type: mongoose.Types.ObjectId,
            ref: 'responses'
        }]
    },
    {
        timestamps: true
    }
);

const CommentModel = mongoose.model('comments', commentSchema);

module.exports = CommentModel;