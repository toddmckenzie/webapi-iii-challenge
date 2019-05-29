const express = require('express');

const server = express();

server.use(express.json())
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  //console.log( request method, request url, timestamp )
  console.log(` Request method: ${req.method} Request url: ${req.originalUrl} timestamp: ${Date.now()}`);
  next();
};




module.exports = server;
