import { useHistory } from 'react-router'
import {PostForm} from './PostForm'

export const PostCreate = () => {
  const history = useHistory()

  // Handler for text fields only
  // const createHandler = async (data) => {
  //   try {
  //     await fetch(`http://localhost:5000/posts`, {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data)
        
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   console.log(data)
  //   history.push('/')
  // }



  // try out with express.fileupload
  const createHandler = async data => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('image', data.image[0])

    console.log(formData)
    
    const res = await fetch(`/posts`, {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'multipart/form-data',
      //   'Access-Control-Allow-Origin': '*'
      // }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
    console.log(res)
    history.push('/')
  }

  return (
    <div>
      <div className="mt-3 mb-3"><h1>Create New Post</h1></div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">  
            <PostForm submit={createHandler} />
          </div>
        </div>
    </div>
  )
}