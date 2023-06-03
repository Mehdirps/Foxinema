const mongoose = require('mongoose');

const commentResponseSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        comment: {
            type: mongoose.Types.ObjectId,
            ref: 'comments',
            required: true
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const commentResponseModel = mongoose.model('responses', commentResponseSchema);

module.exports = commentResponseModel;