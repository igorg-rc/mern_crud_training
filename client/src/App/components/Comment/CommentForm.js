import { useForm } from 'react-hook-form'

export const CommentForm = ({ comment, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text : comment ? comment.text : ''
    }
  })

  const submitHandler = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <div className="container">
      <div className="mt-3 mb-3">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <textarea 
                  id="text" 
                  name="text" 
                  placeholder="Comment text..." 
                  className="form-control" 
                  rows="5"
                  {...register('text')}
                >
                </textarea>
              </div>
              <button type="submit" className="btn btn-primary form-control">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}