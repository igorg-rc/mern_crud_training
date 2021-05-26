import '../App.css'
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'

import {PostCreate} from './components/Post/PostCreate'
import {PostEdit} from './components/Post/PostEdit'
import {PostDetail} from './components/Post/PostDetail'
import {PostList} from './components/Post/PostList'
import { CommentCreate } from './components/Comment/CommentCreate'
import { CommentUpdate } from './components/Comment/CommentUpdate'

export const App = () => {
  return (
    <div className="App">
      <Router>
        <nav className="navbar-expand-lg navbar-dark bg-primary">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Post List</Link>
            </li>
            <li className="nav-item">
              <Link to="create" className="nav-link">Create Post</Link>
            </li>
          </ul>
        </nav>


        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/create" component={PostCreate} />
          <Route path="/:id/edit" component={PostEdit} />
          <Route path="/:id" component={PostDetail} />
          <Route path="/:id/:ID/update-comment" component={CommentUpdate} />
          <Route path="/:id/create-comment" component={CommentCreate} />
        </Switch>


      </Router>
    </div>
  )
}