const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");


const Post = require("./models/post");

const app = express();

mongoose.connect("mongodb+srv://amatta:XeiUjL293AovVFfQ@cluster0-ab9kz.mongodb.net/mean-course?retryWrites=true", { useNewUrlParser: true })
  .then(() =>{
    console.log('Connected to your MongoDB database.');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyParser.json());

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added sucessfully.',
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully.',
        posts: documents
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Post deleted.'});
  });
});

module.exports = app;