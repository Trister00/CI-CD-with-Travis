const express = require("express");
const postsController = require("../controllers/postsController");
const isAuth = require("../utilities/authentication");

const postsRoute = express.Router();

postsRoute.get("/", postsController.show);

postsRoute.get("/:id", postsController.showId);

postsRoute.use(isAuth);

postsRoute.post("/", postsController.create);
postsRoute.put("/:id", postsController.edit);

module.exports = postsRoute;
