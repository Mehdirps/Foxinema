const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        movies: [{
            type: mongoose.Types.ObjectId,
            ref: 'movies'
        }],
        series: [{
            type: mongoose.Types.ObjectId,
            ref: 'series'
        }]
    }
);

const CategoryModel = mongoose.model('categories', CategorySchema);

module.exports = CategoryModel;