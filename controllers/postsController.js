const mongoose = require("mongoose");
const Post = require("../models/post");
const uuid = require("uuid");

const show = (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) res.status(400).send(err);
    res.status(200).json(posts);
  });
};

const create = (req, res, next) => {
  let newPost = new Post({
    id: uuid.v4(),
    title: req.body.title,
    message: req.body.message
  });
  newPost.save(err => {
    if (err) res.status(400).send(err);
    res.status(201).send();
  });
};

const showId = (req, res, next) => {
  Post.findOne({ id: req.params.id }, (err, post) => {
    if (err) res.status(400).send();
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send();
    }
  });
};

const edit = (req, res, next) => {
  const editedPost = {
    title: req.body.title,
    message: req.body.message
  };
  Post.findOneAndUpdate(
    { id: req.params.id },
    editedPost,
    { new: true },
    (err, post) => {
      if (err) res.status(400).send();
      res.status(200).json(post);
    }
  );
};

module.exports = { show, create, showId, edit };
