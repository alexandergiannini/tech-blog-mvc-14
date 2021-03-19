const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const postRoutes = require('./posts-routes.js');

const commentRoutes = require('./comments-routes.js')

router.use('/users', userRoutes);

router.use('/posts', postRoutes);

router.use('/comments', commentRoutes);

module.exports = router;