const User = require('./User.js');

const Post = require('./Posts.js');

const Comment = require('./Comment');

Post.belongsTo(User, {foreignKey: 'user_id'});

Comment.belongsTo(User, {foreignKey: 'user_id'});

/////may need to add more code here
//User.hasMany(Post, {foreignKey: 'user_id'});

Post.hasMany(Comment, {foreignKey: 'post_id'})


module.exports = { User, Post, Comment };