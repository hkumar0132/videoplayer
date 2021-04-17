const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minglength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    token: {
        type: String,
        required: true,
    },
    tokenExp: {
        type: Number,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User }