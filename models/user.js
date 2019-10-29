const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = User.encryptPassword(this.password);
    next();
})



userSchema.path('email').validate(function (email) {
    return validator.isEmail(email);
});

userSchema.path('password').validate(function (password) {
    return validator.isLength(password, 6);
});



const User = mongoose.model('User', userSchema);
module.exports = User;