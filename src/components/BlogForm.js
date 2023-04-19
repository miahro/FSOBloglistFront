import {useState} from 'react'
//import Blog from './Blog'

const BlogForm = ({ createBlog }) => {


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    console.log('BlogForm addBlog called with title', title)
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: blogUrl 
    }

    createBlog(blogObject)
    setAuthor('')
    setTitle('')
    setBlogUrl('')
  }
//   try {
//     const createdBlog = blogService.create(blogObject)
    
//     console.log('created blog:', createdBlog)
//     setBlogs(blogs.concat(createdBlog))
//     setAuthor('')
//     setTitle('')
//     setBlogUrl('')
//     setActionMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
//     setTimeout(()=> {
//       setActionMessage(null)
//     }, 5000)      

// } catch(exception){
//   console.log('Creating new blog not succesfull')
//   setErrorMessage('Creating new blog not succesfull')
//   setTimeout(() => {
//     setErrorMessage(null)
//   }, 5000)    
// }
// }




  return (
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
    <div>
      title: &nbsp;
      <input
      type="text"
      value={ title }
      name="Title"
      onChange={({ target }) => setTitle(target.value)}
    />
    </div>
    <div>
      author: &nbsp;
      <input
      type="text"
      value={ author }
      name="Author"
      onChange={({ target }) => setAuthor(target.value)}
    />
    </div>
    <div>
      url: &nbsp;
      <input
      type="url"
      value={ blogUrl }
      name="Url"
      onChange={({ target }) => setBlogUrl(target.value)}
    />        
    </div>
    <button type="submit">create</button>
    </form>
  </div>
  )
}

export default BlogForm