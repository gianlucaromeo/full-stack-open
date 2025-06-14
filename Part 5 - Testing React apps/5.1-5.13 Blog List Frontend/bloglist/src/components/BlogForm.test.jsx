import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

// check that the form calls the event handler it received as props with the right details when a new blog is created.
test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const mockHandler = vi.fn()

    render(<BlogForm handleSubmit={mockHandler} />)

    const user = userEvent.setup()
    const titleInput = screen.getByPlaceholderText('title')
    await user.type(titleInput, 'test title')

    const authorInput = screen.getByPlaceholderText('author')
    await user.type(authorInput, 'test author')

    const urlInput = screen.getByPlaceholderText('url')
    await user.type(urlInput, 'test url')

    const submitButton = screen.getByText('Create')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('test title')
    expect(mockHandler.mock.calls[0][0].author).toBe('test author')
    expect(mockHandler.mock.calls[0][0].url).toBe('test url')
})