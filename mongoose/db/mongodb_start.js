const mongoose = require('mongoose')
const keys = require('../../config/keys')
const db = process.env.MONGO_URI || keys.MONGO_URI

const mongodb_start = () => {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }, () => {
    console.log('Connected to Mongodb')
  })
}



module.exports = mongodb_start