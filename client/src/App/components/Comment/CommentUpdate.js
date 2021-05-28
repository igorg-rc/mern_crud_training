import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import {CommentForm} from'./CommentForm'

export const CommentUpdate = () => {
  const match = useRouteMatch()

  const [comment, setComment] = useState({})

  useEffect(() => {
    const getComment = async () => {
      const data = await fetch(`/posts/${match.params.id}/${match.params.ID}`)
      const fetchedComment = await data.json()
      try {
        setComment(fetchedComment)
        console.log(comment)
      } catch (error) {
        console.log(error)
      }
      
    }
    getComment()
  }, [match.params.id, match.params.ID])

  const onSubmit = async (id, data) => {
    try {
      await fetch(`/posts/${match.params.id}/${id}`, {
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