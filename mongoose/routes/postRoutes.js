const router = require('express').Router()
const Post = require('../models/Post')
// multer settings
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
const deleteFile = require('../helpers/deleteFile')

// Basic pagination
const paginate = require('../helpers/paginate')

const myStorage = multer.diskStorage({
  destination:(req, res, cb) => {
    cb(null, path.join("downloads/images/posts"));
  },
  filename:(req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) return cb(err)

      cb(null, "img_" + Date.now() + '_' + file.originalname);
    })
  }
});

const upload = multer({
  storage: myStorage,
  limits: { fileSize: 10000000 }
})

// router.get('/', (req, res) => {
//   Post
//     .find()
//     .then(posts => {
//       if (posts) {
//         res.status(200).json(posts)
//       } 
//       res.status(404).json({ message: 'Posts were not find' })
//     })
//     .catch(error => {
//       res.status(500).json({ message: 'Server error' })
//       console.log(error)
//     })
// })

// router.get('/:id', (req, res) => {
//   const id = req.params.id
//   Post
//     .findById(id)
//     .then(post => {
//       if (!post) {
//         res.status(404).json({ message: `Post with id=${id} was not found` })
//         next()
//       }
//       res.status(200).json(post)
//     })
//     .catch(error => {
//       res.status(500).json(error)
//       console.log(error)
//     })
// })

router.post('/', upload.single('image'), (req, res) => {
  const { title, content } = req.body
  const image = req.file
  const imgUrl = image.path
  console.log(image)

  const newPost = new Post({ title, content, imgUrl })
  newPost
    .save()
    .then((post) => {
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json(error)
      console.log(error)
    })
})

// router.patch('/:id', (req, res) => {
//   const { title, content } = req.body
//   const { id } = req.params
  
//   Post
//     .findByIdAndUpdate(id, {title, content}) 
//     .then(post => {
//       if (!post) {
//         res.status(404).json({ message: `Post with id=${id} was not found` })
//       }
//       res.status(201).json(post)
//     })
//     .catch(error => {
//       res.status(500).json(error)
//       console.log(error)
//     })
// })


// router.delete('/:id', (req, res) => {
//   const id = req.params.id
//   Post
//     .findByIdAndRemove(id)
//     .then(post => {
//       if (!post) {
//         res.status(404).json({ message: `Post with id=${id} was not found`})
//       }
//       res.status(200).json({ message: `Post with id=${id} was successfully deleted` })
//     })
//     .catch(error => {
//       res.status(500).json(error)
//       console.log(error)
//     })
// })

// ================== Post routes ================= //

// Example with pagination - inside of helpers/paginate
// router.get('/', paginate(Post), (req, res) => {
//   res.json(res.paginate)
// })

router.get('/', async (req, res) => {
  
  const page = parseInt(req.query.page || "0") 
  const ITEMS_PER_PAGE = 5
  const totalItems = await Post.countDocuments({})
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  

  try { 
    const posts = await Post.find().limit(ITEMS_PER_PAGE).skip(page * ITEMS_PER_PAGE)
    res.status(200).json({totalItems, totalPages, posts})
  } catch (error) {
    res.status(500).json(error)
  }
})


router.get('/:id', async (req, res) => {
  const id = req.params.id 
  try {
    const post = await Post.findById(id)
    if (!post) {
      res.status(404).json({ message: `Post with id ${id} was not found` })
    }
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

// router.post('/',  async (req, res) => {
  
//   const { title, content } = req.body
//   const {imgUrl} = req.file

//   console.log(req.file);
//   console.log(req.body);
  
//   const post = await Post.create({ title: req.body.title, content: req.body.content })
//   try {
//     // const post = new Post({ title: req.body.title, content: req.body.content })
//     // await post.save()
//     res.status(201).json(post)
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error'})
//     console.log(error)
//   }
// })

router.patch('/:id', upload.single('image'), (req, res) => {
  const id = req.params.id
  const image = req.file
  const imgUrl = image.path
  const { title, content } = req.body
  
  if (!id) {
    res.status(404).json({ message: `Post with id=${id} was not found` })
  }

  Post
    .findById(id)
    .then(post => {
      deleteFile(post.imgUrl)
    })
    .catch(error => {
      console.log(error)
    })

  Post
    .findById(id)  
    .then(post => {
      post.title = title
      post.content = content
      if (image) {
        post.imgUrl = imgUrl
      }
      return post.save().then(updatedPost => {
        res.status(204).json(updatedPost)
      })
    })
    
    // try {
    //   const image = req.file
    //   const imgUrl = image.path
    //   const { title, content } = req.body
    //   if (image) {
        
    //   }
    //   // const updatedPost = { _id: id, title, content, imgUrl }
    //   const post = await Post.findByIdAndUpdate(id, { title, content, imgUrl })
    //   res.status(204).json(post)
    // } 
    // catch (error) { 
    //   res.status(500).json(error)
    //   console.log(error)
    // }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  if (!id) return res.status(404).json({ message: `No post with id ${id}`})

  Post
    .findById(id)
    .then(post => {
      deleteFile(post.imgUrl)
    })
    .catch(error => {
      res.status(500).json(error)
      console.log(error)
    }) 

  try {
    const post = await Post.findByIdAndRemove(id).exec()
    if (!post) {
      res.status(404).json({ message: `Post with id=${id} was not found` })
    }
    res.status(200).json({ message: `Post with id=${id} was successfuly deleted` })
  } catch (error) {
    res.status(500).json(error)
  }
})


// =================== Post.comments routes (array approach) ======================= //

router.post('/:postId/', async (req, res) => {
  const { text } = req.body
  const { postId } = req.params
  
  try {
    const post = await Post.findById(postId)
    post.comments.push({text})
    post.save()

    if (!post) {
      res.status(404).json({ message: `Post with id=${postId} was not found` })
    }
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

router.get('/:postId/:commentId', async (req, res) => {
  const {postId, commentId} = req.params

  const post = await Post.findById(postId)
  const commentArr = post.comments.filter(item => item._id == commentId)
  const comment = commentArr[0]

  res.status(200).json(comment)
})

router.patch('/:postId/:commentId', async (req, res) => {

  const { postId, commentId } = req.params
  const { text } = req.body

  const post = await Post.findById(postId)
  const commentArr = await post.comments.filter(item => item._id == commentId)
  const comment = commentArr[0]
  comment.text = text
  await post.save()

  res.status(200).json(comment)

  console.log(post, comment)

})

router.delete('/:postId/:commentId', async (req, res) => {
  const { postId, commentId } = req.params
  const post = await Post.findById(postId)

  const comments = post.comments.filter(i => i._id != commentId)
  post.comments = comments

  await post.save()

  res.json(post)

})

module.exports = router