const Sequelize = require('sequelize')
const db = require('../db/mysql_db')
const Post = require('./Post')

const Comment = db.define('comment', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postId: {
    type: Sequelize.INTEGER
  }
})

// Comment.belongsTo(Post)
// postId: {
//   type: Sequelize.INTEGER,
//   references: {model: 'posts', key: 'id'},
//   onDelete: 'CASCADE'
// }
Comment.sync()

module.exports = Comment