import {useForm} from 'react-hook-form'

export const PostForm = ({ post, submit }) => {
  const {handleSubmit, register} = useForm({
    defaultValues: {
      title: post ? post.title : '',
      content: post ? post.content : ''
    }
  })

  const submitHandler = handleSubmit(data => {
    submit(data)
  })

  return (
    <div className="mt-3 mb-3">
      <form className="form" encType="multipart/form-data" method="post" onSubmit={submitHandler}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" className="form-control" placeholder="Post title" {...register('title')} />
          <label>Content</label>
          <textarea id="content" name="content" rows="7" className="form-control" placeholder="Post content" {...register('content')}></textarea>
          <input type="file" name="image" {...register('image')} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}