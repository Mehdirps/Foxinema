const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema(
    {
        seasonNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        synopsis: {
            type: String,
        },
        banner: {
            type: String,
            required: true
        },
        // TODO Faire fonction pour ajouter une bannière et retirer bannière (upload/delete file)
        releaseDate: {
            type: Date,
            required: true
        },
        episodes: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        opinions: [{
            type: mongoose.Types.ObjectId,
            ref: 'opinions'
        }],
        serie: {
            type: mongoose.Types.ObjectId,
            ref: 'series',
            required: true
        },
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

const SeasonModel = mongoose.model('seasons', SeasonSchema);

module.exports = SeasonModel;