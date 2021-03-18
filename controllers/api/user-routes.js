const router = require('express').Router();
const { User } = require('../../models/');///User.js

// GET /api/users
router.get('/', (req, res) => {
    // find all categories, includes its associated Products
    User.findAll({
    //  include: [Product]
    }).then(result => {
      res.json(result);
    })
  });

  router.get('/:id', (req, res) => {
    // find one category by its `id` value, include its associated Products
    User.findOne({
      where: {
        id: req.params.id
      },
    //  include: [Product]
    }).then(result => {
      res.json(result);
    })
  });

//http://localhost:3001/api/categories (POST), creating a category endpoint
router.post('/', (req, res) => {
    User.create({
     // id: req.body.id,
      username: req.body.username,
      password: req.body.password
    }).then(result => {
      res.json(result);
    })
    // create a new category
  });
  ///http://localhost:3001/api/categories/1 (PUT), updating a category
  router.put('/:id', (req, res) => {
    // update a category by its `id` value
   User.update(
      {
      username: req.body.username,
      password: req.body.password
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
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    })
  });
  
  module.exports = router;
  