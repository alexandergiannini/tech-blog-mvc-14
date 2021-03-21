const router = require('express').Router();
const { Comment, User } = require('../../models/');///User.js

// GET http://localhost:3001/api/comments/
router.get('/', (req, res) => {
    Comment.findAll({
     // include: [User]
    }).then(result => {
      res.json(result);
    })
  });

  router.get('/:id', (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      },
    }).then(result => {
      res.json(result);
    })
  });

  router.post('/', (req, res) => {
    // check the session
    if (req.session) {
      Comment.create({
        body: req.body.comment_text,   ///req.body.body
        user_id: req.session.user_id, //req.body.user_id
        post_id: req.body.post_id,
        user: req.session.username

        
      }
      
      )
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });




  ///updating a comment
  router.put('/:id', (req, res) => {
   Comment.update(
      req.body,{
      where: {
        id: req.params.id
      }
    },
    ).then(result => {
      res.json(result);
    })
  });
  
  /////deleting a comment endpoint
  router.delete('/:id', (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    })
  });
  
  module.exports = router;