const LoginForm = ({ handleLogin, handleChange, credentials }) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        <input
          name="username"
          type="text"
          value={credentials.username}
          onChange={({ target }) => handleChange(target)}
          placeholder="Username"
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={({ target }) => handleChange(target)}
          placeholder="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default LoginForm
