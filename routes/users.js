const express = require("express");
const usersController = require("../controllers/usersController");
const usersRoute = express.Router();

usersRoute.post("/register", usersController.register);
usersRoute.post("/login", usersController.login);

module.exports = usersRoute;
