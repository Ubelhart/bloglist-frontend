const BlogForm = ({ addBlog, handleChange, newBlog }) => (
  <div>
    <h2>create a new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        <input
          name="title"
          type="text"
          value={newBlog.title}
          onChange={({ target }) => handleChange(target)}
          placeholder="Title"
        />
      </div>
      <div>
        <input
          name="author"
          type="text"
          value={newBlog.author}
          onChange={({ target }) => handleChange(target)}
          placeholder="Author"
        />
      </div>
      <div>
        <input
          name="url"
          type="text"
          value={newBlog.url}
          onChange={({ target }) => handleChange(target)}
          placeholder="URL"
        />
      </div>
      <div>
        <input
          name="likes"
          type="number"
          value={newBlog.likes}
          onChange={({ target }) => handleChange(target)}
          placeholder="Likes"
        />
      </div>
      <button type="submit">add</button>
    </form>
  </div>
)

export default BlogForm
