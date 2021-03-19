const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'title',
      'body'
    ]
  }).then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('homepage', { posts });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});


module.exports = router;
