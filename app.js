const path = require('path')
const express = require('express')
const cors = require('cors')
// Next two lines are used for file uploading with express-fileupload
const fileUpload = require('express-fileupload')
const morgan = require('morgan')

const keys = require('./config/keys')
const PORT = process.env.PORT || keys.PORT
const mongodb_start = require('./mongoose/db/mongodb_start') // ======= MONGODB require statement
// const mysql_start = require('./sequelize/db/mysql_start')


mongodb_start() // ======= MONGODB connection
// mysql_start()      // ======= MySQL start


const app = express()
// app.use(cors())
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')))
app.use('/images', express.static(path.join(__dirname, 'downloads', 'images')))
app.use('/posts', express.static(path.join(__dirname, 'downloads', 'images', 'posts')))

app.use('/posts', require('./mongoose/routes/postRoutes')) // === posts routes in mongoose structure
// app.use('/posts', require('./sequelize/routes/postRoutes')) // === posts routes in mongoose structure

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})