const express = require('express');

const router = express.Router();
const userDb = require('../users/userDb.js');
const postDb = require('../posts/postDb.js')

router.post('/', validateUser, (req, res) => {
    const user = req.body;
    userDb
    .insert(user)
    .then(user => {
        console.log('inside of then ' + user);
        res.status(201).json(user)
    })
    .catch(error => {
        console.log(req.body)
        res.status(500).json({ message: 'error'})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const post = req.body
    postDb
    .insert(post)
    .then(post => {
        console.log(post)
        res.status(201).json(post)
    })
    .catch(error => {
        res.status(500).json({ message: 'internal server error'})
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
    const id = req.params.id;
   userDb
   .remove(id)
   .then(id => {
    console.log(id)
    res.status(200).json({message: 'we removed the user'})
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
