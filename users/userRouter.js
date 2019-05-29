const express = require('express');

const router = express.Router();
const userDb = require('../users/userDb.js');


router.post('/', (req, res) => {

});

router.post('/:id/posts', validateUserId, (req, res) => {

});

router.get('/', (req, res) => {
    userDb
    .get()
    .then(resources => res.status(200).json(resources))
    .catch(error => res.status(500).json({ message: ''}))
});

router.get('/:id', validateUserId, (req, res) => {

});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  //validates user id on every request that expects a user id param.
  //if id is valid, store the user onj as req.user
  //if id param doesnt match an user id in database. cancel request and repsond status 400 { message: 'invalid user id' }
  const id = req.params.id;
  postDb
  getById(id)
  .then( user => {
    req.user = user;
    next();
  })
  .catch()
    res.status(400).json({ message: 'invalid user id'});
};


function validateUser(req, res, next) {
      //post
  //validates the body on the request to create new user
  //if body is missing,cancel request and repsond with status 400 and { message: 'missing user data' }
  //if req body is missing required name field, cancel request and repsond status 400 and { message: 'missing required name field'}
  if (!req.body) {
    res.status(400).json({ message: 'missing user data'})
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field'})
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  //post
  //validates the body on a request to create a new post
  //if request body msising, cancel request and repsond status 400 and { message: 'missing post data'}
  //if request body missing the required text field, cancel request and respond status 400 and { message: 'missing required text field' }
  if (!req.body) {
    res.status(400).json({ message: 'missing post data'})
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field'})
  } else {
    next();
  }
};

module.exports = router;
