const router = require('express').Router()
const db = require('../db/mysql_db')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

// router.get('/', (req, res) => {
//   Post
//     .findAll()
//     .then((posts) => {
//       if (!posts) {
//         res.status(404).json({ message: 'There are not published posts yet' })
//       }
//       res.status(200).json(posts)
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).json({ message: `Server error: ${error}` })
//     })
// })

// router.get('/:id', (req, res) => {
//   const { id } = req,params 

//   Post
//     .findByPk(id)
//     .then(post => {
//       if (!post) {
//         res.status(404).json({ message: `Post with id=${id} was not found` })
//       }
//       res.status(200).json(post)
//     })
//     .catch(error => {
//       res.status(500).json(error)
//     })
// })

// router.post('/', (req, res) => {
//   const {title, content} = req.body

//   Post
//     .create({ title, content })
//     .then(post => {
//       res.status(201).json(post)
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).json({ message: `Server error: ${error}` })
//     })
// })




// router.delete('/:id', (req, res) => {
//   const {id} = req.params

//   Post
//     .findOne({ where: { id } })
//     .then(post => {
//       if (!post) {
//         res.status(404).json({ message: `Post with id=${id} was not found` })
//       }
//       post.destroy()
//       res.redirect('/posts')
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).json(error)
//     })
// })

router.get('/', async(req, res) => {
  const posts = await Post.findAll()
  try {
    if (!posts) {
      res.status(404).json({ message: 'There are not published posts yet' })
    }
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Server error: ${error}` })
  }
})





router.post('/', async (req, res) => {
  const { title, content } = req.body

  try {
    const post = await Post.create({ title, content })
    console.log(post)
    res.status(201).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findOne({ 
      where: { id },
      include: [
        [
          sequelize.literal(`(
              SELECT TEXT(*)
              FROM reactions AS reaction
          )`),
          'laughReactionsCount'
        ]
      ]
    })

    if (!post) {
      res.status(404).json({ message: `Post with id=${id} was not found` })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    const { text } = req.body
    const post = await Post.findOne({ 
      where: { id: postId
      }
    })
    await Comment.create({ text, postId })
    await post.save()

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({message: error})
  }
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const { title, content } = req.body

  Post
    .findOne({ where: { id } })
    .then(post => {
      post.update({title, content})
    })
    .then(post => res.status(201).json({ message: `Post with id=${id} was successfuly updated` }))
    .catch(error => res.status(500).json(error))
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const post = await Post.findByPk(id)

  try {
    if (!post) {
      res.status(404).json({ message: `Post with id=${id} was not found` })
    }
    post.destroy()
    res.status(200).redirect('/posts')
  } catch (error) {
    res.status(500).json(error)
  }


  


})

module.exports = router