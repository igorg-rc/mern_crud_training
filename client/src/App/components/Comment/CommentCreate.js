import { useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import {CommentForm} from'./CommentForm'

export const CommentCreate = () => {
  const match = useRouteMatch()
  const history = useHistory()

  const onSubmit = async (data) => {
    try {
      await fetch(`http://localhost:5000/posts/${match.params.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      console.log('Post created')
    } catch (error) {
      console.log(error)
    }
    
    history.push(`/${match.params.id}`)
  }

  return (
    <div className="mt-3">
      <h4>Leave a comment</h4>
      <CommentForm onSubmit={onSubmit}  />
    </div>
  )
}