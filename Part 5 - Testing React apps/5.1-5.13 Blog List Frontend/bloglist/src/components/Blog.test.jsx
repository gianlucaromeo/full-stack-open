import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

// Check that Blog renders the title and author by default but not the URL or number of likes
test('renders title and author but not URL or likes', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'http://www.google.com',
        likes: 10
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText('Component testing is done with react-testing-library')
    expect(title).toBeDefined()

    const author = screen.getByText('Robert C. Martin')
    expect(author).toBeDefined()

    const urlAndLikes = screen.queryByText('http://www.google.com')
    expect(urlAndLikes).toBeNull()
})

// checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.
test('renders URL and likes when the button controlling the shown details has been clicked', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'http://www.google.com',
        likes: 10,
        user: {
            username: 'testuser'
        }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('http://www.google.com')
    expect(url).toBeDefined()

    const likes = screen.getByText('10')
    expect(likes).toBeDefined()
})