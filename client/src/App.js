import './App.css'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import {PostList} from './components/PostList'
import {Post} from './components/Post'
import {Create} from './components/Create'
import {Edit} from './components/Edit'


function App() {
  return (
    <>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <ul className="navbar-nav">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Posts List</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">Create a post</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path='/' exact component={PostList} />
            <Route path='/create' component={Create} />
            <Route path='/:id/edit' component={Edit} /> 
            <Route path='/:id' component={Post} /> 
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
