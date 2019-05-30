const express = require('express');

const router = express.Router();
const userDb = require('../users/userDb.js');
const psotDb = require('../posts/postDb.js')

router.post('/', validateUser, (req, res) => {
    userDb
    .insert(req.body)
    .then(res => {
        console.log('inside of then ' + res);
        res.status(200).json(res)
    })
    .catch(error => {
        res.status(500).json({ message: 'error'})
    })
});

router.post('/:id/posts', validateUserId, (req, res) => {
    userDb
    .insert(req.body)
    .then(res => {

    })
    .catch(error => {

    })
});
//working
router.get('/', (req, res) => {
    userDb
    .get()
    .then(resources => res.status(200).json(resources))
    .catch(error => res.status(500).json({ message: 'internal server error'}))
});
//working
router.get('/:id', validateUserId, (req, res) => {
    userDb
    .getById(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({ message: 'internal server error'}))
});
//working
router.get('/:id/posts', validateUserId, (req, res) => {
    userDb
    .getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({ message: 'internal server error'}))
});
//working and deleting but saying internal server error
router.delete('/:id', validateUserId, (req, res) => {
   userDb
   .remove(req.params.id)
   .then(res => {
    console.log(res)
    res.status(200).json({message: 'user has been removed'})
   })
   .catch(error => res.status(500).json({ message: 'internal server error'}))
});
//working
router.put('/:id', validateUserId, validateUser, (req, res) => {
   userDb
   .update(req.params.id, req.body)
   .then(count => res.status(200).json(count))
   .catch(error => res.status(500).json({ message: 'There has been an error updating.'}))
});

//custom middleware

function validateUserId(req, res, next) {
  //validates user id on every request that expects a user id param.
  //if id is valid, store the user obj as req.user
  //if id param doesnt match an user id in database. cancel request and repsond status 400 { message: 'invalid user id' }
  if (!req.params.id || !req.params || req.params.id < 1)
    return res.status(400).json({ message: 'invalid user id'});
  userDb.getById(req.params.id)
  .then( result => {
      console.log(result)
      if (!result || result.length === 0) {
          return res.status(400).json({ message: 'invalid user id'});
      } else {
          console.log(result)
          req.user = result;
          next();
      }
  })
  .catch(error => {
      res.status(500).json({ message: 'internal error'})
  })
};


function validateUser(req, res, next) {
      //post
  //validates the body on the request to create new user
  //if body is missing,cancel request and respond with status 400 and { message: 'missing user data' }
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
    console.log(req.body)
    next();
  }
};

module.exports = router;
