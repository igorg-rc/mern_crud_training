const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [ 
    { comment: String}
  ]
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post