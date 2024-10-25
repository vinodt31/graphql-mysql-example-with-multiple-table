const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./Post');
const User = require('./User');

const Comment = sequelize.define('Comment', {
  comment_text: { type: DataTypes.STRING },
  postId: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER }
});

Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Comment;
