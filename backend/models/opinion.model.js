const mongoose = require('mongoose');

const OpinionSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        note: {
            type: Number,
            min: 0,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            maxLenght: 1024
        },
        serie: {
            type: mongoose.Types.ObjectId,
            ref: 'series'
        },
        movie: {
            type: mongoose.Types.ObjectId,
            ref: 'movies'
        },
        season: {
            type: mongoose.Types.ObjectId,
            ref: 'seasons'
        }
    },
    {
        timestamps: true
    }
);

const OpinionModel = mongoose.model('opinions', OpinionSchema);

module.exports = OpinionModel;