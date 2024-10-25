const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER }
});

Post.belongsTo(User, { foreignKey: 'userId' });
module.exports = Post;
