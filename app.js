const express = require('express')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const PORT = process.env.PORT || keys.PORT
const db = process.env.MONGO_URI || keys.MONGO_URI
// const db = require('./config/db')
const cors = require('cors')


mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, () => {
  console.log('Connected to Mongodb')
})


const app = express()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/posts', require('./routes/postsRoutes'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})