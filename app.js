const express = require('express')
const cors = require('cors')
const keys = require('./config/keys')
const PORT = process.env.PORT || keys.PORT
const mongodb_start = require('./mongoose/db/mongodb_start') // ======= MONGODB require statement
const mysql_start = require('./sequelize/db/mysql_start')


mongodb_start() // ======= MONGODB connection
// mysql_start()      // ======= MySQL start


const app = express()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/posts', require('./mongoose/routes/postRoutes')) // === posts routes in mongoose structure
// app.use('/posts', require('./sequelize/routes/postRoutes')) // === posts routes in mongoose structure

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})