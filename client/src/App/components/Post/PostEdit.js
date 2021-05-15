import { useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router"
import {PostForm} from './PostForm'

export const PostEdit = () => {
  const history = useHistory()
  const match = useRouteMatch()

  const [post, setPost] = useState()

  useEffect(() => {
    const getPost = async id => {
      const data = await fetch(`http://localhost:5000/posts/${match.params.id}`)
      const fetchedPost = await data.json()
      setPost(fetchedPost)
    }

    getPost()
    console.log(post)
  }, [match.params.id, post])

  const editHandler = async (data, id) => {

    try {
      await fetch(`http://localhost:5000/posts/${match.params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error)
    }
    history.push('/')
  }
 
  return (
    <div>
      <div className="mt-3 mb-3"><h1>Edit post</h1></div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">  
            {
              post ? <PostForm post={post} submit={editHandler} /> : <h2>There ara not posts yet</h2>
            }
          </div>
        </div>
    </div>
  )
}