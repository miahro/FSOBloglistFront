import { useState} from "react"



const Blog = ({blog, updateBlog, id}) => {

  //console.log('in component Blog, blog', blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderColor: 'blue',
    borderWidth: 2,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    //console.log("Like clicked for blog", blog)
    const id = blog.id
    event.preventDefault()
    const updatedBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    }
    //console.log('updatedBlogObject', updatedBlogObject)
    updateBlog(updatedBlogObject, id)
  }


  return (
  <div style={blogStyle}>

      <div style={hideWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={toggleVisibility}> view </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={toggleVisibility}>hide</button> <br></br>
        {blog.author} <br></br>
        {blog.url} <br></br>
        likes {blog.likes} &nbsp;
        <button onClick={like} >like</button><br></br>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog