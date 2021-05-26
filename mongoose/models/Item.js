const mongoose = require('mongoose')
const ItemSchema = mongoose.Schema({
  title: String,
  fileName: String,
  filePath: String
})

module.exports = mongoose.model('Item', ItemSchema)