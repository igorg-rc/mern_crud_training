const postsUrl = `http://localhost:5000/posts`

export const getPosts = () => fetch(postsUrl).then(res => res.json())

export const getPost = id => fetch(`${postsUrl}/${id}`).then(res => res.json())

export const createPost = post => fetch(postsUrl, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
})

export const updatePost = (post, id) => fetch(`${postsUrl}/${id}`, {
  method: 'PATCH',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
})

export const deletePost = id => fetch(`${postsUrl}/${id}`, {
  method: 'DELETE'
})