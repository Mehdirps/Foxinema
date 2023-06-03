const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 120
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        movie: {
            type: mongoose.Types.ObjectId,
            ref: 'movies'
        },
        serie: {
            type: mongoose.Types.ObjectId,
            ref: 'series'
        },
        season: {
            type: mongoose.Types.ObjectId,
            ref: 'seasons'
        },
        comments: [{
            type: mongoose.Types.ObjectId,
            ref: 'comments'
        }],
        likes: [{
            type: mongoose.Types.ObjectId,
            ref: 'users'
        }]
    },
    {
        timestamps: true
    }
);

const PostModel = mongoose.model('posts', PostSchema);

module.exports = PostModel;