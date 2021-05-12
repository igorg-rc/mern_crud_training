import React from 'react'
import { PostForm } from './PostForm'
import { createPost } from '../api/posts'
import { useHistory } from 'react-router-dom'

export const Create = () => {
  const history = useHistory()

  const onSubmit = async data => {
    await createPost(data)
    history.push('/')
  }

  return(
    <div className="mt-3">
      <PostForm onSubmit={onSubmit} />
    </div>
  )
}