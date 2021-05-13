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
      const fetchedPost = await getPost(match.params.id)
      setPost(fetchedPost)
    }
    fetchPost()
   }, [])

    const onSubmit = async data => {
      await updatePost(data, match.params.id)
      history.push('/')
    }

  return post ? <PostForm post={post} onSubmit={onSubmit} /> : <div>No post for editing</div>

}