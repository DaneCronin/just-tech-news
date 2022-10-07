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


module.exports = {User, Post};
