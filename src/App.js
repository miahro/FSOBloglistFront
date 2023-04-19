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
      setTimeout(()=> {
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
      setTimeout(()=> {
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
      
      console.log('created blog:', createdBlog)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setActionMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(()=> {
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
  
  if (user===null){
    return (
      <div>
      <Success message={actionMessage}></Success>
      <Error message={errorMessage}></Error>

      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
        {/* <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username &nbsp;
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password &nbsp;
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form> */}
      </div>
    )
  }
  return (
    <div>
      <Success message={actionMessage}></Success>
      <Error message={errorMessage}></Error>
      <h2>blogs</h2>
      <div>
        {user.name} logged in &nbsp;
        <button onClick = { handleLogout }>Logout</button>
      </div>
      <br></br>
    <div>
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <BlogForm createBlog={addBlog} />
      </Togglable>
    <br></br>
    </div>



    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}



export default App