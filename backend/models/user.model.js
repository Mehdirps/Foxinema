const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 35,
            unique: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            maxLength: 255,
            unique: true,
            trim: true,
            validate: [isEmail]
        },
        password: {
            type: String,
            required: true,
            minLength: 12,
            maxLength: 1024
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 13
        },
        avatar: {
            type: String,
            default: "profil/default-avatar.png"
        },
        bio: {
            type: String,
            max: 1024
        },
        active: {
            type: Boolean,
            default: true
        },
        ban: {
            type: Boolean,
            default: false
        },
        roles: {
            type: [String],
            default: ['ROLE_USER'],
            uppercase: true
        },
        rgpd: {
            type: Boolean,
            required: true
        },
        firstLogin: {
            type: Boolean,
            required: true,
            default: true
        },
        followers: [{
            type: mongoose.Types.ObjectId,
            ref: 'users',
        }],
        following: [{
            type: mongoose.Types.ObjectId,
            ref: 'users',
        }],
        followedMovies: [{
            type: mongoose.Types.ObjectId,
            ref: 'movies'
        }],
        followedSeries: [{
            type: mongoose.Types.ObjectId,
            ref: 'series'
        }],
        followedSeasons: [{
            type: mongoose.Types.ObjectId,
            ref: 'seasons'
        }],
        likedPosts: [{
            type: mongoose.Types.ObjectId,
            ref: 'posts'
        }],
        likedComments: [{
            type: mongoose.Types.ObjectId,
            ref: 'comments'
        }],
        moviesOpinions: [{
            type: mongoose.Types.ObjectId,
            ref: 'opinions'
        }],
        seriesOpinions: [{
            type: mongoose.Types.ObjectId,
            ref: 'opinions'
        }],
        seasonsOpinions: [{
            type: mongoose.Types.ObjectId,
            ref: 'opinions'
        }],
        moviePosts: [{
            type: mongoose.Types.ObjectId,
            ref: 'posts'
        }],
        seriePosts: [{
            type: mongoose.Types.ObjectId,
            ref: 'posts'
        }],
        seasonPosts: [{
            type: mongoose.Types.ObjectId,
            ref: 'posts'
        }],
        comments: [{
            type: mongoose.Types.ObjectId,
            ref: 'comments'
        }],
        commentResponses:[{
            type: mongoose.Types.ObjectId,
            ref: 'responses'
        }]
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;