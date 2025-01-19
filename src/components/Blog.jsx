import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleView = () => {
    setView(!view)
  }

  const handleLikes = async () => {
    await blogService.update(updatedBlog.id, { likes: updatedBlog.likes + 1 })
    setUpdatedBlog({ ...updatedBlog, likes: updatedBlog.likes + 1 })
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(
      `Remove blog ${updatedBlog.title} by ${updatedBlog.author}`
    )
    if (confirmation) {
      await blogService.remove(updatedBlog.id)
      setUpdatedBlog({})
    }
  }

  return (
    <div>
      {view ? (
        updatedBlog.id ? (
          <ul style={blogStyle}>
            <li>
              {updatedBlog.title + '  '}
              <button onClick={handleView}>hide</button>
            </li>
            <li>{updatedBlog.url}</li>
            <li>
              likes: {updatedBlog.likes}
              <button onClick={handleLikes}>like</button>
            </li>
            <li>{updatedBlog.author}</li>
            <button onClick={handleDelete}>remove</button>
          </ul>
        ) : (
          ''
        )
      ) : (
        <div style={blogStyle}>
          {updatedBlog.title} {updatedBlog.author + '  '}
          <button onClick={handleView}>view</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
