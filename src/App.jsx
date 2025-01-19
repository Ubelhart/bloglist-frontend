import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [blogs])

  const handleLoginOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h1>Blog List</h1>

      <Notification
        message={errorMessage ? errorMessage : successMessage}
        type={errorMessage ? 'error' : 'success'}
      />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} />
        </Togglable>
      ) : (
        <div>
          <div>
            <p>
              {user.name} logged-in
              <button onClick={handleLoginOut}>logout</button>
            </p>
          </div>
          <Togglable buttonLabel="create new blog">
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </Togglable>
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
