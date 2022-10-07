const Vote = require('./Vote');
const Post = require('./Post');
const User = require('./User');


//Define model associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//Make reverse association to above relationship
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//Associate User and Post models to see total votes a user creates and see all posts a user votes on
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted-posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// Associate Vote table to Post and User
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post-id'
});

module.exports = {User, Post, Vote};
