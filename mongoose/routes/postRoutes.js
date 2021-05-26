const router = require('express').Router()
const Post = require('../models/Post')
// multer settings
const path = require('path')
const multer = require('multer')
const crypto = require('crypto')
const deleteFile = require('../helpers/deleteFile')

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

// router.post('/', (req, res) => {
//   const { title, content } = req.body
//   const post = new Post({title, content})
//   post
//     .save()
//       .then(() => {
//       res.status(201).json(post)
//     })
//     .catch(error => {
//       res.status(500).json('Server error')
//       console.log(error)
//     })
// })

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

router.get('/', async(req, res) => {
  try { 
    const posts = await Post.find()
    res.status(200).json(posts)
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
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

router.post('/', upload.single('image'), async (req, res) => {
  
  const { title, content } = req.body
  const imgUrl = req.file.path

  console.log(req.file);
  console.log(req.body);
  const post = new Post({ title, content, imgUrl })
  
  try {
    await post.save()
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { title, content } = req.body
  try {
    const post = await Post.findByIdAndUpdate(id, {title, content})
    if (!post) {
      res.status(404).json({ message: `Post with id=${id} was not found` })
    }
    res.status(204).json(post)
  } catch (error) { 
    res.status(500).json(error)
    console.log(error)
  }
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
  const commentArr = post.comments.filter(item => item._id === commentId)
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