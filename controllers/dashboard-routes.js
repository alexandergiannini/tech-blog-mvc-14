const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    res.render('dashboard', { loggedIn: true });
  });

///make this a put request
router.get('/post/edit/:id', (req, res) => {
  console.log('confirming')
    Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User]
        }
      ]  
    }
    )
  //   Post.findOne({ 
  //     where: {
  //       userId: req.session.userId
  //     },{
  //     attributes: [
  //       'id',
  //       'title',
  //       'body',
  //       'user_id'
        
  //     ],
  //     include: [
  //       {
  //         model: Comment,
  //         attributes: ['id', 'body', 'user_id', 'post_id']
  //     },
  //     {
  //         model: User,
  //         attributes: ['username']
  //     }
  //   ]
  // })
  .then(dbPostData => {
    console.log('confirming again')
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