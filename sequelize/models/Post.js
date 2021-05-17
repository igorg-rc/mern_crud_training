const Sequelize = require('sequelize')
const db = require('../db/mysql_db')
const Comment = require('./Comment')

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true
  },


})

// Post.hasMany(Comment, {
//   foreignKey: 'postId'
// })
  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      foreignKey: 'postId'
    })
  }

Post.sync()

module.exports = Post
