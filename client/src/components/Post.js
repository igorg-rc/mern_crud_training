import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
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
      console.log(fetchedPost)
      setPost(fetchedPost)
    }
    fetchPost()
   }, [match.params.id])

  return(
    <div className="mt-3">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div className="mt-5">
         <Link to="/">Back to all posts</Link>
      </div>
     
    </div>
  )
}