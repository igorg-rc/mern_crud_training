import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { getPost, updatePost } from '../api/posts'
import { PostForm } from './PostForm'

export const Edit = () => {
  const match = useRouteMatch()
  const history = useHistory()

  const [ post, setPost ] = useState()
  
  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPost(match.params._id)
      setPost(fetchedPost)
    }
    fetchPost()
   }, [match.params._id])

    const onSubmit = async data => {
      await updatePost(data, match.params._id)
      history.push('/')
    }

  return post ? <PostForm post={post} onSubmit={onSubmit} /> : <div>No post for editing</div>

}