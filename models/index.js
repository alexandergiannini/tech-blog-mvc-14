const User = require('./User.js');

const Post = require('./Posts.js');

const Comment = require('./Comment');

//Post.belongsTo(User, {foreignKey: 'user_id'});

//Comment.belongsTo(User, {foreignKey: 'user_id'});

/////may need to add more code here
//User.hasMany(Post, {foreignKey: 'user_id'});

//User.hasMany(Comment, {foreignKey: 'user_id'})


module.exports = { User, Post, Comment };