const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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
});

userSchema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, encrypted) => {
    if (err) throw err;
    this.password = encrypted;
    next();
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
