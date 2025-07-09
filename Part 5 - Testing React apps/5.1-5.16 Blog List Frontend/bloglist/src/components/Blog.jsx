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
      <p className="title">{blog.title}</p>
      <p className="author">{blog.author}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p data-testid="likes">{blog.likes}</p>
          <button onClick={() => handleLike(blog)}>Like</button>
          {blog.user.username && <p>User: {blog.user.username}</p>}
          {blog.user.username && <button onClick={() => handleDelete(blog)}>Delete</button>}
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