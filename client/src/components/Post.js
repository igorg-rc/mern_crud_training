import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import { getPost } from '../api/posts'

export const Post = () => {
  const match = useRouteMatch()
  
  const [post, setPost] = useState({})

  

  useEffect(() => {
    // const fetchPost = async (id) => {
    //   try {
    //     const data = await fetch(`http://localhost:5000/posts/${match.params.id}`)
    //     const result = await data.json()
    //     console.log(result)
    //     setPost(result)

    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
   
    // fetchPost()

    const fetchPost = async () => {
      const fetchedPost = await getPost(match.params.id)
      setPost(fetchedPost)
    }
    fetchPost()
   }, [])

  return(
    <div className="mt-3">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  )
}