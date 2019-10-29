// const express = require('express');
// const User = require('./models/user');
// const passport = require('passport');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://JavaFX:swing-123@cluster0-reg43.mongodb.net/test?retryWrites=true&w=majority', (err) => {
//     if (err) throw err;
// })

// const app = express();

// //Middlewares
// app.use(require('cookie-parser')('my secret string'));
// app.use(require('express-session')({
//     secret: "my other secret string"
// }));
// app.use(require('body-parser')());
// app.use(passport.initialize());
// app.use(passport.session());
// //END

// app.set('view engine', 'jade');
// app.set('views', __dirname + '/views');

// app.get('/', (req, res) => {
//     // res.send('Hello World');
//     res.render('index.jade');
// })

// app.listen(3000);
// console.log('Express started on port 3000!');

const express = require("express");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const Post = require("./models/post");

const app = express();

mongoose.connect(
  "mongodb+srv://JavaFX:swing-123@cluster0-reg43.mongodb.net/test?retryWrites=true&w=majority",
  err => {
    if (err) throw err;
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", usersRoute);
app.use("/posts", postsRoute);

app.get("/test", (req, res) => {
  res.send("khdam");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listening on port : ${port}`);
});
