const express = require('express');

const server = express();

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

function validateUserId(req, res, next) {
  //validates user id on every request that expects a user id param.
  //if id is valid, store the user onj as req.user
  //if id param doesnt amtch an user id in database. cancel request and repsond status 400 { message: 'invalid user id' }

};

function validateUser(req, res, next) {
  //validates the body on the request to create new user
  //if body is missing,cancel request and repsond with status 400 and { message: 'missing user data' }
  //if req body is missing required name field, cancel request and repsond status 400 and { message: 'missing required name field'}

};

function validatePost(req, res, next) {
  //validates the body on a request to create a new post
  //if request body msising, cancel request and repsond status 400 and { message: 'missing post data'}
  //if request body missing the required text field, cancel request and respond status 400 and { message: 'missing required text field' }

};

module.exports = server;
