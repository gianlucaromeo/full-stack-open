import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import InfoMessage from './components/InfoMessage'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')


  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const checkIfUserIsLoggedIn = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  useEffect(() => {
    checkIfUserIsLoggedIn()
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleMessage = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

  const handleResetUser = () => {
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      checkIfUserIsLoggedIn()
      handleMessage('welcome back', 'success')
      fetchBlogs()
    } catch (exception) {
      console.log(exception)
      handleMessage('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    handleResetUser()
  }

  const handleCreateBlog = async (blog) => {
    try {
      await blogService.create(blog)
      handleMessage('blog created successfully', 'success')
      fetchBlogs()
    } catch (exception) {
      console.log(exception)
      handleMessage('failed to create blog', 'error')
    }
  }

  const createBlogForm = () => (
    <Togglable buttonLabel="create new">
      <BlogForm
        handleSubmit={handleCreateBlog}
      />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <InfoMessage message={message} type={messageType} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <InfoMessage message={message} type={messageType} />

      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <h2>create new</h2>
      {createBlogForm()}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App