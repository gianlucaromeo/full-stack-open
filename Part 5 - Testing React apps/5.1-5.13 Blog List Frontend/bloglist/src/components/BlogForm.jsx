import React, { useState } from 'react'

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
                <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                <label>Author</label>
                <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                <label>Url</label>
                <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogForm