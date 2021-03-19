const router = require('express').Router();
const { Comment, User } = require('../../models/');///User.js

// GET http://localhost:3001/api/comments/
router.get('/', (req, res) => {
    // find all categories, includes its associated Products
    Comment.findAll({
     // include: [User]
    }).then(result => {
      res.json(result);
    })
  });

  router.get('/:id', (req, res) => {
    // find one category by its `id` value, include its associated Products
    Comment.findOne({
      where: {
        id: req.params.id
      },
  //    include: [User]
    }).then(result => {
      res.json(result);
    })
  });

//http://localhost:3001/api/categories (POST), creating a category endpoint
router.post('/', (req, res) => {
    Comment.create({
      body: req.body.body
    }).then(result => {
      res.json(result);
    })
    // create a new category
  });
  ///http://localhost:3001/api/categories/1 (PUT), updating a category
  router.put('/:id', (req, res) => {
    // update a category by its `id` value
   Comment.update(
      {
        body: req.body.body
    },{
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
    Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    })
  });
  
  module.exports = router;