const router = require('express').Router()
const Post = require('../models/Post')

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

router.post('/', async(req, res) => {
  const { title, content } = req.body

  try {
    const post = new Post({title, content})
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



module.exports = router