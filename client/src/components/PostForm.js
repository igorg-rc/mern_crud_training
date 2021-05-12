import React from 'react'
import { useForm } from 'react-hook-form'

export const PostForm = ({ post, onSubmit }) => {

  const { register, handleSubmit } = useForm({ defaultValues: { 
    title: post ? post.title : '',
    content: post ? post.content : ''
   }})

   const submitHandler = handleSubmit(data => {
    onSubmit(data)
  })

  return(
    <>
      <div className="mt-3">
        <div className="row">
          <div className="col-xs-12 col-md-3"></div>
          <div className="col-xs-12 col-md-6">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Post title" {...register('title')}></input>
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" className="form-control" cols="3" rows="8" placeholder="Post content" {...register('content')}></textarea>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}