import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  })
  const [showall, setShowall] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setCredentials({ username: '', password: '' })
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLoginOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleShowAll = () => {
    setShowall(true)
  }

  const handleShow3 = () => {
    setShowall(false)
  }

  const handleChange = ({ name, value }) => {
    if (name in newBlog) {
      setNewBlog({
        ...newBlog,
        [name]: name === 'likes' ? Number(value) : value,
      })
    } else if (name in credentials) {
      setCredentials({ ...credentials, [name]: value })
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlogToAdd = await blogService.create(newBlog)
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
      setBlogs([...blogs, newBlogToAdd])
      setSuccessMessage(
        `a new blog ${newBlogToAdd.title} by ${newBlogToAdd.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog already exists')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blog List</h1>

      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleChange={handleChange}
          credentials={credentials}
        />
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLoginOut}>logout</button>
          <BlogForm
            addBlog={addBlog}
            handleChange={handleChange}
            newBlog={newBlog}
          />
        </div>
      )}
      <h2>blogs</h2>
      {showall ? (
        <button onClick={handleShow3}>show 3</button>
      ) : (
        <button onClick={handleShowAll}>show all</button>
      )}
      {showall
        ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        : blogs.slice(0, 3).map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App
