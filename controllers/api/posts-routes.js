const router = require('express').Router();
const { Post, User} = require('../../models/');///User.js

//!!! POST ROUTES not working correctly
// GET http://localhost:3001/api/posts/
router.get('/', (req, res) => {
    // find all categories, includes its associated Products
   Post.findAll({
   //   include: [User]
    }).then(result => {
      res.json(result);
    })
  });

  router.get('/:id', (req, res) => {
    // find one category by its `id` value, include its associated Products
    Post.findOne({
      where: {
        id: req.params.id
      },
   //   include: [User]
    }).then(result => {
      res.json(result);
    })
  });

//http://localhost:3001/api/categories (POST), creating a category endpoint
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
  ///http://localhost:3001/api/categories/1 (PUT), updating a category
  router.put('/:id', (req, res) => {
    // update a category by its `id` value
   Post.update(
     req.body
    ,{
      where: {
        id: req.params.id
      }
    },
    ).then(result => {
      res.json(result);
    })
  });
  
  /////http://localhost:3001/api/categories/1 (DELETE), deleting a category endpoint
  router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    })
  });
  
  module.exports = router;