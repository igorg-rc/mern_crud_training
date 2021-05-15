import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import {CommentForm} from'./CommentForm'

export const CommentUpdate = () => {
  const match = useRouteMatch()

  const [comment, setComment] = useState()

  useEffect(() => {
    const getComment = async id => {
      try {
        const data = await fetch(`http://localhost:5000/posts/${match.params.id}/${id}`)
        const fetchedComment = await data.json()
        setComment(fetchedComment)
        console.log(comment)
      } catch (error) {
        console.log(error)
      }
      
    }
    getComment()
  }, [])

  const onSubmit = async (id, data) => {
    try {
      await fetch(`http://localhost:5000/posts/${match.params.id}/${id}`, {
        method: 'PATCH',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })

      console.log(`Comment id=${id} was successfuly updated`)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mb-3">
      <h4>Update comment</h4>
      <CommentForm onSubmit={onSubmit} comment={comment} />
    </div>
  )
}