const router = require('express').Router();

const userRoutes = require('./user-routes.js');

const postRoutes = require('./posts-routes.js');

router.use('/users', userRoutes);

router.use('./posts', postRoutes);

module.exports = router;