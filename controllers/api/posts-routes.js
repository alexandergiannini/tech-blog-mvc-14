const router = require('express').Router();
const { Post, User } = require('../../models/');///User.js

//!!! POST ROUTES not working correctly
// GET http://localhost:3001/api/posts/
router.get('/', (req, res) => {
  Post.findAll({
    //   include: [User]
  }).then(result => {
    res.json(result);
  })
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    //   include: [User]
  }).then(result => {
    res.json(result);
  })
});

//creating a post endpoint
router.post('/', (req, res) => {
  Post.create({
    // id: req.body.id,
    title: req.body.title,
    body: req.body.post_body,  //req.body.body,
    user_id: req.session.user_id, ///req.body.user_id
    user: req.session.username
  }).then(result => {
    res.json(result);
  })
  // create a new category
});
///updating a post
router.put('/:id', (req, res) => {
  // update a post by its `id` value
  Post.update(
    req.body
    , {
      where: {
        id: req.params.id
      }
    },
  ).then(result => {
    res.json(result);
  })
});

/////deleting a post endpoint
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result);
  })
});

module.exports = router;