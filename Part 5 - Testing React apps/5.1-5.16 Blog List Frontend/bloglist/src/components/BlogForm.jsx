import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
    handleSubmit,
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
        <form onSubmit={() => handleSubmit({ title, author, url })}>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} placeholder="title" data-testid="title" />
            </div>
            <div>
                <label>Author</label>
                <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="author" data-testid="author" />
            </div>
            <div>
                <label>Url</label>
                <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} placeholder="url" data-testid="url" />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

BlogForm.displayName = 'BlogForm'

BlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default BlogForm