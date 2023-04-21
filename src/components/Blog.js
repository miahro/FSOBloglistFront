import { useState} from "react"



const Blog = ({blog, updateBlog, blogToBeDeleted}) => {

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

  const deleteBlog = (event) => {
    event.preventDefault()
    console.log('remove clicked')
    blogToBeDeleted(blog.id)
  }


  return (
  <div className='blog' style={blogStyle}>

      <div className ='hidden' style={hideWhenVisible}>
        {blog.title} &nbsp;
        {blog.author} &nbsp;
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='visible'>
        {blog.title} &nbsp;
        <button onClick={toggleVisibility}>hide</button> <br></br>
        {blog.author} <br></br>
        {blog.url} <br></br>
        likes {blog.likes} &nbsp;
        <button onClick={like} >like</button><br></br>
        {blog.user.name} <br></br>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )

//   <div className='blog' style={blogStyle}>

//   <div className ='hidden' style={hideWhenVisible}>
//     <div className='title'>{blog.title} &nbsp;</div>
//     <div className='author'>{blog.author} &nbsp;</div>
//     <button onClick={toggleVisibility}>view</button>
//   </div>
//   <div style={showWhenVisible} className='visible'>
//     <div className='title'>{blog.title} &nbsp;</div>
//     <button onClick={toggleVisibility}>hide</button> <br></br>
//     <div className='author'>{blog.author} <br></br></div>
//     <div className='url'>{blog.url} <br></br></div>
//     <div className='likes'>likes {blog.likes} &nbsp;</div>
//     <button onClick={like} >like</button><br></br>
//     <div className='username'>{blog.user.name} <br></br></div>
//     <button onClick={deleteBlog}>remove</button>
//   </div>
// </div>
// )
}

export default Blog