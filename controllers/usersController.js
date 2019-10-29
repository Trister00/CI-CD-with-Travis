const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "mysecret";

const register = (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err, user) => {
    if (err) res.status(400).send("error");
    if (!user) {
      res.status(400).send();
    } else {
      res.status(201).send();
    }
  });
};

const login = (req, res, next) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) res.status(400).send();
    if (!user) {
      res.status(400).json({
        message: "wrong login"
      });
    } else {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        res.status(200).json({
          token: jwt.sign(user.email, SECRET_KEY)
        });
      } else {
        res.status(400).json({
          message: "wrong password"
        });
      }
    }
  });
};

module.exports = { register, login };
