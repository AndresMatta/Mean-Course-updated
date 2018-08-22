const express = require('express');

const app = express();

app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { 
      id: '1', 
      title: 'First server-side post', 
      content: 'Lorem ipsum'
    },
    { 
      id: '2', 
      title: 'Second server-side post', 
      content: 'Lorem ipsum'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully.',
    posts
  });
});

module.exports = app;