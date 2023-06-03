const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema(
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
        durable: {
            type: Number,
            required: true,
            min: 60,
            max: 300
        },
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

const MovieModel = mongoose.model('movies', MovieSchema);

module.exports = MovieModel;