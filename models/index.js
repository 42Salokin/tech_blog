const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations
User.hasMany(Post, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});
User.hasMany(Comment, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
});

// Export models
module.exports = { User, Post, Comment };
