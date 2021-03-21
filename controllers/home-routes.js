const router = require('express').Router();
const e = require('express');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models')

router.get('/', (req, res) => {
  
  Post.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'user_id',
    ]
    ,
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
    console.log(dbPostData);
    console.log(req.session);
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('homepage', { posts });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {

 // if (req.session.loggedIn) {
  //  res.redirect('/');
  //  return;
 // } else {
   // res.render('login');
  //}
  res.render('login');
});


router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'body',
      'user_id',
    ]
    ,
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
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = dbPostData.get({ plain: true })
    const comment = dbPostData.get({ plain: true})

    //if (req.session.loggedIn) {
    //  res.render('single-post', {post, comment})
  //  }
  //  else {
   //   res.render('login')
   // }
    res.render('single-post', {post, comment})
  })

});


module.exports = router;
