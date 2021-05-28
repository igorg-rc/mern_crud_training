import { useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router"
import { Link } from "react-router-dom"

import {CommentCreate} from '../Comment/CommentCreate'
import {CommentUpdate} from '../Comment/CommentUpdate'

export const PostDetail = () => {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [commentId, setCommentId] = useState(null)

  const match = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    const getPost = async (id) => {
      const data = await fetch(`/posts/${match.params.id}`)
      const fetchedPost = await data.json()
      setPost(fetchedPost)
    }

    getPost()
  }, [])
  console.log(post)
  
  const deleteCommentHandler = async commentId => {
    try {
      await fetch(`posts/${match.params.id}/${commentId}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })      
    } catch (error) {
      console.log(error)
    }
    const newCommentList = post.comments.filter(item => item._id !== commentId)
    setComments(newCommentList)

    window.location.reload()
  }

  useEffect(() => {
    
  }, [])

  const editCommentHandler = async (id, data) => {
    setCommentId(id)
    
    console.log(commentId)
  }

  return (
    <div className="container">
      <div className="mt-3 mb-3">
        <div className="mb-3 text-center">
          <h1>{post.title}</h1>
          <img src={`http://localhost:5000/${post.imgUrl}`} style={{height: '100%' }} alt={post.imgUrl} />
        </div>

        <div className="row">
          <div className="col">
            <div className="">
              <h5 className="text-justify">{post.content}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5">
        <div className="row">
          <div className="col">
            <div className="mt-3 mb-3">
              <span className="mr-3">
                <Link to="/" className="btn btn-secondary">Back to all posts</Link>
              </span>
              <span className="mr-3">
                <Link to={`/${match.params.id}/create-comment`} className="btn btn-primary">Live a comment</Link>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <h4>Comments</h4>
            <table id="table__comments" className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              { post.comments 
              ?
              post.comments.map(item => 
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.text}</td>
                  <td>
                    <Link to={`/${match.params.id}/${item._id}/update-comment`}>Edit</Link> | <Link to="#delete" onClick={() => deleteCommentHandler(`${item._id}`)}>Delete </Link>
                  </td>
                </tr>
              ) 
              : <tr>
                  <td>No comments yet</td>
                </tr>
              }
              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>
  )
}