const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecret";

const isAuth = (req, res, next) => {
  let token = req.headers.token;

  if (token) {
    return jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) res.status(401).send();
      else {
        next();
      }
    });
  } else {
    res.status(401).send();
  }
};

module.exports = isAuth;
