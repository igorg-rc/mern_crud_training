import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const PostList = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(0)

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i)

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetch(`posts?page=${page}`).then(res => res.json())
        

      console.log(data)
      const fetchedPosts = data.posts
      const fetchedTotalPages = data.totalPages
      setPosts(fetchedPosts)
      setNumberOfPages(fetchedTotalPages)
    }

    getPosts()

  }, [page])
  
  const deletePostHandler = async id => {
    try {
      await fetch(`posts/${id}`, {
      method: 'DELETE'
    })
    console.log(`Post was successfuly deleted`)
    } catch (error) {
      console.log(error)
    }
    const newPostList = posts.filter(post => post.id !== id)
    setPosts(newPostList)
    window.location.reload()
  }
  
  console.log(posts)



  return (
    <div className="container">
      <div className="mt-3">
        <div className="mb-3">
          <h1>PostList</h1>
        </div>
        <div className="">
          <ul className="pagination justify-content-center">
            {pages.map((pageIndex) => (
              <li className="page-item" key={pageIndex}>
                <a className="page-link" href="#!" onClick={() => setPage(pageIndex)}>{pageIndex + 1}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>#ID</th>  
                  <th>Title</th>  
                  <th>Comments</th>
                  <th>Actions</th>  
                </tr>  
              </thead>  
          
              <tbody>
                  { posts.map(post => (
                    <tr key={post._id}>
                      <td>{post._id}</td>
                      <td><Link to={`/${post._id}`}>{post.title}</Link></td>
                      <td>{post.comments ? post.comments.length : 0}</td>
                      <td><Link to={`/${post._id}/edit`}>Edit</Link> | <Link to="#delete" onClick={() => deletePostHandler(post._id)}>Delete</Link></td>
                    </tr>
                  )) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}