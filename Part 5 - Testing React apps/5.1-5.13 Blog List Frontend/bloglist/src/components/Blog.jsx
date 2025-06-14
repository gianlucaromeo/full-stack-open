import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleLike(blog)}>Like</button>
          <p>Author: {blog.author}</p>
          <p>User: {blog.user.username}</p>
          <button onClick={() => handleDelete(blog)}>Delete</button>
        </div>
      )}
    </div>
  )
}

Blog.displayName = 'Blog'

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog