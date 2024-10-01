const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const reducer = (favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }

  const { title, author, likes } = blogs.reduce(reducer, { likes: -1 })

  return {
    title,
    author,
    likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // Group by author. Key is author, value is array of blogs by that author.
  const grouped = _.groupBy(blogs, 'author')

  // Map to array of objects with author and number of blogs.
  const authors = _.map(grouped, (blogs, author) => ({
    author, blogs: blogs.length
  }))

  // Sort by number of blogs (ascending).
  const sorted = _.sortBy(authors, 'blogs')

  // -1 because we want the last element in the sorted array.
  return sorted[sorted.length - 1]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const grouped = _.groupBy(blogs, 'author')

  const authors = _.map(grouped, (blogs, author) => ({
    author, likes: totalLikes(blogs)
  }))

  const sorted = _.sortBy(authors, 'likes')

  return sorted[sorted.length - 1]
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}