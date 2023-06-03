const mongoose = require('mongoose');

const SerieSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        synopsis: {
            type: String,
            required: true,
        },
        banner: {
            type: String,
            required: true
        },
        // TODO Faire fonction pour ajouter une bannière et retirer bannière (upload/delete file)
        seasons: [{
            type: mongoose.Types.ObjectId,
            ref: 'seasons',
            required: true
        }],
        ageRequired: {
            type: Number,
            min: 3,
            max: 18
        },
        releaseDate: {
            type: Date,
            required: true
        },
        categories: [{
            type: mongoose.Types.ObjectId,
            ref: 'categories',
            required: true
        }],
        active: {
            type: Boolean,
            default: true
        },
        opinions: [{
            type: mongoose.Types.ObjectId,
            ref: 'opinions'
        }],
        followers: [{
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        }],
        posts: [{
            type: mongoose.Types.ObjectId,
            ref: 'posts'
        }]
    },
    {
        timestamps: true
    }
);

const SerieModel = mongoose.model('series', SerieSchema);

module.exports = SerieModel;