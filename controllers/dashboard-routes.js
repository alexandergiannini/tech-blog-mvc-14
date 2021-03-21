const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('dashboard', { loggedIn: true });
  });

router.get('/edit/:id', (req, res) => {
    Post.findOne(req.params.id, {
      attributes: [
        'id',
        'title',
        'body',
        'user_id'
        
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'body', 'user_id', 'post_id']
      },
      {
          model: User,
          attributes: ['username']
      }
    ]
  }).then(dbPostData => {
    if (dbPostData) {
      const post = dbPostData.get({ plain: true });
      
      res.render('edit-post', {
        post,
        loggedIn: true
      });
    } else {
      res.status(404).end();
    }
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;