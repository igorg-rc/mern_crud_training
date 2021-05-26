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
app.use(cors())
// app.use(cors({
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }))

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(fileUpload())

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')))
app.use('/images', express.static(path.join(__dirname, 'downloads', 'images')))
app.use('/posts', express.static(path.join(__dirname, 'downloads', 'images', 'posts')))

app.use('/posts', require('./mongoose/routes/postRoutes')) // === posts routes in mongoose structure
// app.use('/posts', require('./sequelize/routes/postRoutes')) // === posts routes in mongoose structure
app.use('/items', require('./mongoose/routes/itemRoutes'))

// Endpoint for file uploading with file upload
app.get('/upload', (req, res) => {
  res.send('File uploading...')
})

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return status(400).json({ message: 'No file uploaded' })
  }

  const file = req.files.file

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }

    res.json({ 
      fileName: file.name, 
      filePath: `/uploads/${file.name}`,
      fileType: file.mimetype,
      fileSize: file.size
    })
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})