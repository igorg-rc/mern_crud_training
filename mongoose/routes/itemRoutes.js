const router = require('express').Router()
const Item = require('../models/Item')

router.get('/', (req, res) => {
  Item
    .find()
    .then(items => {
      res.status(200).json(items)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
})

router.post('/', (req, res) => {
  
  if (req.files === null) {
    return res.status(400).json('No file for upload')
  }
  
  if (req.body === null) {
    return res.status(400).json('Title cannot be empty')
  }
  const image = req.files.image
  
  image.mv(`${__dirname}/../../client/public/uploads/${image.name}`, error =>{
    
    if (error) {
      console.error(error)
      return res.status(500).json(error)
    }
  })
  
  const title = req.body.title
  const fileName = `img_${Date.now()}_${image.name}`
  const filePath = `/uploads/img_${Date.now()}_${image.name}`
  const item = new Item({ title, fileName, filePath })

  item
    .save()
    .then(data => {
      res.json(item)
    })
    .catch(error => {
      console.log(error)
      res.send(500).json(error)
    })
  })

  router.get('/:id', (req, res) => {
    const id = req.params.id

    if (!id) return res.status(404).json({ message: `Item with id ${id} was not found`})

    Item
      .findById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json(error))
  })

  router.patch('/:id', (req, res) => {
    if (req.files === null) {
      return res.status(400).json('No file for upload')
    }
    
    if (req.body === null) {
      return res.status(400).json('Title cannot be empty')
    }
    const image = req.files.image
    
    image.mv(`${__dirname}/../../client/public/uploads/${image.name}`, error =>{
      
      if (error) {
        console.error(error)
        return res.status(500).json(error)
      }
    })

    const id = req.params.id
    const title = req.body.title
    const fileName = `img_${Date.now()}_${image.name}`
    const filePath = `/uploads/img_${Date.now()}_${image.name}`

    Item
      .findByIdAndUpdate(id, { title, fileName, filePath })
      .then(item => res.status(204).json(item))
      .catch(error => res.status(500).json(error))
  })


  router.delete('/:id', (req, res) => {
    const id = req.params.id 

    if (!id) return res.status(404).json({ message: `Item with id ${id} was not found`})

    Item
      .findByIdAndRemove(id)
      .then(data => res.status(200).json({ message: `Item with id ${id} was successfully removed`}))
      .catch(error => {
        console.log(error)
        res.status(500).json(error)
      })
  })

module.exports = router