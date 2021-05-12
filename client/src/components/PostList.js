import React, { useEffect, useState } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { deletePost, getPosts } from '../api/posts'

export const PostList = () => {
  const match = useRouteMatch()
  const history = useHistory()

  const [ posts, setPosts ] = useState([])
  
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    }
    fetchPosts()
  }, [])

  const deleteHandler = async (id) => {
    console.log(id)
    await deletePost(id)
    const newPostsList = posts.filter(item => item.id !== id)
    history.push('/')
    setPosts(newPostsList)
    // window.location.reload()
  }

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-xs-12 col-md-3"></div>
        <div className="col-xs-12 col-md-6">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                { posts.map(post => (
                  <tr key={post._id}>
                    <td scope="row">{post._id}</td>
                    <td><Link to={`${post._id}`}>{post.title}</Link></td>
                    <td><Link to={`/edit/${post._id}`}>Edit</Link> | <Link to="#" onClick={(id) => deleteHandler(post._id)} >Delete</Link></td>
                  </tr>
                )) }
            </tbody>
          </table>
        </div>
      </div>
      

    </div>
  )
}
