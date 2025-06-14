import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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