const router = require('express').Router();
const { User, Post, Comment } = require('../../models/');///User.js

//  (http://localhost:3001/api/users/)
router.get('/', (req, res) => {
    User.findAll({
   //   include: [Post, Comment]
    }).then(result => {
      res.json(result);
    })
  });

  router.get('/:id', (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      },
   //   include: [Post, Comment]
    }).then(result => {
      res.json(result);
    })
  });

//creating a user endpoint
router.post('/', (req, res) => {
    User.create({
     // id: req.body.id,
      username: req.body.username,
      password: req.body.password
    }).then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
  });



  router.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(dbUserData => {
      console.log(dbUserData)
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
  
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
  
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
  });

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end()
      })
    } else {
      res.status(404).end()
    }
})



  ///http://localhost:3001/api/user/1 (PUT), updating a user
  router.put('/:id', (req, res) => {
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
  
  /////deleting a user endpoint
  router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    })
  });
  
  module.exports = router;
  