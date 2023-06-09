import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Success from './components/Success'
import Error from './components/Error'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [actionMessage, setActionMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('in main App user', user.username)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('succesfull login with user: ', user)
      setActionMessage('Login succesful')
      setTimeout(() => {
        setActionMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('Login not successfull')
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Logging out user', user.username)
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      console.log('succesfull logout')
      setActionMessage('Logout succesful')
      setTimeout(() => {
        setActionMessage(null)
      }, 5000)
    } catch(exception) {
      console.log('Logout not successfull')
      setErrorMessage('Logoug not successfull')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()


  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setActionMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setActionMessage(null)
      }, 5000)
    } catch(exception){
      console.log('Creating new blog not succesfull')
      setErrorMessage('Creating new blog not succesfull')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const increaseLikes = async (blogObject, id) => {
    try {
      const updatedBlog = await blogService.update(blogObject, id)
      updatedBlog.user = user
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      setActionMessage(`likes increased for ${updatedBlog.title} by ${updatedBlog.author}`)
      setTimeout(() => {
        setActionMessage(null)
      }, 5000)
    } catch(exception){
      setErrorMessage('Updating blog not successfull')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async(id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setActionMessage('blog deleted')
      setTimeout(() => {
        setActionMessage(null)
      }, 5000)
    } catch(exeption) {
      const msg = String(exeption.response.data.error)

      console.log('delete failed ', msg, 'type of', typeof msg)
      setErrorMessage(`Deleting blog not successfull, ${msg}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }



  return (

    <div>
      <Success message={actionMessage}></Success>
      <Error message={errorMessage}></Error>

      {!user &&
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      }
      {user &&
          <div>
            <h2>blogs</h2>
            {user.name} logged in &nbsp;
            <button onClick = { handleLogout }>Logout</button>
            <br></br>
            <Togglable buttonLabel='create blog' ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <br></br>
            {blogs.sort((a,b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={increaseLikes} blogToBeDeleted={deleteBlog} loggedInUser={user.username} />
              )}
          </div>
      }
    </div>
  )
}



export default App